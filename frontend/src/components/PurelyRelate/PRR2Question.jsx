import PRR12Question from "./PRR12Question";

function PRR2Question({ glyph, backs, relation, explanation }) {
	return PRR12Question({
		glyph: glyph,
		backs: backs,
		relation: relation,
		explanation: explanation,
		round: 2,
	});
}

export default PRR2Question;
