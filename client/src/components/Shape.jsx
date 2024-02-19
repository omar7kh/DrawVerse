function Shape(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1000px"
			height="100vh"
			viewBox="100 0 1000 760"
			{...props}
		>
			<path
				d="M0 0h943.527l22.739 26.402c48.3 56.086 41.984 125.875-16.078 177.711l-197.434 176.23c-48.586 43.372-61.516 99.977-34.48 150.985L827.808 738l115.718 207H0zm0 0"
				fill="#333533"
			/>
		</svg>
	);
}

export default Shape;
