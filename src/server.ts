import express, { Request, Response } from "express"
import config from "./config"
import logger from "./middleware/logger"
import initDB, { pool } from "./config/db"
import { useRouter } from "./modules/users/user.route"
import { VehiclesRouter } from "./modules/vehicles/vehicles.route"
import { authRoute } from "./modules/auth/auth.route"
import { bookingsRouter } from "./modules/bookings/booking.route"


const app = express()
const port = config.port

app.use(express.json());

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Vehicle Rental System!')
});

initDB()
app.use("/api/v1/auth/", authRoute)

app.use("/api/v1/users", useRouter)

app.use("/api/v1/vehicles", VehiclesRouter);

app.use("/api/v1/bookings", bookingsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
