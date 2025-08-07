import { PRIcon } from "@/components";
import { FiLink as CLIcon } from "react-icons/fi";
import { RiSwordLine as CCIcon } from "react-icons/ri";
import { useHeader } from "@/contexts";
import {
	Flex,
	Heading,
	VStack,
	Button,
	Text,
	Box,
	useColorModeValue,
	Stack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useEffect } from "react";

const ProjectButton = ({ ButtonIcon, text, colorScheme, to }) => {
	return (
		<WrapItem>
			<Flex
				alignItems="center"
				justifyContent="center"
				aspectRatio={1}
				maxWidth="100%"
				maxHeight="100%"
			>
				<Button
					size="lg"
					width="100%"
					height="100%"
					variant="solid"
					colorScheme={colorScheme}
					as={ReactRouterLink}
					to={to}
				>
					<VStack height="100%" spacing={0} alignItems="center">
						<Box height="20%" />
						<ButtonIcon
							stroke={useColorModeValue("white", "black")}
							size="50%"
						/>
						<Text fontSize="2xl">{text}</Text>
						<Box height="20%" />
					</VStack>
				</Button>
			</Flex>
		</WrapItem>
	);
};

const HomePage = () => {
	const { updateTitle } = useHeader();
	useEffect(() => {
		updateTitle("Home");
	}, []);
	return (
		<Flex
			w={{ base: "100%", md: "80%" }}
			h="100%"
			p={5}
			justifyContent="left"
			alignItems="left"
		>
			<VStack width="100%" justifyContent="left" alignItems="left">
				<Heading as="h1" size="2xl" textAlign="center">
					Hello,
				</Heading>
				<Text fontSize="xl" textAlign="left">
					My name is Xander.
					<br />I am an undergraduate student studying mathematics and IT. I use
					Neovim as my main text editor on Arch Linux (<em>by the way</em>). I
					enjoy programming (when I have ideas), and can solve a Rubik's Cube
					blindfolded.
					<br />
					<br />I love both participating in and setting trivia, especially that
					where answers are connected.
				</Text>
				<Flex h={10} />
				<Heading as="h2" size="lg" textAlign="left">
					My Projects
				</Heading>
				<Wrap gap={4} width="100%" justify="center">
					<ProjectButton
						ButtonIcon={PRIcon}
						text="Purely Relate"
						colorScheme="purple"
						to="/purely-relate"
					/>
					<ProjectButton
						ButtonIcon={CLIcon}
						text="Chain Links"
						colorScheme="blue"
						to="/chain-links"
					/>
					<ProjectButton
						ButtonIcon={CCIcon}
						text="Cryptic Crosswords"
						colorScheme="green"
						to="/crosswords"
					/>
				</Wrap>
			</VStack>
		</Flex>
	);
};

export default HomePage;
