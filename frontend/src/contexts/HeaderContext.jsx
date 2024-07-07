import { createContext, useContext, useState } from "react";

const HeaderContext = createContext(undefined);

function HeaderProvider({ children, initTitle }) {
	const [title, setTitle] = useState(initTitle);

	const updateTitle = (newTitle) => {
		setTitle(newTitle);
	};

	return (
		<HeaderContext.Provider value={{ title, updateTitle }}>
			{children}
		</HeaderContext.Provider>
	);
}

function useHeader() {
	return useContext(HeaderContext);
}

export { HeaderProvider, useHeader };
