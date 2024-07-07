import { createContext, useContext, useState } from "react";

const FlipAllContext = createContext(undefined);

function FlipAllProvider({ children, initState }) {
	const [state, setState] = useState(initState);

	const toggleFlipAll = () => {
		setState(!state);
	};

	return (
		<FlipAllContext.Provider value={{ state, toggleFlipAll }}>
			{children}
		</FlipAllContext.Provider>
	);
}

function useFlipAll() {
	return useContext(FlipAllContext);
}

export { FlipAllProvider, useFlipAll };
