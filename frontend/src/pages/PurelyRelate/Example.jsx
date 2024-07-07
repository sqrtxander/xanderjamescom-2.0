import { useFlipAll } from "@/contexts";

import {
	PRR1Question,
	PRR2Question,
	PRR3Question,
	PRR4Question,
} from "@/components";

import { VStack, Heading, Button, Text } from "@chakra-ui/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function Example() {
	const { toggleFlipAll, state } = useFlipAll();
	return (
		<VStack width="100%" spacing={4} alignItems="flex-start">
			<Heading as="h1">Overview and Example Questions</Heading>
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
			<Text fontSize="lg">
				Each set of four clues is related in some way. You can reveal up to 4
				clues one at a time, and have to say what relates the clues. The fewer
				clues you see before guessing the relation, the more imaginary points
				you get.
			</Text>
			<PRR1Question
				glyph="jackal"
				backs={["Jade", "Mint", "Chartreuse", "Emerald"]}
				relation="Shades of green"
			/>
			<Heading as="h2">Round 2: Progressions</Heading>
			<Text fontSize="lg">
				This time the related clues form a progression. You can reveal up to 3
				clues one at a time, and have to say what comes fourth in the
				progression.
			</Text>
			<PRR2Question
				glyph="lotus"
				backs={[
					"US Department of Defence building",
					"Honeycomb cell",
					"50p coin",
					"(e.g.) Stop sign",
				]}
				relation="Pentagon to octagon"
			/>
			<Heading as="h2">Round 3: Relating Surfaces</Heading>
			<Text fontSize="lg">
				There are 16 clues and 4 related groups of 4. Select clues to group them
				together. After grouping all the clues, or pressing the "Solve surface"
				button, you say the relations of the groups similarly to round 1.
			</Text>
			<PRR3Question
				glyph="pots"
				groups={[
					{
						clues: ["Non", "Nei", "Nein", "Nee"],
						relation: "No in different languages",
					},
					{
						clues: ["Helium", "Neon", "Krypton", "Radon"],
						relation: "Noble gases",
					},
					{
						clues: ["Colonel", "Captain", "General", "Lieutenant"],
						relation: "Military ranks",
					},
					{
						clues: ["Scales", "Feathers", "Fur", "Skin"],
						relation: "Body coverings",
					},
				]}
			/>
			<Heading as="h2">Round 4: Consonants Only</Heading>
			<Text fontSize="lg">
				In this round, you know the relation of the four clues, however only the
				consonants of the clues are shown, and the spacing has been randomised.
				Name the correct full clue for the imaginary points.
			</Text>
			<VStack width="100%" spacing={20} align="stretch">
				<PRR4Question
					relation="Ways of saying for example"
					questions={[
						{ clue: "FRNS TNCE", answer: "FOR INSTANCE" },
						{
							clue: "B YWY FL LSTR TN",
							answer: "BY WAY OF ILLUSTRATION",
						},
						{ clue: "CSN PNT", answer: "CASE IN POINT" },
						{ clue: "X MP LGRT", answer: "EXEMPLI GRATIA" },
					]}
				/>
			</VStack>
		</VStack>
	);
}

export default Example;
