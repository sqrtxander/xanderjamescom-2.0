import { CheckAllProvider, FlipAllProvider, useHeader } from "@/contexts";
import {
	Button,
	ButtonGroup,
	Center,
	Container,
	Flex,
	Heading,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
import CLExample from "./CLExample";

function ChainLinks() {
	const { updateTitle } = useHeader();
	const [episodes, setEpisodes] = useState();
	const [errored, setErrored] = useState(false);
	const [loading, setLoading] = useState(true);
	const apiURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchData = () => {
			fetch(`${apiURL}/chain-links/puzzles`)
				.then((resp) => {
					if (!resp.ok) {
						throw new Error("Error while accessing episodes");
					}
					return resp.json();
				})
				.then((data) => {
					setEpisodes(data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setErrored(true);
				});
		};
		if (window.location.pathname.replace(/\/$/gim, "") === "/chain-links") {
			updateTitle("Chain Links");
		}
		fetchData();
	}, []);

	return (
		<CheckAllProvider initCheckState={false}>
			<FlipAllProvider initState={false}>
				<Flex w={{ base: "100vw", md: "80vw" }}>
					<Container maxWidth="100%" p={4}>
						{window.location.pathname.replace(/\/$/gim, "") ===
						"/chain-links" ? (
							<VStack width="100%" spacing={4} align="stretch">
								<Text fontSize="lg">
									Here you will find some connecting trivia I have written.
								</Text>
								<Heading as="h2">Puzzles</Heading>
								{errored ? (
									<Center>
										<Text as="b">
											An error occurred while fetching episodes
										</Text>
									</Center>
								) : loading ? (
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
												to={`puzzle/${ep.id.toString().padStart(2, "0")}/`}
												reloadDocument
											>
												{"Puzzle " + ep.id}
											</Button>
										))}
									</ButtonGroup>
								)}
								<ButtonGroup></ButtonGroup>
								<CLExample />
							</VStack>
						) : (
							<Outlet />
						)}
					</Container>
				</Flex>
			</FlipAllProvider>
		</CheckAllProvider>
	);
}

export default ChainLinks;
