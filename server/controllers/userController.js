import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
		const expiresInMs = 24 * 60 * 60 * 1000;

		const expiresInDate = new Date(Date.now() + expiresInMs);

		const token = jwt.sign({ userId: loggedUser._id }, process.env.JWT_SECRET, {
			expiresIn: expiresInMs,
		});

		const cookieOptions = {
			httpOnly: true,
			maxAge: expiresInMs,
		};

		res.cookie("jwt", token, cookieOptions);

		const options = {
			maxAge: expiresInMs,
		};
		const payload = {
			expires: expiresInDate.toISOString(),
			userId: loggedUser._id,
		};
		res.cookie("JWTinfo", payload, options);
		return res.send({
			success: true,
			msg: "User logged in",
			userId: loggedUser._id,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			error: error.message,
		});
	}
};

// Logout
export const Logout = async (req, res) => {
	res.clearCookie("jwt");
	res.clearCookie("JWTinfo");
	res.send({ msg: "successfully logged out" });
};
