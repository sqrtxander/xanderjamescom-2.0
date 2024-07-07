import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ScalingButton from "./ScalingButton";
import { useFlipAll } from "@/contexts";

function PRConsonantsClue({ front, back }) {
	const [isFlipped, setFlipped] = useState(false);
	const { state } = useFlipAll();
	useEffect(() => {
		setFlipped(state);
	}, [state]);
	return (
		<Flex w="100%">
			<ScalingButton colorScheme="blue" onClick={() => setFlipped(!isFlipped)}>
				<Text
					whiteSpace="pre-line"
					fontSize={{ base: "lg", md: "xl" }}
					color={isFlipped ? useColorModeValue("white", "black") : useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
				>
					{isFlipped ? back : front}
				</Text>
			</ScalingButton>
		</Flex>
	);
}

export default PRConsonantsClue;
