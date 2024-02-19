import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Buttons() {
	const login = useGoogleLogin({
		onSuccess: async (response) => {
			try {
				const res = await axios.get(
					"https://accounts.google.com/o/oauth2/v2/auth",
					{
						headers: {
							Authorization: `Bearer ${response.acces_token}`,
						},
					}
				);
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		},
	});

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
