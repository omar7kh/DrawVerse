import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Buttons() {
	// useEffect(() => {
	// 	if (userData) {
	// 		axios
	// 			.get(
	// 				`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${user.access_token}`,
	// 						Accept: "application/json",
	// 					},
	// 				}
	// 			)
	// 			.then((res) => {
	// 				setProfile(res.data);
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// }, [userData]);

	// const googleLogin = useGoogleLogin({
	// 	onSuccess: (tokenResponse) => setUserData(tokenResponse),
	// 	onError: (error) => console.log("Login Failed:", error),
	// });

	return (
		<>
			<button
				className="bg-white my-2 rounded-full p-1 h-7 w-4/5  flex pl-4 items-center hover:scale-105 transition hover:duration-500 hover:ease-in-out "
				onClick={() => login()}
			>
				<FcGoogle
					style={{ height: "25px", width: "25px", marginRight: "5px" }}
				/>
				Continue with Google
			</button>
		</>
	);
}

export default Buttons;
