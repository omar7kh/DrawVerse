import express from "express";
import "dotenv/config";
import connectMongoose from "./utils/connectMongoose.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import routeProvider from "./routes/userRouter.js";

const PORT = process.env.PORT || 3000;
const BDConnect = connectMongoose();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.use(routeProvider);

if (await BDConnect) {
	console.log("MongoDB Connect");
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}
