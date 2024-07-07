import {
	Center,
	IconButton,
	Flex,
	Heading,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";

import { FiMenu, FiMoon, FiSun } from "react-icons/fi";

import { useHeader } from "@/contexts";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Header({ onShowSidebar }) {
	const { toggleColorMode } = useColorMode();
	const { title } = useHeader();
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Flex
				bg={useColorModeValue("lights.200", "darks.200")}
				p={4}
				justifyContent="center"
				maxH="72px"
			>
				<IconButton
					icon={<FiMenu w={8} h={8} />}
					variant="ghost"
					onClick={onShowSidebar}
				/>
				<Center flex="1" h="40px">
					<Heading as="h1">{title}</Heading>
				</Center>
				<IconButton
					icon={useColorModeValue(
						<FiMoon w={8} h={8} />,
						<FiSun w={8} h={8} />,
					)}
					variant="ghost"
					onClick={toggleColorMode}
				/>
			</Flex>
		</HelmetProvider>
	);
}

export default Header;
