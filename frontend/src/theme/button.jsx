import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { Button as DefaultTheme } from "@chakra-ui/theme/components";

const variantDisabledSolid = defineStyle((props) => {
	const baseStyle = DefaultTheme.variants.solid(props);
	return {
		...baseStyle,
		_disabled: {
			opacity: 1,
			cursor: "default",
		},
	};
});

export const buttonTheme = defineStyleConfig({
	variants: {
		disabledSolid: variantDisabledSolid,
	},
});
