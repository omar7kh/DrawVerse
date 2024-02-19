import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/userController.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { validateSchema } from "../middlewares/userValidator.js";

const router = Router();

router
	.post("/signup", signUpSchema, validateSchema, userSignUp)
	.post("/signin", userSignIn);
export default router;
