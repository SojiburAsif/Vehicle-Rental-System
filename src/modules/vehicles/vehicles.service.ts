
import { pool } from "../../config/db";

const PostVehiclesS = async (

    vehicle_name: string,
    type: string,
    registration_number: string,
    daily_rent_price: number,
    availability_status: string
) => {
    const result = await pool.query(
        `INSERT INTO Vehicles( vehicle_name, type, registration_number, daily_rent_price, availability_status)
         VALUES($1, $2, $3, $4, $5 ) RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    );
    return result;
}

const getVehicles = async () => {
    const result = await pool.query(`SELECT * FROM Vehicles`);
    return result;
};

const getSingleVehicles = async (id: string) => {
    const result = await pool.query("SELECT * FROM Vehicles WHERE id = $1", [id]);
    return result;
};

const updateVehicle = async (
    payload: {
        vehicle_name?: string;
        daily_rent_price?: number;
        availability_status?: string;
        type?: string;
    },
    id: string
) => {
    const { vehicle_name, daily_rent_price, availability_status, type } = payload;

    const result = await pool.query(
        `UPDATE Vehicles 
     SET vehicle_name = COALESCE($1, vehicle_name),
         daily_rent_price = COALESCE($2, daily_rent_price),
         availability_status = COALESCE($3, availability_status),
         type = COALESCE($4, type)
     WHERE id = $5
     RETURNING *`,
        [vehicle_name, daily_rent_price, availability_status, type, id]
    );

    return result;
};


const deleteVehicles = async (id: string) => {
    const result = await pool.query("DELETE FROM Vehicles WHERE id=$1 RETURNING *", [
        id,
    ]);
    return result;
};


export const VehiclesServices = {
    PostVehiclesS,
    getVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteVehicles
}