import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import { authServices } from "./auth.service";
import { Request, Response } from "express";



const create = async (name: string, email: string, password: any, phone: number, role: string) => {

    if (!['admin', 'customer'].includes(role)) {
        throw new Error("Invalid role. Role must be either 'admin' or 'customer'.");
    }
    const hashedPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(
        `INSERT INTO users(name, email, password, phone, role) 
     VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, hashedPass, phone, role]
    );
    return result
}


const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // console.log(email);
    try {
        const result = await authServices.loginuser(email, password);
        // console.log(result.rows[0]);
        res.status(200).json({
            success: true,
            message: "login successful",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



export const authController = {
    loginUser,
    create
};