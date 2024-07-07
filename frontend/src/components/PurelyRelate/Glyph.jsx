import { Text, useTheme } from "@chakra-ui/react";

function Glyph({ children, ...props }) {
	const theme = useTheme();
	return (
		<Text {...props} fontFamily={theme.fonts.glyph} fontSize="5xl">
			{children}
		</Text>
	);
}

export default Glyph;
