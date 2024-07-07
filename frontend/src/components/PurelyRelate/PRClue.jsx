import {
	AspectRatio,
	GridItem,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { useFlipAll } from "@/contexts";

function PRClue({ front, back, colSpan }) {
	const [isFlipped, setFlipped] = useState(false);
	const { state } = useFlipAll();
	useEffect(() => {
		setFlipped(state);
	}, [state]);

	return (
		<GridItem w="100%" colSpan={colSpan}>
			<AspectRatio width="100%" ratio="1.75">
				<CustomButton colorScheme="blue" onClick={() => setFlipped(!isFlipped)}>
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
				</CustomButton>
			</AspectRatio>
		</GridItem>
	);
}

export default PRClue;
