import {createRequire} from "module";
const require = createRequire(import.meta.url);
const axios=require("axios").default;
const cheerio = require("cheerio");
const express = require('express');
const app = express();

const options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {
    to_currency: 'JPY',
    function: 'CURRENCY_EXCHANGE_RATE',
    from_currency: 'TWD'
  },
  headers: {
    'x-rapidapi-key': 'e45f5a2f67msh9185e042c95c54fp1e1a65jsn0f3df8e8f887',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}