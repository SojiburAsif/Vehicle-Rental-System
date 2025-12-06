import { Request, Response } from "express";
import { VehiclesServices } from "./vehicles.service";

const postVehicles = async (req: Request, res: Response) => {
    const { vehicle_name, type, registration_number,
        daily_rent_price, availability_status } = req.body;

    try {
        const result = await VehiclesServices.PostVehiclesS(vehicle_name, type, registration_number, daily_rent_price, availability_status);

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await VehiclesServices.getVehicles();
        
        if (result.rows.length === 0) {
            return res.status(200).json({
                "success": true,
                "message": "No vehicles found",
                "data": []
            }
            );
        }
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err,
        });
    }
};

const getSingleVehicles = async (req: Request, res: Response) => {
    try {
        const result = await VehiclesServices.getSingleVehicles(req.params.id!);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Vehicles not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch Vehicles" });
    }
};

const updateVehicleController = async (req: Request, res: Response) => {
    try {
        const result = await VehiclesServices.updateVehicle(req.body, req.params.id!);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0],
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};


const deleteVehicles = async (req: Request, res: Response) => {
    try {
        const result = await VehiclesServices.deleteVehicles(req.params.id!);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Vehicles not found" });
        }

        res.json({ success: true, message: "Vehicle deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete Vehicles" });
    }
};


export const VehiclesConrtoller = {
    postVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicleController,
    deleteVehicles,
}

