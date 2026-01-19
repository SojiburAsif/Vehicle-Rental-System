import express, { Request, Response } from "express"
import logger from "./middleware/logger"
import initDB, { pool } from "./config/db"
import { useRouter } from "./modules/users/user.route"
import { VehiclesRouter } from "./modules/vehicles/vehicles.route"
import { authRoute } from "./modules/auth/auth.route"
import { bookingsRouter } from "./modules/bookings/booking.route"
import cors from "cors";

export const app = express()


app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000", "https://vehiclerentaslsystem.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));



app.get('/', logger, (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Vehicle Rental System 🚗✨",
        status: "Server is running smoothly 😎",
        timestamp: new Date().toISOString()
    });
});

initDB()
app.use("/api/v1/auth/", authRoute)

app.use("/api/v1/users", useRouter)

app.use("/api/v1/vehicles", VehiclesRouter);

app.use("/api/v1/bookings", bookingsRouter)


