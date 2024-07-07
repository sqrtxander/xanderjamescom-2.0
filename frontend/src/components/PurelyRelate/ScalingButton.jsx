import CustomButton from "./CustomButton";

function ScalingButton({ children, ...props }) {
	const textHeight = `${Text.fontSize} * ${Text.lineHeight}`;
	const buttonHeight = `calc(${textHeight} + ${props.padding || "0px"})`;
	return (
		<CustomButton height={buttonHeight} {...props}>
			{children}
		</CustomButton>
	);
}

export default ScalingButton;
