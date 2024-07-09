import { useState } from "react";

import { FunctionProvider } from "./utils/Context";
import { CurrencyList, DropDown } from "./components";

function App() {
	const functionState = useState(null); // Хранение функции в состоянии

	return (
		<>
			<FunctionProvider value={functionState}>
				<DropDown />
				<CurrencyList />
			</FunctionProvider>
		</>
	);
}

export default App;
