import { Text, VStack, useColorModeValue } from "@chakra-ui/react";
import ScalingButton from "../PurelyRelate/ScalingButton";
import { useState } from "react";

function PRRelation({ front, back, ...props }) {
	const [isFlipped, setFlipped] = useState(false);
	return (
		<ScalingButton
			colorScheme="purple"
			onClick={() => setFlipped(!isFlipped)}
			{...props}
		>
			{
				<Text
					whiteSpace="pre-line"
					fontSize={{ base: "lg", md: "xl" }}
					color={
						isFlipped
							? useColorModeValue("white", "black")
							: useColorModeValue("whiteAlpha.900", "blackAlpha.800")
					}
				>
					{isFlipped ? back : front}
				</Text>
			}
		</ScalingButton>
	);
}

export default PRRelation;
