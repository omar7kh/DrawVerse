import bgYellow from "../assets/images/wave-haikei.svg";
import avatar from "../assets/images/person-img.jpeg";
import { TbPhotoEdit } from "react-icons/tb";
import { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "../components";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
	const { isAuthenticated, backendApiUrl, userId, setUserData, userData } =
		useContext(UserContext);

	const navigate = useNavigate();

	const [isChanged, setIsChanged] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const fileInputRef = useRef(null);
	const [currentUser, setCurrentUser] = useState({
		username: "",
		email: "",
		image: "",
		password: "",
	});

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, []);

	const handleFormRequest = async (e) => {
		e.preventDefault();

		setCurrentUser({
			username: userData.userName,
			email: userData.email,
			password: userData.password,
		});
		try {
			const res = await axios.post(`${backendApiUrl}/updateProfile/${userId}`, {
				username: !userData.userName ? currentUser.username : userData.userName,
				email: !userData.email ? currentUser.email : userData.email,
				password: userData.password,
			});

			console.log("Profil erfolgreich aktualisiert:", res.data);
		} catch (error) {
			console.error("Fehler beim Aktualisieren des Profils:", error);
		}
	};

	useEffect(() => {
		// wird dreimal ausgeführt TODO: Checken!!!!!!!!!
		const getUser = async () => {
			if (!userId) {
				// console.warn(test);
				console.error("userId not set");
				return;
			}
			try {
				const res = await axios.get(`${backendApiUrl}/getUser/${userId}`);
				const imageFromRes = res.data.imageUrl;
				const dataUrl = `data:image/png;base64,${imageFromRes}`;
				setCurrentUser({
					username: res.data.username,
					email: res.data.email,
					image: !imageFromRes
						? dataUrl.replace(/^data:image\/[a-z]+;base64,/, "")
						: dataUrl,
				});
				setIsChanged(true);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		getUser();
	}, [userId, currentUser.image]);

	const handleFormChange = (e) => {
		e.preventDefault();
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleProfileImage = () => {
		fileInputRef.current.click();
	};

	const handleDeletePhoto = async () => {
		try {
			if (!currentUser.image) {
				return;
			} else {
				const res = await axios.post(
					`${backendApiUrl}/deletePhoto/${userId}`,
					{
						imageUrl: "",
					},
					{ headers: { "Content-Type": "multipart/form-data" } }
				);
				setUserData({
					imageUrl: "",
				});
				setCurrentUser({
					image: res.data.imageUrl,
				});
			}
		} catch (error) {
			console.log("failed delete image", error);
		}
	};
	const handleImageChange = async (e) => {
		const imageFile = e.target.files[0];

		const reader = new FileReader();
		reader.onload = async () => {
			const base64Image = reader.result.replace(
				/^data:image\/[a-z]+;base64,/,
				""
			);

			const formData = new FormData();
			formData.append("files", base64Image);
			try {
				const res = await axios.post(
					`${backendApiUrl}/updateImage/${userId}`,
					formData,
					{ headers: { "Content-Type": "multipart/form-data" } }
				);
				setUserData({
					imageUrl: base64Image,
				});
				setCurrentUser({ image: base64Image });
			} catch (error) {
				console.log("failed upload image", error);
			}
		};
		reader.readAsDataURL(imageFile);
	};

	if (isAuthenticated) {
		return (
			<div className="min-h-screen w-full bg-gray-800 text-white">
				<div className="relative flex justify-center items-center">
					<div className="w-full h-[210px]">
						<img
							src={bgYellow}
							className="w-full h-full object-cover object-bottom"
						/>
					</div>
					<Logo
						width={40}
						height={40}
						textClasses="font-bold text-sm md:text-xl lg:text-2xl"
						divStyle="absolute left-16 top-5"
					/>
					<div className="group w-[200px] h-[200px] absolute -bottom-16 ">
						<img
							src={!currentUser.image ? avatar : currentUser.image}
							alt="avatar"
							className=" w-full h-full object-cover rounded-full relative  group-hover:blur-sm"
						/>
						<TbPhotoEdit
							className="text-5xl absolute right-0 bottom-2 bg-gray-800 p-2 rounded-full cursor-pointer"
							onClick={handleProfileImage}
						/>
						<button
							onClick={handleDeletePhoto}
							className="absolute right-20 top-24 bg-gray-800p-1 border-2 rounded-md hidden group-hover:block     "
						>
							Delete
						</button>
					</div>
				</div>

				<span className="my-32 mb-6 block text-center font-semibold text-3xl">
					Edit Profile
				</span>

				<input
					type="file"
					ref={fileInputRef}
					id="image"
					name="image"
					accept="image/*"
					onChange={handleImageChange}
					className="hidden"
				/>
				<div className="flex flex-col w-[350px] h-20 justify-center mx-auto size-6  ">
					<p>Username: {currentUser.username}</p>
					<p>Email-adress: {currentUser.email}</p>
				</div>
				<form
					onSubmit={handleFormRequest}
					className="w-[400px] pb-10 lg:w-[550px] mx-auto flex flex-col gap-5 justify-center items-center"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="userName">User Name</label>
						<input
							className="w-full h-10 px-5 py-3 border-2 border-gray-800 text-black rounded-md"
							type="text"
							name="userName"
							id="userName"
							placeholder="Max Mustermann"
							onChange={(e) => handleFormChange(e)}
							autoComplete="on"
						/>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="email">Email</label>
						<input
							className="w-full h-10 px-5 py-3 border-2 border-gray-800 text-black rounded-md"
							type="email"
							name="email"
							id="email"
							placeholder="example@gmail.com"
							onChange={(e) => handleFormChange(e)}
							autoomplete="on"
						/>
					</div>

					<div className="flex flex-col w-full relative">
						<label htmlFor="password">New Password</label>
						<input
							className="w-full h-10 pl-5 pr-8 py-3 border-2 border-gray-800 text-black rounded-md"
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							placeholder="New Password"
							onChange={(e) => handleFormChange(e)}
						/>
						{!showPassword ? (
							<FaEye
								className="absolute bottom-3 right-3 text-black cursor-pointer"
								onClick={() => setShowPassword(true)}
							/>
						) : (
							<FaEyeSlash
								className="absolute bottom-3 right-3 text-black cursor-pointer"
								onClick={() => setShowPassword(false)}
							/>
						)}
					</div>

					<button
						type="submit"
						className="bg-[#DFB700] text-black p-2 rounded-md font-bold text-lg hover:scale-95 transition"
					>
						confirm Changes
					</button>
				</form>
			</div>
		);
	}
};

export default Profile;
