import { Card } from "antd";
import "../../style/style.css";

export function ItemCurrency({ currenc, removeCurrency }) {
	const currencyName =
		currenc.fromCurrency === "USD"
			? "Доллар"
			: currenc.fromCurrency === "EUR"
			? "Евро"
			: currenc.description; // Условие для определения названия валюты

	const colorPercent = (value) => {
		// Функция для определения цвета процентного изменения
		if (value[0] === "-") {
			return "red";
		} else {
			return "green";
		}
	};

	const color = colorPercent(currenc.dayGainPercent);

	return (
		<Card className="currency-card">
			<button
				className="close-button"
				onClick={() => removeCurrency(currenc.fromCurrency)}
			>
				X
			</button>
			<img
				style={{ width: "50px", height: "50px", borderRadius: "50px" }}
				src={`${currenc.fromLogo}`}
				alt=""
			/>
			<p>
				{currenc.fromCurrency} - {currencyName}
			</p>{" "}
			{/* Отображение символа валюты */}
			<p>
				{currenc.price.toFixed(3)}
				<span style={{ color: color }}> {currenc.dayGainPercent}</span>
			</p>
		</Card>
	);
}
