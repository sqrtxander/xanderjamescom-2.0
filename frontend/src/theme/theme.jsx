import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { drawerTheme as Drawer } from "./drawer";
import { buttonTheme as Button} from "./button";
import "@fontsource/noto-sans-egyptian-hieroglyphs";

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	colors: {
		darks: {
			100: "#2e2e38",
			200: "#1c1c22",
		},
		lights: {
			100: "#ffffff",
			200: "#e8e8e8",
		},
	},
	fonts: {
		glyph: `"Noto Sans Egyptian Hieroglyphs", "sans-serif"`,
	},
	styles: {
		global: (props) => ({
			body: {
				bg: mode("lights.100", "darks.100")(props),
			},
		}),
	},
	components: {
		Drawer,
		Button,
	},
});

export default theme;
