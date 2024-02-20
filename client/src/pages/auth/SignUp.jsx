import Shape from "../../assets/images/Rectangle 12 .png";
import { Logo } from "../../components";
import { useGoogleLogin } from "@react-oauth/google";
import Buttons from "../../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
	const navigate = useNavigate();

	const { backendApiUrl } = useContext(UserContext);

	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const [fieldErrors, setFieldErrors] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleFormChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value.toLowerCase() });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post(`${backendApiUrl}/signup`, userData);

			if (res.data.errors) {
				const errors = {};
				res.data.errors.forEach((error) => {
					errors[error.path] = error.msg;
				});
				console.log(errors);

				setFieldErrors(errors);
				setLoading(false);
			} else {
				navigate("/login");
			}
		} catch (error) {
			setLoading(false);
		}
	};

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
				<div className="login-form bg-[#1F2937] opacity-95  relative flex flex-col max-w-80 min-h-[450px] p-5 justify-center items-center mx-auto  rounded-3xl shadow-[-15px_-10px_4px_1px_rgba(0,0,0,0.5)] mt-20">
					<h2 className="title text-white mb-4 text-xl w-full text-center">
						<span className="text-[#DFB700]">Welcome to</span> DrawVerse
					</h2>
					<form
						className="flex flex-col  gap-2 text-white  "
						onSubmit={handleFormSubmit}
						noValidate
					>
						{["username", "email", "password"].map((field) => (
							<div key={field}>
								<label htmlFor={field}>
									{field[0].toUpperCase() + field.slice(1)}
								</label>

								<div className="relative">
									<input
										className={`block rounded-full pl-4 leading-7 text-black placeholder:p-4  `}
										type={
											field === "password" && showPassword
												? "text"
												: field === "password"
												? "password"
												: field === "email"
												? "email"
												: "text"
										}
										id={field}
										name={
											field === "password"
												? "password"
												: field === "email"
												? "email"
												: "username"
										}
										placeholder={
											field === "username"
												? "Enter your Username"
												: field === "email"
												? "Enter your Email"
												: "Enter your Password"
										}
										onChange={handleFormChange}
									/>
								</div>
								{field === "password" && showPassword ? (
									<FaRegEye
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-12 top-[250px] text-black hover:cursor-pointer"
									/>
								) : (
									<FaEyeSlash
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-12 top-[250px]  text-black hover:cursor-pointer"
									/>
								)}

								{fieldErrors[field] && (
									<span className="bg-red-700 p-1 mb-2 block max-w-[200px] rounded-md">
										{fieldErrors[field]}
									</span>
								)}
							</div>
						))}
						<button
							type="submit"
							className="font-bold text-base bg-[#DFB700] w-28 mx-auto  delay-75 duration-500 text-textWhite block rounded-md p-0.5 mt-2  hover:bg-[#b19930]  hover:scale-105 transition hover:duration-500 hover:ease-in-out"
						>
							Sign Up
						</button>
						<div className="flex gap-3 items-center mt-3">
							<hr className="w-28 h-1 decoration-white " />
							<h3 className="text-white">OR</h3>
							<hr className="w-28 h-1 decoration-white " />
						</div>
						{/* <Buttons /> */}
						<p className="text-white">
							Have you already an account?{" "}
							<Link
								to="/login"
								className="text-[#DFB700]  ml-2 hover:underline"
							>
								Sign In
							</Link>{" "}
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default SignUp;
