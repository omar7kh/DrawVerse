import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Boards, DropdownMenu, Logo } from "../components";
import avatar from "../assets/images/person-img.jpeg";
import "../index.css";

const MainPage = () => {
	const {
		checkIfIsAuthenticated,
		isAuthenticated,
		setIsAuthenticated,
		currentUser,
	} = useContext(UserContext);
	const [showDropdown, setShowDropdown] = useState(false);

	const navigate = useNavigate();

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	useEffect(() => {
		const check = async () => {
			const checkIsAuth = await checkIfIsAuthenticated();
			if (checkIsAuth) {
				setIsAuthenticated(true);
				console.log("authenticated");
			} else {
				navigate("/login");
				setIsAuthenticated(false);
				console.log("not authenticated");
			}
		};

		check();
	}, [isAuthenticated]);

	return (
		<div className="min-h-full w-full bg-[#1F2937] text-white">
			{isAuthenticated && (
				<>
					<nav className="flex justify-between bg-yellow-500 items-center px-5 h-20 z-50 lg:px-16">
						<Logo
							width={40}
							height={40}
							textClasses="font-bold text-sm md:text-xl lg:text-2xl"
						/>
						<div className="w-[60px] h-[60px] relative">
							<img
								src={!currentUser.image ? avatar : currentUser.image}
								alt="avatar"
								className="w-full h-full object-cover rounded-full relative cursor-pointer"
								onClick={toggleDropdown}
							/>
							{showDropdown && (
								<div className="absolute top-15 right-8 z-10">
									<DropdownMenu />
								</div>
							)}
						</div>
					</nav>
					<div className="h-[calc(100vh-80px)] w-full flex justify-center items-start overflow-x-auto">
						<Boards />
					</div>
				</>
			)}
		</div>
	);
};
export default MainPage;
