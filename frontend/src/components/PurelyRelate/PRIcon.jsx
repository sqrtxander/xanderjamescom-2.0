function PRIcon({ stroke, size }) {
	const width_ = "100%";
	const height_ = size ? size : "100%";
	return (
		<svg
			width={width_}
			height={height_}
			aspect-ratio={480 / 180}
			viewBox="0 0 480 180"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				fill="none"
				strokeWidth="10"
				stroke={stroke}
				strokeLinejoin="round"
				strokeLinecap="round"
				x="10"
				y="10"
				width="100"
				height="100"
				rx="15"
				ry="15"
			/>
			<rect
				fill="none"
				strokeWidth="10"
				stroke={stroke}
				strokeLinejoin="round"
				strokeLinecap="round"
				x="130"
				y="10"
				width="100"
				height="100"
				rx="15"
				ry="15"
			/>
			<rect
				fill="none"
				strokeWidth="10"
				stroke={stroke}
				strokeLinejoin="round"
				strokeLinecap="round"
				x="250"
				y="10"
				width="100"
				height="100"
				rx="15"
				ry="15"
			/>
			<rect
				fill="none"
				strokeWidth="10"
				stroke={stroke}
				strokeLinejoin="round"
				strokeLinecap="round"
				x="370"
				y="10"
				width="100"
				height="100"
				rx="15"
				ry="15"
			/>
			<rect
				fill="none"
				strokeWidth="10"
				stroke={stroke}
				strokeLinejoin="round"
				strokeLinecap="round"
				x="10"
				y="130"
				width="460"
				height="50"
				rx="15"
				ry="15"
			/>
		</svg>
	);
}

export default PRIcon;
