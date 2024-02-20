import { body } from "express-validator";

export const signUpSchema = [
	body("username").notEmpty().withMessage("Username is required").escape(),

	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email address is required")
		.if(body("email").notEmpty())
		.isEmail()
		.withMessage("Email address is not valid")
		.normalizeEmail(),

	body("password")
		.exists({ checkFalsy: true })
		.isString()
		.matches(/[a-zA-Z]/)
		.withMessage("Password must contain at least one letter")
		.matches(/[0-9]/)
		.withMessage("Password must contain at least one number")
		.isLength({ min: 8, max: 40 })
		.withMessage("Password must be at least 8 characters long"),
];
