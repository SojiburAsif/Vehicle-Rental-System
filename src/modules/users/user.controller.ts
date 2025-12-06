import { Request, Response } from "express";
import { userServices } from "./user.service";



const getusers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.GetUser()
        res.status(200).json({
            succes: true,
            message: "Users recived successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            succuss: false,
            message: err.message
        })

    }
}

const getsingleuser = async (req: Request, res: Response) => {
    // const { id } = req.body;
    try {

        const result = await userServices.GetSingleUser(req.params.id as string)

        res.status(200).json({
            succes: true,
            message: "single Users recived successfully",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            succuss: false,
            message: err.message
        })

    }
}


const updateuser = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    const { id: params } = req.params
    const { id: userId, role } = req.user as { id: number; role: string };

    try {

        if (role === "customer" && Number(params) !== userId) {
            return res.status(403).json({
                success: false,
                message: "you can only update your own profile "
            });
        }

        const result = await userServices.UpdateUser(name, email, phone, req.params.id!)

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })

    }
}

const deleteuser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.Deleteuser(req.params.id!);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result.rows[0]
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const userControllers = {

    getusers,
    getsingleuser,
    updateuser,
    deleteuser,
}