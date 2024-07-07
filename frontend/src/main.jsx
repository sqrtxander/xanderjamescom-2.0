import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "@/theme";
import { HeaderProvider } from "@/contexts";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<HeaderProvider initTitle="xanderjames">
					<App />
				</HeaderProvider>
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
