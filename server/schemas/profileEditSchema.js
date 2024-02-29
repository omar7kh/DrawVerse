import { body } from "express-validator";

export const editSchema = [
	body("username").optional().escape(),

	body("email").optional(),

	body("password")
		.optional()
		.isString()
		.matches(/[a-zA-Z]/)
		.withMessage("Password must contain at least one letter")
		.matches(/[0-9]/)
		.withMessage("Password must contain at least one number"),
];
