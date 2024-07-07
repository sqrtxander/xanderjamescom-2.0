import { Button, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import { FlipAllProvider, useFlipAll, useHeader } from "@/contexts";
import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound/NotFound";

import {
	PRR1Question,
	PRR2Question,
	PRR3Question,
	PRR4Question,
} from "@/components";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Episode() {
	const [episodeContent, setEpisodeContent] = useState();
	const [loading, setLoading] = useState(true);
	const [errorred, setErrored] = useState(false);
	const { episodeId } = useParams();
	const { updateTitle } = useHeader();
	if (!/^\d+$/.test(episodeId) || episodeId.length !== 2) {
		return <NotFound />;
	}
	const episodeIdInt = parseInt(episodeId, 10);
	const { toggleFlipAll, state } = useFlipAll();

	useEffect(() => {
		const fetchDataAndSetTitle = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/purely-relate/api/${episodeIdInt}`,
				);
				if (!response.ok) {
					throw new Error("Episode Not found");
				}
				const data = await response.json();
				setEpisodeContent(data);
				setLoading(false);
				updateTitle(`Purely Relate ${data.title}`);
			} catch (error) {
				console.log(error);
				setErrored(true);
			}
		};
		fetchDataAndSetTitle();
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
							Flip all
						</Button>
						<Heading as="h2">Round 1: Relations</Heading>
						{episodeContent.relations.map((question, i) => (
							<PRR1Question
								key={i}
								glyph={question.glyph}
								backs={question.clues}
								relation={question.relation}
								explanation={question.explanation}
							/>
						))}
						<Heading as="h2">Round 2: Progressions</Heading>
						{episodeContent.progressions.map((question, i) => (
							<PRR2Question
								key={i}
								glyph={question.glyph}
								backs={question.clues}
								relation={question.relation}
								explanation={question.explanation}
							/>
						))}
						<Heading as="h2">Round 3: Relating Surfaces</Heading>
						{episodeContent.surfaces.map((question, i) => (
							<PRR3Question
								key={i}
								glyph={question.glyph}
								groups={question.groups}
							/>
						))}
						<Heading as="h2">Round 4: Consonants Only</Heading>
						<VStack width="100%" spacing={20} align="stretch">
							{episodeContent.consonants.map((question, i) => (
								<PRR4Question
									key={i}
									relation={question.relation}
									questions={question.questions}
								/>
							))}
						</VStack>
					</VStack>
				</Flex>
			)}
		</>
	);
}
export default Episode;
