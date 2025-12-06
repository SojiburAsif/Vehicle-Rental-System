import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = express.Router()

// router.post("/", userControllers.createuser);
router.get("/", logger, auth("admin"), userControllers.getusers);
router.get('/:id', auth("admin"), userControllers.getsingleuser);
router.put("/:id", auth("admin", "customer"), userControllers.updateuser);
router.delete("/:id", auth("admin"), userControllers.deleteuser)


export const useRouter = router