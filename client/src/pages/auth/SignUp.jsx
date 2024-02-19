import Shape from "../../assets/images/Rectangle 12 .png";
import { Logo } from "../../components";
import { useGoogleLogin } from "@react-oauth/google";
import Buttons from "../../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const SignUp = () => {
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isAuthTrue, setIsAuthTrue] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fieldErrors, setFieldErrors] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleDataChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(`${backendApiUrl}/login`, userData, {
				withCredentials: true,
			});

			if (res.data.errors) {
				const errors = {};
				res.data.errors.forEach((error) => {
					errors[error.path] = error.msg;
				});

				setFieldErrors(errors);
				setLoading(false);
				setIsAuthTrue(false);
				console.log(errors);
			} else if (res.data.success) {
				navigate("/home");
				const userId = res.data.userId;
				localStorage.setItem("userId", userId);
			} else {
				setFieldErrors((error) => error === "");
				setLoading(false);
				setIsAuthTrue(true);
			}
		} catch (error) {}
	};
	const googleLogin = useGoogleLogin({
		onSuccess: (tokenResponse) => async (e) => {
			e.preventDefault();
			setLoading(true);
			try {
				const res = await axios.post(`${backendApiUrl}/login`, userData, {
					withCredentials: true,
				});

				if (res.data.errors) {
					const errors = {};
					res.data.errors.forEach((error) => {
						errors[error.path] = error.msg;
					});

					setFieldErrors(errors);
					setLoading(false);
					setIsAuthTrue(false);
					console.log(errors);
				} else if (res.data.success) {
					navigate("/home");
					const userId = res.data.userId;
					localStorage.setItem("userId", userId);
				} else {
					setFieldErrors((error) => error === "");
					setLoading(false);
					setIsAuthTrue(true);
				}
			} catch (error) {}
		},
	});
	return (
		<>
			<div className="main-container bg-[#DFB700] w-full z-0 min-h-screen relative overflow-hidden">
				<div className="flex gap-4 items-center ml-5 mt-5">
					<Logo
						style={{ zIndex: "10" }}
						width={70}
						height={70}
						textClasses={"font-bold text-white text-3xl"}
					/>
				</div>
				<img
					src={Shape}
					style={{
						zIndex: "-10",
						width: "50%",
						minHeight: "100%",
						position: "absolute",
						top: "0",
						bottom: "0",
						left: "0",
					}}
					alt=""
				/>
				<div className="login-form bg-[#1F2937] opacity-95  relative flex flex-col max-w-80 min-h-[450px] justify-center items-center mx-auto  rounded-3xl shadow-[-15px_-10px_4px_1px_rgba(0,0,0,0.5)] mt-20">
					<h2 className="title text-white mb-4 text-xl w-full text-center">
						<span className="text-[#DFB700]">Welcome to</span> DrawVerse
					</h2>
					<form
						onSubmit={handleFormSubmit}
						className="flex flex-col  gap-2 text-white  "
					>
						<label className="">
							Username:
							<input
								className="block rounded-full pl-4 leading-7 text-black placeholder:p-4 "
								type="text"
								id="username"
								name="username"
								placeholder="Enter your Username"
							/>
						</label>
						<label className="">
							E-mail:
							<input
								className="block rounded-full pl-4 leading-7 text-black placeholder:p-4 "
								type="email"
								id="email"
								name="email"
								placeholder="Enter your Email"
							/>
						</label>
						<div className="relative">
							<label htmlFor="password">Password:</label>
							<input
								className={` block  rounded-full pl-4 leading-7 text-black placeholder:p-4`}
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Enter your Password"
								onChange={handleDataChange}
							/>
							{showPassword ? (
								<FaEyeSlash className="absolute right-2 top-7 text-black hover:cursor-pointer" />
							) : (
								<FaRegEye className="absolute right-2 top-7 text-black hover:cursor-pointer" />
							)}
						</div>
						<button
							type="submit"
							className="font-bold text-base bg-[#DFB700] w-28 mx-auto  delay-75 duration-500 text-textWhite block rounded-md p-0.5 mt-2  hover:bg-[#b19930]  hover:scale-105 transition hover:duration-500 hover:ease-in-out"
						>
							Login
						</button>
					</form>
					<div className="flex gap-3 items-center mt-3">
						<hr className="w-28 h-1 decoration-white " />
						<h3 className="text-white">OR</h3>
						<hr className="w-28 h-1 decoration-white " />
					</div>
					<Buttons />
					<p className="text-white">
						Dont have account?{" "}
						<Link to="/signup" className="text-[#DFB700]  ml-2 hover:underline">
							Sign Up
						</Link>{" "}
					</p>
				</div>
			</div>
		</>
	);
};

export default SignUp;
