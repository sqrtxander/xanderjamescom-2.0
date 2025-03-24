import { createContext, useContext, useState } from "react";

const CheckAllContext = createContext(undefined);

function CheckAllProvider({ children, initCheckState }) {
	const [checkState, setCheckState] = useState(initCheckState);

	const toggleCheckAll = () => {
		setCheckState(!checkState);
	};

	return (
		<CheckAllContext.Provider value={{ checkState, toggleCheckAll }}>
			{children}
		</CheckAllContext.Provider>
	);
}

function useCheckAll() {
	return useContext(CheckAllContext);
}

export { CheckAllProvider, useCheckAll };
