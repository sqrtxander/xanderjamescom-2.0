import {
	Button,
	ButtonGroup,
	Center,
	Container,
	Grid,
	HStack,
	Heading,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Glyph from "./Glyph";
import PRSurfaceBox from "./PRSurfaceBox";
import PRSurfaceRelation from "./PRSurfaceRelation";
import { useOrientation } from "react-use";
import { useFlipAll } from "@/contexts";

const initWall = (groups) => {
	let start = [];
	[...groups].map(
		(group, i) =>
			(start = [
				...start,
				...group.clues.map((clue) => ({
					clue: clue,
					groupId: i,
					color: "blue",
					disabled: false,
					solved: false,
					relation: group.relation,
				})),
			]),
	);
	shuffle(start, 0);
	return start;
};

const shuffle = (wall, start) => {
	for (let i = start; i < wall.length; i++) {
		const newIdx = Math.floor(Math.random() * (wall.length - start)) + start;
		const temp = wall[i];
		wall[i] = wall[newIdx];
		wall[newIdx] = temp;
	}
};

function PRR3Question({ groups, glyph }) {
	const [selected, setSelected] = useState([]);
	const [groupsFound, setGroupsFound] = useState(0);
	const [wall, setWall] = useState(initWall(groups));
	const { state } = useFlipAll();
	const groupColors = ["green", "yellow", "red", "teal"];

	const resetWall = () => {
		setGroupsFound(0);
		setSelected([]);
		setWall(initWall(groups));
	};

	useEffect(() => {
		if (state) {
			solveWall();
		} else {
			resetWall();
		}
	}, [state]);

	const solveWall = () => {
		let found = groupsFound;
		let newWall = [...wall];
		while (found < 4) {
			const currGroup = newWall[found * 4].groupId;
			let toSelect = [found * 4];
			for (let i = found * 4 + 1; i < newWall.length; i++) {
				if (newWall[i].groupId === currGroup) {
					toSelect.push(i);
				}
			}
			toSelect.map((idx, i) => {
				let temp = newWall.splice(idx, 1);
				temp[0].solved = true;
				temp[0].color = groupColors[found];
				newWall.splice(i + 4 * found, 0, temp[0]);
			});
			found++;
		}
		setWall(newWall);
		setGroupsFound(found);
		setSelected([]);
	};

	const onClick = (i) => {
		// deselecting
		if (selected.includes(i)) {
			setSelected(selected.filter((s) => s !== i));
			setWall(wall.map((f, j) => (j === i ? { ...f, color: "blue" } : f)));
			return;
		}
		// selecting
		setSelected([...selected, i]);
		setWall(
			wall.map((f, j) =>
				j === i ? { ...f, color: groupColors[groupsFound] } : f,
			),
		);
	};
	useEffect(() => {
		if (selected.length !== 4) {
			return;
		}

		// 4 Selected
		if (isGroup()) {
			manageGroup();
			return;
		}

		// not a group
		setWall(
			wall.map((w) => {
				return { ...w, disabled: true };
			}),
		);
		setTimeout(() => {
			setWall(
				wall.map((w, j) =>
					selected.includes(j) ? { ...w, disabled: false, color: "blue" } : w,
				),
			);
			setSelected([]);
		}, 500);
	}, [selected]);

	const isGroup = () => {
		let id = wall[selected[0]].groupId;
		for (let i = 1; i < selected.length; i++) {
			if (wall[selected[i]].groupId !== id) {
				return false;
			}
		}
		return true;
	};

	const manageGroup = () => {
		let sorted = [...selected];
		sorted.sort((a, b) => a - b);

		let newWall = [...wall];
		sorted.map((idx, i) => {
			let temp = newWall.splice(idx, 1);
			temp[0].solved = true;
			temp[0].color = groupColors[groupsFound];
			newWall.splice(i + 4 * groupsFound, 0, temp[0]);
		});
		setWall(newWall);

		setGroupsFound(groupsFound + 1);
		setSelected([]);
	};

	useEffect(() => {
		if (groupsFound === 3) {
			setSelected([12, 13, 14, 15]);
		}
	}, [groupsFound]);

	const glyphs = {
		jackal: { glyphChar: "𓃥", glyphWord: "Jackal" },
		pots: { glyphChar: "𓏍", glyphWord: "Three Pots" },
		lotus: { glyphChar: "𓆸", glyphWord: "Lotus" },
		vulture: { glyphChar: "𓅐", glyphWord: "Vulture" },
		man: { glyphChar: "𓀀", glyphWord: "Seated Man" },
		sickle: { glyphChar: "𓌴", glyphWord: "Sickle" },
	};
	const { glyphChar, glyphWord } = glyphs[glyph];
	const { type } = useOrientation();

	const renderWall = () => {
		const renderedItems = [];
		wall.map((card, i) => {
			renderedItems.push(
				<PRSurfaceBox
					key={i}
					colors={card.color}
					disabled={card.solved || card.disabled}
					front={card.clue}
					onClick={() => onClick(i)}
				/>,
			);
			if (i % 4 === 3 && groupsFound === 4) {
				renderedItems.push(
					<PRSurfaceRelation
						key={i * 100}
						colSpan={4}
						front="Show relation"
						back={wall[i].relation}
					/>,
				);
			}
		});
		return renderedItems;
	};

	return (
		<Container maxW="100%" padding={0}>
			<VStack w="100%" gap={5} alignItems="flex-start" paddingBottom={20}>
				<HStack gap={5}>
					<Glyph>{glyphChar}</Glyph>
					<Heading as="h3">{glyphWord}</Heading>
				</HStack>
				<Center w="100%">
					<ButtonGroup>
						<Button
							variant="outline"
							size={{ base: "md", md: "lg" }}
							colorScheme="blue"
							isDisabled={groupsFound === 4}
							onClick={solveWall}
						>
							Solve Wall
						</Button>
						<Button
							variant="outline"
							size={{ base: "md", md: "lg" }}
							colorScheme="blue"
							isDisabled={groupsFound === 4}
							onClick={() => {
								let newWall = [...wall];
								shuffle(newWall, groupsFound * 4);
								setWall(newWall);
							}}
						>
							Shuffle Wall
						</Button>
						<Button
							variant="outline"
							size={{ base: "md", md: "lg" }}
							colorScheme="blue"
							isDisabled={groupsFound !== 4}
							onClick={resetWall}
						>
							Reset Wall
						</Button>
					</ButtonGroup>
				</Center>
				<Grid
					w="100%"
					templateRows={
						groupsFound === 4 ? "repeat(4, 2fr 1fr)" : "repeat(4, 1fr)"
					}
					templateColumns="repeat(4, 1fr)"
					gap={3}
					aspectRatio={type === "landscape-primary" ? 16 / 9 : 1}
				>
					{renderWall()}
				</Grid>
			</VStack>
		</Container>
	);
}

export default PRR3Question;
