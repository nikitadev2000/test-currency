import { ItemCurrency } from "../itemCurrency/ItemCurrency";
import { useEffect, useState } from "react";
import { useFunction } from "../../utils/Context";
import { getValuesCurrencies } from "../../api/currencyAPI";
import "../../style/style.css";

export function CurrencyList() {
	const [, setFunction] = useFunction();
	const [valuesCurrencies, setValuesCurrencies] = useState([]);
	const [markedCurrencies, setMarkedCurrencies] = useState([]);

	const addMarkedList = (currency) => {
		const { ticker, description } = currency;

		setMarkedCurrencies((prevMarkedCurrencies) => {
			if (prevMarkedCurrencies.find((item) => ticker === item.fromCurrency)) {
				return prevMarkedCurrencies; // валюта уже существует
			}

			const newItems = valuesCurrencies
				.filter((item) => ticker === item.fromCurrency)
				.map((item) => ({ ...item, description }));

			if (newItems.length > 0) {
				const updatedMarkedCurrencies = [...prevMarkedCurrencies, ...newItems];
				const currencies =
					JSON.parse(sessionStorage.getItem("currencies")) || [];
				const updatedCurrencies = [...currencies, ...newItems];
				sessionStorage.setItem("currencies", JSON.stringify(updatedCurrencies));
				return updatedMarkedCurrencies;
			}
			return prevMarkedCurrencies;
		});
	};

	useEffect(() => {
		setFunction(() => addMarkedList);
	}, [setFunction, valuesCurrencies]);

	const dataValuesCurrencies = async () => {
		try {
			const data = await getValuesCurrencies();
			setValuesCurrencies(data);

			if (
				sessionStorage.getItem("isFirstLoading") === "true" ||
				!sessionStorage.getItem("currencies")
			) {
				const initialUSD = data[0];
				const initialEUR = data[1];
				sessionStorage.setItem(
					"currencies",
					JSON.stringify([initialEUR, initialUSD])
				);
				sessionStorage.setItem("isFirstLoading", "false");
			}
		} catch (error) {
			console.error("Error fetching available currencies:", error);
		}
	};

	useEffect(() => {
		const isFirstLoading = sessionStorage.getItem("isFirstLoading");
		if (isFirstLoading) return;
		sessionStorage.setItem("isFirstLoading", "true");
	}, []);

	useEffect(() => {
		dataValuesCurrencies().then(() => {
			const openedItems =
				JSON.parse(sessionStorage.getItem("currencies")) || [];
			setMarkedCurrencies(openedItems);
		});
	}, []);

	const removeCurrency = (fromCurrency) => {
		if (fromCurrency) {
			setMarkedCurrencies((prevMarkedCurrencies) =>
				prevMarkedCurrencies.filter(
					(curr) => curr.fromCurrency !== fromCurrency
				)
			);

			const currencies = JSON.parse(sessionStorage.getItem("currencies")) || [];
			const filteredCurrencies = currencies.filter(
				(item) => fromCurrency !== item.fromCurrency
			);
			sessionStorage.setItem("currencies", JSON.stringify(filteredCurrencies));
		}
		return;
	};

	return (
		<div className="currency-card-container">
			{markedCurrencies.map((item, index) => (
				<ItemCurrency
					key={index}
					currenc={item}
					removeCurrency={removeCurrency}
				/>
			))}
		</div>
	);
}
