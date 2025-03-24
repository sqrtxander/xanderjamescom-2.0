import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

function CLSide({ front }) {
	const flexHeight = `${Text.fontSize} * ${Text.lineHeight}`;
	return (
		<Flex
			bg={useColorModeValue("blue.500", "blue.200")}
			w="100%"
			h={flexHeight}
			justifyContent="center"
			alignItems="center"
			p={5}
			borderRadius={5}
		>
			<Text
				whiteSpace="pre-line"
				fontSize={{ base: "lg", md: "xl" }}
				color={useColorModeValue("white", "black")}
				fontWeight="semibold"
			>
				{front}
			</Text>
		</Flex>
	);
}

export default CLSide;
