import { CLChain } from "@/components";
import { FlipAllProvider, useHeader } from "@/contexts";
import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

function CLExample() {
	const { updateTitle } = useHeader();
	useEffect(() => {
		updateTitle("Chain Links");
	}, []);
	return (
		<Flex w={{ base: "100vw", md: "80vw" }}>
			<VStack width="100%" spacing={4} alignItems="flex-start">
				<Heading as="h1">How to Play</Heading>
				<Text fontSize="lg">
					In each puzzle, there are eight word chains, namely pairs of words
					with a blank space between them. To solve a word chain, you must find
					a word that can replace the blank such that every pair of consecutive
					words forms a common phrase. For example, the pairs of consecutive
					words in <i>rock paper scissors</i> are <i>rock paper</i>, and{" "}
					<i>paper scissors</i>.
				</Text>
				<Text fontSize="lg">
					After successfully solving all eight word chains, you should hopefully
					see that the words share a connection. There is one point for each
					correct answer, and two points for the connection for a maximum of 10
					points.
				</Text>
				<Heading as="h1">Example</Heading>
				<FlipAllProvider>
					<CLChain left="Treasure" middle="chest" right="hair" />
				</FlipAllProvider>
				<Text fontSize="lg">
					The answer is <i>chest</i> because the pairs of consecutive words form
					the common phrases <i>treasure chest</i> and <i>chest hair</i>.
				</Text>
			</VStack>
		</Flex>
	);
}

export default CLExample;
