const fs = require('fs');
const fetch = require('isomorphic-fetch');
const sortby = require('lodash.sortby');

const endpoint = 'https://www.cryptocompare.com/api/data/coinlist/';

/**
 * Build the JSON file based on the cryptocompare coinlist.
 */
fetch(endpoint)
.then(response => response.json())
.then(json => {
	const sorted = sortby(json.Data, o => o.CoinName);

	const symbols = {};

	sorted.forEach(currency => {
		const {Name, CoinName} = currency;
		symbols[Name] = CoinName;
	});

	fs.writeFileSync('cryptocurrencies.json', JSON.stringify(symbols, null, 2));
	console.log('JSON File written');
});
