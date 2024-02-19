import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/coinfig";

export const userSignUp = async (req, res) => {
	const { username, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	console.log(req.body);

	try {
		if (!newUser) {
			res.status(500).send("all field are required");
		}
		await newUser.save();
		res.status(201).send(`New User: ${username} is added`);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const userSignIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const loggedUser = await User.findOne({ email: email });

		if (!loggedUser) {
			return res.status(501).send({
				success: false,
				error: "User or Password are not correct",
			});
		}

		const comparedPassword = await bcrypt.compare(
			password,
			loggedUser.password
		);
		if (!comparedPassword) {
			return res.status(501).send({
				success: false,
				error: "User or Password are not correct",
			});
		}
		return res.send({
			success: true,
			msg: "User logged in",
			userId: loggedUser._id,
		});
	} catch (error) {}
	res.status(500).send({
		success: false,
		error: error.message,
	});
};
