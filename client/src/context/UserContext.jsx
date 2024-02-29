import { createContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
	const [userId, setUserId] = useState("");
	const [loggedIn, setLoggedIn] = useState(true);
	const [userData, setUserData] = useState({
		userName: "",
		email: "",
		password: "",
		imageUrl: "",
	});
	const backendApiUrl =
		import.meta.env.VITE_NODE_ENV === "development"
			? "http://localhost:3000"
			: "vercel";

	const [isAuthenticated, setIsAuthenticated] = useState(
		!loggedIn ? false : true
	);

	const handleIfUserHasToken = () => {
		let JWTinfocookie = cookie.get("JWTinfo");

		if (!JWTinfocookie) return;

		JWTinfocookie = JWTinfocookie.replace("j:", "");
		const cookieValueObj = JSON.parse(JWTinfocookie);
		const expirationInMs = new Date(cookieValueObj.expires) - new Date();

		setUserId(cookieValueObj.userId);

		if (expirationInMs <= 0) return;
		return JWTinfocookie;
	};
	useEffect(() => {
		handleIfUserHasToken();
	}, []);

	const checkIfIsAuthenticated = async () => {
		const token = handleIfUserHasToken();

		if (token) {
			const res = await axios.post(
				`${backendApiUrl}/isAuth`,
				{ token },
				{ withCredentials: true }
			);
			if (res.data.isAuth) {
				setUserData({
					userName: res.data.username,
					email: res.data.email,
				});
				setIsAuthenticated(true);
				return true;
			} else {
				return false;
			}
		}
	};

	return (
		<UserContext.Provider
			value={{
				backendApiUrl,
				isAuthenticated,
				checkIfIsAuthenticated,
				setIsAuthenticated,
				userId,
				setUserId,
				setUserData,
				userData,
				setLoggedIn,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
