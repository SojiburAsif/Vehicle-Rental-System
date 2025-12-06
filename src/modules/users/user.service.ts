import bcrypt from "bcryptjs";
import { pool } from "../../config/db";


const GetUser = async () => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role 
        FROM users
    `);
    return result;
};
const GetSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return result
}

const UpdateUser = async (name: string, email: string, phone: number, id: string) => {
    const result = await pool.query(` UPDATE users SET name=$1 , email=$2 , phone=$3 WHERE id=$4 RETURNING *`, [name, email, phone, id])
    return result
}
const Deleteuser = async (id: string) => {
    const result = await pool.query(
        `DELETE FROM users WHERE id = $1 RETURNING *`,
        [id]
    );
    return result;
};

export const userServices = {

    GetUser,
    GetSingleUser,
    UpdateUser,
    Deleteuser
}