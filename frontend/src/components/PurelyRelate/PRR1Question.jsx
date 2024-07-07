import PRR12Question from "./PRR12Question";

function PRR1Question({ glyph, backs, relation, explanation }) {
	return PRR12Question({
		glyph: glyph,
		backs: backs,
		relation: relation,
		explanation: explanation,
		round: 1,
	});
}

export default PRR1Question;
