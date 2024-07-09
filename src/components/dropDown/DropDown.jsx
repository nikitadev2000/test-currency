import { Dropdown } from "antd";
import { useEffect, useState, useCallback } from "react";
import { getAvailableCurrencies } from "../../api/currencyAPI";
import { useFunction } from "../../utils/Context";
import "../../style/style.css";

export function DropDown() {
	const [nameCurrencies, setNameCurrencies] = useState([]); // массив с названием валют
	const [addMarkedList, setFunction] = useFunction();

	const items = nameCurrencies.map((item, index) => ({
		label: (
			<span
				onClick={() => {
					if (addMarkedList) {
						addMarkedList(item);
					} else {
						console.error("addMarkedList is not defined");
					}
				}}
			>
				{item.ticker} {item.description}
			</span>
		),
		key: index,
	}));

	const dataAvailableCurrencies = async () => {
		try {
			const data = await getAvailableCurrencies();
			setNameCurrencies(data.filter((item) => item.ticker !== "RUB"));
		} catch (error) {
			console.error("Error fetching available currencies:", error);
		}
	};

	useEffect(() => {
		dataAvailableCurrencies();
	}, []);

	useEffect(() => {
		setFunction(() => addMarkedList);
	}, [setFunction, addMarkedList]);

	useEffect(() => {}, [nameCurrencies]);

	return (
		<div className="dropDown">
			<Dropdown menu={{ items }}>
				<span>Выбрать валюту</span>
			</Dropdown>
		</div>
	);
}
