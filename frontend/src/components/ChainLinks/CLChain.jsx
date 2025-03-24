import {
	Button,
	Container,
	Flex,
	Grid,
	HStack,
	VStack,
} from "@chakra-ui/react";
import CLMiddle from "./CLMiddle";
import CLSide from "./CLSide";
import {
	MdCheck,
	MdClose,
	MdQuestionMark,
	MdOutlineCheckBoxOutlineBlank,
	MdOutlineCheckBox,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useCheckAll, useFlipAll } from "@/contexts";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function CLChain({ left, middle, right }) {
	const [isFlipped, setFlipped] = useState(false);
	const [isChecked, setChecked] = useState(false);
	const [userValue, setUserValue] = useState("");
	const { state } = useFlipAll();
	const { checkState } = useCheckAll();

	const isCorrect = () => {
		return (
			(isFlipped ? middle : userValue).localeCompare(middle, undefined, {
				sensitivity: "accent",
			}) === 0
		);
	};

	useEffect(() => {
		setFlipped(state);
	}, [state]);

	useEffect(() => {
		setChecked(checkState);
	}, [checkState]);

	return (
		<Container maxW={{ base: "100%", md: "80%" }} padding={0}>
			<HStack width="100%" spacing={4} alignItems="flex-start">
				<VStack
					width="20%"
					alignSelf="stretch"
					justifyContent="center"
					alignItems="center"
				>
					<Button
						leftIcon={
							isFlipped ? (
								<IoEyeOutline size="1.5em" />
							) : (
								<IoEyeOffOutline size="1.5em" />
							)
						}
						variant="outline"
						colorScheme="blue"
						width="80%"
						onClick={() => setFlipped(!isFlipped)}
					>
						Reveal
					</Button>
					<Button
						leftIcon={
							isChecked ? (
								<MdOutlineCheckBox size="1.5em" />
							) : (
								<MdOutlineCheckBoxOutlineBlank size="1.5em" />
							)
						}
						variant="outline"
						colorScheme="blue"
						width="80%"
						onClick={() => setChecked(!isChecked)}
					>
						Check
					</Button>
				</VStack>
				<Grid
					width="80%"
					templateRows="1fr"
					templateColumns="repeat(3, 1fr)"
					gap={3}
				>
					<CLSide front={left} />
					<CLMiddle
						value={isFlipped ? middle : userValue}
						setUserValue={setUserValue}
						disabled={isFlipped || isChecked}
					/>
					<CLSide front={right} />
				</Grid>
				<Flex
					width="20%"
					alignSelf="stretch"
					justifyContent="center"
					alignItems="center"
				>
					{isChecked ? (
						isCorrect() ? (
							<MdCheck size="1.5em" />
						) : (
							<MdClose size="1.5em" />
						)
					) : (
						<MdQuestionMark size="1.5em" />
					)}
				</Flex>
			</HStack>
		</Container>
	);
}

export default CLChain;
