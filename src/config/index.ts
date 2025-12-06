import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    connection_str: process.env.DB_KEY,
    port: process.env.PORT,
    jwttoken: process.env.JWT_KEY
}

export default config;