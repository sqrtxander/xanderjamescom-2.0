import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import NotFound from "./pages/NotFound/NotFound";
import PurelyRelate from "./pages/PurelyRelate/PurelyRelate";
import PREpisode from "./pages/PurelyRelate/Episode";
import { Sidebar, Header } from "./components";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import CrosswordsHome from "./pages/Crosswords/Crosswords";
import Crossword from "./pages/Crosswords/Crossword";

function App() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
	return (
		<>
			<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
			<Box height="100vh">
				<Header onShowSidebar={toggleSidebar} />
				<Flex h="calc(100% - 72px)" w="100%" justifyContent="center">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/purely-relate" element={<PurelyRelate />}>
							<Route path="episode/:episodeId" element={<PREpisode />} />
						</Route>
						<Route path="/crosswords" element={<CrosswordsHome />}>
							<Route path=":crosswordId" element={<Crossword />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Flex>
			</Box>
		</>
	);
}

export default App;
