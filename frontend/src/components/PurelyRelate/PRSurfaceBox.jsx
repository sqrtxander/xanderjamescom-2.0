import { Button, Text, useColorModeValue } from "@chakra-ui/react";

function PRSurfaceBox({ front, colors, disabled, onClick }) {
	return (
		<Button
			variant="disabledSolid"
			colorScheme={colors}
			w="100%"
			h="100%"
			p={5}
			borderRadius={5}
			onClick={onClick}
			isDisabled={disabled}
		>
			<Text
				whiteSpace="pre-line"
				fontSize={{ base: "md", sm: "lg", md: "xl" }}
				color={colors === "yellow" ? "black" : useColorModeValue("white", "black")}
				fontWeight="semibold"
			>
				{front}
			</Text>
		</Button>
	);
}

export default PRSurfaceBox;
