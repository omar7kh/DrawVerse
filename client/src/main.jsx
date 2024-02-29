import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserContextProvider>
			{/* <GoogleOAuthProvider clientId="628095529560-d47o1iat3e1bt93csbe3anti3e4qhrb9.apps.googleusercontent.com"> */}
			<App />
			{/* </GoogleOAuthProvider> */}
		</UserContextProvider>
	</React.StrictMode>
);
