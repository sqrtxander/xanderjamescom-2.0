import { useHeader } from "@/contexts";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";

const CrosswordsHome = () => {
	const { updateTitle } = useHeader();
	useEffect(() => {
		if (window.location.pathname.replace(/\/$/gim, "") === "/crosswords") {
			updateTitle("Cryptic Crosswords");
		}
	}, []);

	const crosswords = [{ title: "Crossword #01", rel: "01" }];

	return (
		<>
			{window.location.pathname.replace(/\/$/gim, "") === "/crosswords" ? (
				<Flex w={{ base: "100vw", md: "80vw" }} h="100%" p={5}>
					<ButtonGroup>
						{crosswords.map((cw, i) => (
							<Button
								key={i}
								size="lg"
								colorScheme="blue"
								as={ReactRouterLink}
								to={cw.rel}
								reloadDocument
							>
								{cw.title}
							</Button>
						))}
					</ButtonGroup>
				</Flex>
			) : (
				<Outlet context={{ crosswords }} />
			)}
		</>
	);
};

export default CrosswordsHome;
