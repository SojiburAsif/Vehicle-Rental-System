import bcrypt from "bcryptjs";
import { pool } from "../../config/db"
import jwt from 'jsonwebtoken'
import config from "../../config";
import { Request, Response } from "express";
import { authController } from "./auth.controller";


const signupUser = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const result = await authController.create(name, email, password, phone, role);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: result.rows[0],
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

const loginuser = async (email: string, password: string) => {
    console.log(email);
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])

    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)
    console.log({ match, user });
    if (!match) {
        return null
    }

    const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        config.jwttoken as string,
        { expiresIn: "7d" }
    );
    console.log({ token });
    return { token, user }

}
export const authServices = {
    signupUser,
    loginuser,
}