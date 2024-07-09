import { createContext, useContext } from "react";

const FunctionContext = createContext(null);

export const useFunction = () => useContext(FunctionContext);

export const FunctionProvider = ({ children, value }) => (
	<FunctionContext.Provider value={value}>{children}</FunctionContext.Provider>
);
