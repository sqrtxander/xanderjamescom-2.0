import {
	Button,
	Flex,
	Heading,
	HStack,
	Spinner,
	VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useCheckAll, useFlipAll, useHeader } from "@/contexts";
import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound/NotFound";

import { CLChain, CLConnection } from "@/components";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import {
	MdOutlineCheckBoxOutlineBlank,
	MdOutlineCheckBox,
} from "react-icons/md";

function Episode() {
	const [episodeContent, setEpisodeContent] = useState();
	const [loading, setLoading] = useState(true);
	const [errorred, setErrored] = useState(false);
	const { toggleFlipAll, state } = useFlipAll();
	const { toggleCheckAll, checkState } = useCheckAll();
	const { updateTitle } = useHeader();
	const { puzzleId } = useParams();
	const puzzleIdInt = parseInt(puzzleId, 10);
	const apiURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchDataAndSetTitle = () => {
			fetch(`${apiURL}/chain-links/${puzzleIdInt}`)
				.then((resp) => {
					if (!resp.ok) {
						throw new Error(`Puzzle ${puzzleId} not found`);
					}
					return resp.json();
				})
				.then((data) => {
					setEpisodeContent(data);
					setLoading(false);
					updateTitle(`Chain Links ${puzzleId}`);
				})
				.catch((err) => {
					console.log(err);
					setErrored(true);
				});
		};
		if (!/^\d+$/.test(puzzleId) || puzzleId.length !== 2) {
			setErrored(true);
		} else {
			fetchDataAndSetTitle();
		}
	}, []);

	return (
		<>
			{errorred ? (
				<NotFound />
			) : loading ? (
				<Flex
					width="100%"
					height="100%"
					justifyContent="center"
					alignItems="center"
				>
					<Spinner size="xl" />
				</Flex>
			) : (
				<Flex width="100%" minHeight="100%">
					<VStack width="100%" spacing={4} alignItems="flex-start">
						<HStack
							width="100%"
							spacing={4}
							alignItems="center"
							justifyContent="center"
						>
							<Button
								leftIcon={
									state ? (
										<IoEyeOutline size="1.5em" />
									) : (
										<IoEyeOffOutline size="1.5em" />
									)
								}
								size="lg"
								variant="outline"
								colorScheme="blue"
								onClick={toggleFlipAll}
							>
								Reveal all
							</Button>
							<Button
								leftIcon={
									checkState ? (
										<MdOutlineCheckBox size="1.5em" />
									) : (
										<MdOutlineCheckBoxOutlineBlank size="1.5em" />
									)
								}
								size="lg"
								variant="outline"
								colorScheme="blue"
								onClick={toggleCheckAll}
							>
								Check all
							</Button>
						</HStack>
						{episodeContent.chains.map((chain, i) => (
							<CLChain
								key={i}
								left={chain.left}
								middle={chain.middle}
								right={chain.right}
							/>
						))}
						<Flex width="100%" justifyContent="center">
							<CLConnection
								front="Reveal connection"
								back={episodeContent.connection}
								width="80%"
							/>
						</Flex>
					</VStack>
				</Flex>
			)}
		</>
	);
}
export default Episode;
