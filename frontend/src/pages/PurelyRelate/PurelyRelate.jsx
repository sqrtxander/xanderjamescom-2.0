import { FlipAllProvider, useFlipAll, useHeader } from "@/contexts";
import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	Heading,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
import {
	PRR1Question,
	PRR2Question,
	PRR3Question,
	PRR4Question,
} from "@/components";
import Example from "./Example";

const PurelyRelate = () => {
	const { updateTitle } = useHeader();
	const [episodes, setEpisodes] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDataAndSetTitle = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/purely-relate/api/episodes",
				);
				if (!response.ok) {
					throw new Error("No episodes found");
				}
				const data = await response.json();
				setEpisodes(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setErrored(true);
			}
		};
		fetchDataAndSetTitle();
	}, []);
	useEffect(() => {
		if (window.location.pathname.replace(/\/$/gim, "") === "/purely-relate") {
			updateTitle("Purely Relate");
		}
	}, []);


	return (
		<FlipAllProvider initState={false}>
			<Flex w={{ base: "100vw", md: "80vw" }}>
				<Container maxWidth="100%" p={4}>
					{window.location.pathname.replace(/\/$/gim, "") ===
					"/purely-relate" ? (
						<VStack width="100%" spacing={4} align="stretch">
							<Text fontSize="lg">
								Here you will find questions I have written based off the BBC
								Quiz show Only Connect
							</Text>
							<Heading as="h2">Episodes</Heading>
							{loading ? (
								<Flex
									width="100%"
									height="100%"
									justifyContent="center"
									alignItems="center"
								>
									<Spinner size="xl" />
								</Flex>
							) : (
								<ButtonGroup>
									{episodes.map((ep, i) => (
										<Button
											key={i}
											size="lg"
											colorScheme="blue"
											as={ReactRouterLink}
											to={`episode/${ep.id.toString().padStart(2, "0")}/`}
											reloadDocument
										>
											{ep.title}
										</Button>
									))}
								</ButtonGroup>
							)}
							<ButtonGroup></ButtonGroup>
							<Example />
						</VStack>
					) : (
						<Outlet />
					)}
				</Container>
			</Flex>
		</FlipAllProvider>
	);
};

export default PurelyRelate;
