import axios from "axios";

export const getAvailableCurrencies = async () => {
  try {
    const response = await axios.get(
      "/extapi/api/cash-list"
    );
    return response.data;
  } catch (error) {
    console.log("Error request");
  }
};

export const getValuesCurrencies = async () => {
  try {
    const response = await axios.get(
      "extapi/api/public/currency-rates?currency=RUB"
    );
    return response.data;
  } catch (error) {
    console.log("Error request");
  }
};
