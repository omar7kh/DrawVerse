import { Router } from "express";
import {
	Logout,
	deletePhoto,
	getUserInfo,
	updateImage,
	updateProfile,
	userSignIn,
	userSignUp,
} from "../controllers/userController.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { validateSchema } from "../middlewares/userValidator.js";
import { signInSchema } from "../schemas/signInSchema.js";
import isAuth from "../middlewares/isAuth.js";
import { editSchema } from "../schemas/profileEditSchema.js";

const router = Router();

router
	.post("/signup", signUpSchema, validateSchema, userSignUp)
	.post("/signIn", signInSchema, validateSchema, userSignIn)
	.post("/isAuth", isAuth)
	.post("/logout", Logout)
	.post("/updateProfile/:userId", editSchema, validateSchema, updateProfile)
	.post("/updateImage/:userId", updateImage)
	.post("/deletePhoto/:userId", deletePhoto)
	.get("/getUser/:userId", getUserInfo);

export default router;
