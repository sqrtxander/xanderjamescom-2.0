import { GridItem, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import ScalingButton from "./ScalingButton";
import { useEffect, useState } from "react";
import { useFlipAll } from "@/contexts";

function PRRelation({ front, back, explanation, colSpan }) {
	const [isFlipped, setFlipped] = useState(false);
	const { state } = useFlipAll();
	useEffect(() => {
		setFlipped(state);
	}, [state]);
	const reverse = (
		<VStack>
			<Text
				whiteSpace="pre-line"
				fontSize={{ base: "lg", md: "xl" }}
				color={isFlipped ? useColorModeValue("white", "black") : useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
			>
				{back}
			</Text>
			{explanation && (
				<Text as="i" fontSize="sm" whiteSpace="pre-line">
					{explanation}
				</Text>
			)}
		</VStack>
	);
	return (
		<GridItem w="100%" colSpan={colSpan}>
			<ScalingButton
				colorScheme="purple"
				onClick={() => setFlipped(!isFlipped)}
			>
				{isFlipped ? (
					reverse
				) : (
					<Text
						whiteSpace="pre-line"
						fontSize={{ base: "lg", md: "xl" }}
						color={isFlipped ? useColorModeValue("white", "black") : useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
					>
						{isFlipped ? reverse : front}
					</Text>
				)}
			</ScalingButton>
		</GridItem>
	);
}

export default PRRelation;
