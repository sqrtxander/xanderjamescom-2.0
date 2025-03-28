import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Spinner,
	useBreakpointValue,
	VStack,
} from "@chakra-ui/react";

import { Fragment } from "react";
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
	const isSmallScreen = useBreakpointValue({ base: true, md: false });

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
				<Flex width="100%" height="100%" justifyContent="center">
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
						<Divider width="100%" borderWidth="4px" borderRadius="4px" />
						{episodeContent.chains.map((chain, i) => (
							<Fragment key={i}>
								<CLChain
									left={chain.left}
									middle={chain.middle}
									right={chain.right}
								/>
								<Divider width="100%" borderWidth="4px" borderRadius="4px" />
							</Fragment>
						))}
						<CLConnection
							front="Reveal connection"
							back={episodeContent.connection}
							width="100%"
						/>
						<Divider width="100%" borderWidth="4px" borderRadius="4px" />
					</VStack>
				</Flex>
			)}
		</>
	);
}
export default Episode;
