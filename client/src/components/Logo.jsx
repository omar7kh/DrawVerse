import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.svg";
import PropTypes from "prop-types";
const Logo = ({ width, height, textClasses }) => {
	console.log(width);
	return (
		<div className="flex justify-center items-center gap-2">
			<img
				src={logo}
				style={{ width: `${width}px`, height: `${height}px` }}
				alt="DrawVerse Logo"
			/>
			<Link to={"/"} className={textClasses}>
				DrawVerse
			</Link>
		</div>
	);
};
Logo.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	textClasses: PropTypes.string.isRequired,
};
export default Logo;
