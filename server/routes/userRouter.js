import { Router } from "express";
import {
	Logout,
	userSignIn,
	userSignUp,
} from "../controllers/userController.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { validateSchema } from "../middlewares/userValidator.js";
import { signInSchema } from "../schemas/signInSchema.js";
import isAuth from "../middlewares/isAuth.js";

const router = Router();

router
	.post("/signup", signUpSchema, validateSchema, userSignUp)
	.post("/signin", signInSchema, validateSchema, userSignIn)
	.post("/isAuth", isAuth)
	.post("/logout", Logout);

export default router;
