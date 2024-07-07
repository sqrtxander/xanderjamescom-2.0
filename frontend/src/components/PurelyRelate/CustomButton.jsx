import { Button } from "@chakra-ui/react";

function CustomButton({ children, ...props }) {
	return (
		<Button whiteSpace="normal" wordwrap="break-word" w="100%" p={5} {...props}>
			{children}
		</Button>
	);
}

export default CustomButton;
