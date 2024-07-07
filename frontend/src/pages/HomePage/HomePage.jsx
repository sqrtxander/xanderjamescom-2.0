import { useHeader } from "@/contexts";
import {
	Flex,
	Heading,
	ListItem,
	UnorderedList,
	VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

const HomePage = () => {
	const { updateTitle } = useHeader();
	useEffect(() => {
		updateTitle("Home");
	}, []);
	return (
		<Flex
			w={{ base: "100vw", md: "80vw" }}
			h="100%"
			p={5}
			justifyContent="left"
			alignItems="left"
		>
			<VStack justifyContent="left" alignItems="left">
				<Heading textAlign="left">Hello,</Heading>
				<UnorderedList>
					<ListItem>My name is Xander</ListItem>
					<ListItem>I am a student</ListItem>
					<ListItem>I like to write code</ListItem>
					<ListItem>I use Neovim</ListItem>
					<ListItem>I can solve a Rubik's Cube</ListItem>
				</UnorderedList>
			</VStack>
		</Flex>
	);
};

export default HomePage;
