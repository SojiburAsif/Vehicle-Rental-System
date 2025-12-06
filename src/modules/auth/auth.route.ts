import { Router } from "express";
import { authController } from "./auth.controller";
import { authServices } from "./auth.service";

const router = Router();

router.post("/signin", authController.loginUser);
router.post("/signup" , authServices.signupUser) 

export const authRoute = router