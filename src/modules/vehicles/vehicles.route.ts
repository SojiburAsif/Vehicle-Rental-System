import { Router } from "express";
import { VehiclesConrtoller } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post('/', auth("admin"), VehiclesConrtoller.postVehicles)
router.get('/', VehiclesConrtoller.getVehicles)
router.get('/:id', VehiclesConrtoller.getSingleVehicles)
router.put('/:id', auth("admin"), VehiclesConrtoller.updateVehicleController)
router.delete('/:id', auth("admin"), VehiclesConrtoller.deleteVehicles)


export const VehiclesRouter = router