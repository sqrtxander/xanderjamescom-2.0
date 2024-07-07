import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { useHeader } from "@/contexts";

function Crossword() {
	const { crosswordId } = useParams();
	const { crosswords } = useOutletContext();
	const crossword = crosswords.filter((cw) => cw.rel === crosswordId)[0];
	const { updateTitle } = useHeader();
	const [error, setError] = useState(false);
	useEffect(() => {
		if (!crossword) {
			setError(true);
		}
		updateTitle(crossword.title);
	}, []);

	return (
		<Flex w="100%" h="100%">
			{error ? (
				<NotFound />
			) : (
				<iframe
					title={`Crossword #${crosswordId}`}
					src={`/crosswords/backend/${crosswordId}.html`}
					width="100%"
					height="100%"
					style={{ border: "none" }}
				/>
			)}
		</Flex>
	);
}

export default Crossword
