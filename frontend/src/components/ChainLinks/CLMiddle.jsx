import {
	AspectRatio,
	Flex,
	GridItem,
	Input,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

function CLMiddle({ value, setUserValue, disabled }) {
	const flexHeight = `${Text.fontSize} * ${Text.lineHeight}`;
	return (
		<GridItem w="100%">
			<AspectRatio width="100%" ratio={{ base: 4, md: 2 }}>
				<Flex
					bg={useColorModeValue("blue.500", "blue.200")}
					w="100%"
					h={flexHeight}
					justifyContent="center"
					alignItems="center"
					p={5}
					borderRadius={5}
				>
					<Input
						placeholder="______"
						_placeholder={{
							color: "inherit",
							textAlign: "inherit",
							fontSize: "inherit",
							fontWeight: "inherit",
						}}
						value={value}
						onChange={(e) => {
							setUserValue(e.target.value);
						}}
						isDisabled={disabled}
						variant="outline"
						fontSize={{ base: "lg", md: "xl" }}
						textAlign="center"
						color={useColorModeValue("white", "black")}
						outlineColor={useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
						fontWeight="semibold"
					/>
				</Flex>
			</AspectRatio>
		</GridItem>
	);
}

export default CLMiddle;
