import { useHeader } from "@/contexts";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const NotFound = () => {
	const { updateTitle } = useHeader();
	useEffect(() => {
		updateTitle("xanderjames");
	}, []);
	return (
		<Flex
			w="100%"
			h="100%"
			justifyContent={"center"}
			alignItems={"center"}
			px={4}
		>
			<Container maxW={"Container.md"} padding={0}>
				<Heading as="h1" textAlign="center">
					404 Not Found
				</Heading>
			</Container>
		</Flex>
	);
};

export default NotFound;
