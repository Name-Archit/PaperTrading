const axios = require("axios");

const BASE_URL = "https://api.twelvedata.com";

exports.getStockPrice = async (symbol) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/price`,
      {
        params: {
          symbol,
          apikey: process.env.TWELVE_DATA_API_KEY
        }
      }
    );

    return response.data;

  } catch (err) {
    throw new Error("Stock API failed");
  }
};