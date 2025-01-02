import { Container, Grid, HStack, Heading } from "@chakra-ui/react";
import Glyph from "./Glyph";
import PRRelation from "./PRRelation";
import PRClue from "./PRClue";

function PRR12Question({ glyph, backs, relation, explanation, round }) {
	return (
		<Container maxW="100%" padding={0}>
			<HStack gap={5}>
				<Glyph glyph={glyph} />
				<Heading as="h3">{glyph}</Heading>
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
