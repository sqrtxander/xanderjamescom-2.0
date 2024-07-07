import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
	overlay: {
		bg: "blackAlpha.200",
	},
	dialog: {
		borderRadius: "md",
		bg: "lights.200",
		color: "black",
		_dark: {
			bg: "darks.200",
			color: "white",
		},
	},
});

export const drawerTheme = defineMultiStyleConfig({
	baseStyle,
});
