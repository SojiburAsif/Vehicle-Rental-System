import { pool } from "../../config/db"

const createBookingS = async (
    customer_id: number,
    vehicle_id: number,
    rent_start_date: string,
    rent_end_date: string
) => {
  
    const vehicle = await pool.query(
        `SELECT vehicle_name, daily_rent_price, availability_status 
         FROM Vehicles WHERE id = $1`,
        [vehicle_id]
    );

    if (vehicle.rows.length === 0) {
        throw new Error("Vehicle not found");
    }

    if (vehicle.rows[0].availability_status !== "available") {
        throw new Error("Vehicle is already booked");
    }

   
    const daily_price = Number(vehicle.rows[0].daily_rent_price);
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    const totalRentDate = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const totalPrice = daily_price * totalRentDate;

    const booking = await pool.query(
        `INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
         VALUES($1, $2, $3, $4, $5, 'active')
         RETURNING *`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );

    await pool.query(
        `UPDATE Vehicles SET availability_status = 'booked' WHERE id = $1`,
        [vehicle_id]
    );

    return {
        ...booking.rows[0],
        vehicle: {
            vehicle_name: vehicle.rows[0].vehicle_name,
            daily_rent_price: daily_price,
          
        }
    };
};

const getAllBookingsAdmin = async () => {
    const result = await pool.query(`
        SELECT 
            b.*,
            u.name AS customer_name,
            u.email AS customer_email,
            v.vehicle_name,
            v.registration_number
        FROM Bookings b
        JOIN users u ON u.id = b.customer_id
        JOIN Vehicles v ON v.id = b.vehicle_id
        ORDER BY b.id DESC
    `);

    return result.rows.map(row => ({
        id: row.id,
        customer_id: row.customer_id,
        vehicle_id: row.vehicle_id,
        rent_start_date: row.rent_start_date,
        rent_end_date: row.rent_end_date,
        total_price: row.total_price,
        status: row.status,

        customer: {
            name: row.customer_name,
            email: row.customer_email
        },

        vehicle: {
            vehicle_name: row.vehicle_name,
            registration_number: row.registration_number
        }
    }));
};

const getBookingsByCustomer = async (userId: number) => {
    const result = await pool.query(`
        SELECT 
            b.*,
            u.name AS customer_name,
            u.email AS customer_email,
            v.vehicle_name,
            v.registration_number
        FROM Bookings b
        JOIN users u ON u.id = b.customer_id
        JOIN Vehicles v ON v.id = b.vehicle_id
        WHERE b.customer_id = $1
        ORDER BY b.id DESC
    `, [userId]);

    return result.rows.map(row => ({
        id: row.id,
        customer_id: row.customer_id,
        vehicle_id: row.vehicle_id,
        rent_start_date: row.rent_start_date,
        rent_end_date: row.rent_end_date,
        total_price: row.total_price,
        status: row.status,
        vehicle: {
            vehicle_name: row.vehicle_name,
            registration_number: row.registration_number
        }
    }));
};

const updateBookingStatus = async (
    bookingId: number,
    status: string,
    userId: number,
    role: string
) => {
   
    const bookingResult = await pool.query(
        `SELECT * FROM Bookings WHERE id = $1`,
        [bookingId]
    );
    if (bookingResult.rows.length === 0) {
        throw new Error("Booking not found");
    }

    const booking = bookingResult.rows[0];

    if (role === "customer") {
        if (booking.customer_id !== userId) {
            throw new Error("You can only cancel your own bookings");
        }
        if (status !== "cancelled") {
            throw new Error("Customer can only cancel bookings");
        }
    } else if (role === "admin") {
        if (status !== "returned") {
            throw new Error("Admin can only mark booking as returned");
        }
    } else {
        throw new Error("Unauthorized role");
    }

    const updatedBooking = await pool.query(
        `UPDATE Bookings SET status = $1 WHERE id = $2 RETURNING *`,
        [status, bookingId]
    );

    let vehicleData = null;


    if (status === "returned") {
        const vehicleUpdate = await pool.query(
            `UPDATE Vehicles 
             SET availability_status = 'available' 
             WHERE id = $1 
             RETURNING availability_status`,
            [booking.vehicle_id]
        );
        vehicleData = vehicleUpdate.rows[0];
    }

    return {
        ...updatedBooking.rows[0],
        vehicle: vehicleData,
    };
};
export const bookingServices = {
    createBookingS,
    getAllBookingsAdmin,
    getBookingsByCustomer,
    updateBookingStatus
}