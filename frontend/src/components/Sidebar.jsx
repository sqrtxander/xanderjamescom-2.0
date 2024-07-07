import {
	Button,
	Drawer,
	DrawerOverlay,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerContent,
	VStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const SidebarContent = ({ onClick }) => (
	<VStack>
		<Button onClick={onClick} w="100%" as={ReactRouterLink} to="/">
			Home
		</Button>
		<Button onClick={onClick} w="100%" as={ReactRouterLink} to="/purely-relate">
			Purely Relate
		</Button>
		<Button onClick={onClick} w="100%" as={ReactRouterLink} to="/crosswords">
			Cryptic Crosswords
		</Button>
	</VStack>
);

function Sidebar({ isOpen, onClose }) {
	return (
		<Drawer
			colorScheme="body"
			isOpen={isOpen}
			placement="left"
			onClose={onClose}
		>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>xanderjames</DrawerHeader>
					<DrawerBody>
						<SidebarContent onClick={onClose} />
					</DrawerBody>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	);
}

export default Sidebar;
