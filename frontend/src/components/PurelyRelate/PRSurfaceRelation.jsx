import { GridItem, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useFlipAll } from "@/contexts";

function PRSurfaceRelation({ front, back, explanation, colSpan }) {
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
				color={
					isFlipped
						? useColorModeValue("white", "black")
						: useColorModeValue("whiteAlpha.900", "blackAlpha.800")
				}
			>
				{back}
			</Text>
			{explanation && (
				<Text
					as="i"
					fontSize="sm"
					whiteSpace="pre-line"
					color={
						isFlipped
							? useColorModeValue("white", "black")
							: useColorModeValue("whiteAlpha.900", "blackAlpha.800")
					}
				>
					{explanation}
				</Text>
			)}
		</VStack>
	);
	return (
		<GridItem h="100%" w="100%" colSpan={colSpan}>
			<CustomButton
				colorScheme="purple"
				onClick={() => setFlipped(!isFlipped)}
				w="100%"
				h="100%"
			>
				{isFlipped ? (
					reverse
				) : (
					<Text
						whiteSpace="pre-line"
						fontSize={{ base: "lg", md: "xl" }}
						color={
							isFlipped
								? useColorModeValue("white", "black")
								: useColorModeValue("whiteAlpha.900", "blackAlpha.800")
						}
					>
						{front}
					</Text>
				)}
			</CustomButton>
		</GridItem>
	);
}

export default PRSurfaceRelation;
