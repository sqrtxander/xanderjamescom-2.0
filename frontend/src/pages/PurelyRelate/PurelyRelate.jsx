import { FlipAllProvider, useHeader } from "@/contexts";
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
import Example from "./Example";

function PurelyRelate() {
	const { updateTitle } = useHeader();
	const [episodes, setEpisodes] = useState();
	const [errored, setErrored] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = () => {
			fetch("https://api.xanderjames.com/purely-relate/episodes")
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
		if (window.location.pathname.replace(/\/$/gim, "") === "/purely-relate") {
			updateTitle("Purely Relate");
		}
		fetchData();
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
							{errored ? (
								<Center>
									<Text as="b">An error occurred while fetching episodes</Text>
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
}

export default PurelyRelate;
