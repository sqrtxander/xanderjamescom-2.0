import { VStack } from "@chakra-ui/react";
import PRConsonantsCategory from "./PRConsonantsCategory";
import PRConsonantsClue from "./PRConsonantsClue";

function PRR4Question({ relation, questions }) {
	return (
		<VStack>
			<PRConsonantsCategory front={relation} />
			{questions.map((el, i) => (
				<PRConsonantsClue key={i} front={el.clue} back={el.answer} />
			))}
		</VStack>
	);
}

export default PRR4Question;
