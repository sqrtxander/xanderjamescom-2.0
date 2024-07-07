import { Container, Grid, HStack, Heading } from "@chakra-ui/react";
import Glyph from "./Glyph";
import PRRelation from "./PRRelation";
import PRClue from "./PRClue";

function PRR12Question({ glyph, backs, relation, explanation, round }) {
	const glyphs = {
		jackal: { glyphChar: "𓃥", glyphWord: "Jackal" },
		pots: { glyphChar: "𓏍", glyphWord: "Three Pots" },
		lotus: { glyphChar: "𓆸", glyphWord: "Lotus" },
		vulture: { glyphChar: "𓅐", glyphWord: "Vulture" },
		man: { glyphChar: "𓀀", glyphWord: "Seated Man" },
		sickle: { glyphChar: "𓌴", glyphWord: "Sickle" },
	};
	const { glyphChar, glyphWord } = glyphs[glyph];

	return (
		<Container maxW="100%" padding={0}>
			<HStack gap={5}>
				<Glyph>{glyphChar}</Glyph>
				<Heading as="h3">{glyphWord}</Heading>
			</HStack>
			<Grid
				templateRows={{ base: "repeat(3, 1fr)", md: "repeat(2, 1fr)" }}
				templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
				gap={3}
			>
				{backs.map((el, i) => (
					<PRClue
						key={i}
						front={
							round === 2 && i === 3 ? "Show answer" : `Show clue ${i + 1}`
						}
						back={el}
					/>
				))}
				<PRRelation
					front="Show relation"
					back={relation}
					explanation={explanation}
					colSpan={{ base: "2", md: "4" }}
				/>
			</Grid>
		</Container>
	);
}

export default PRR12Question;
