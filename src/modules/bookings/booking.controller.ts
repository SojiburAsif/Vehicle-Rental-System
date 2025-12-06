import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    try {
        const result = await bookingServices.createBookingS(
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date
        );

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const { role, id } = req.user as { id: number; role: string };

        if (role === "admin") {
            const data = await bookingServices.getAllBookingsAdmin();
            return res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data
            });
        } else {
            const data = await bookingServices.getBookingsByCustomer(id);
            return res.status(200).json({
                success: true,
                message: "Your bookings retrieved successfully",
                data
            });
        }
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const updateBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  
        const { status } = req.body;
        const { id: userId, role } = req.user as { id: number; role: string };

        const result = await bookingServices.updateBookingStatus(Number(id), status, userId, role);

        let message = "";
        if (role === "customer") message = "Booking cancelled successfully";
        if (role === "admin") message = "Booking marked as returned. Vehicle is now available";

        res.status(200).json({
            success: true,
            message,
            data: result
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

export const bookingController = {
    createBooking,
    getAllBookings,
    updateBooking
}