const fetch = require('node-fetch');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const currentCryptocurrenciesList = require('./cryptocurrencies.json');

// Get all symbols from coinmarketcap (limit=0 means all)
fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0')
.then(response => response.json())
.then(jsonResponse => {
	const missingCryptocurrenciesList = getMissingCurrencies(jsonResponse);
	const missingCryptocurrenciesLength = Object.keys(missingCryptocurrenciesList).length;
	if (missingCryptocurrenciesLength) {
		console.log(`Found ${missingCryptocurrenciesLength} new cryptocurrencies.`);
		const unsortedCurrenciesList = Object.assign(missingCryptocurrenciesList, currentCryptocurrenciesList);
		const sortedCurrenciesList = sortObjectsByValue(unsortedCurrenciesList);
		saveToFile('cryptocurrencies.json', sortedCurrenciesList);
	} else {
		console.log('List already seems up-to-date! We stop here.');
	}
})
.catch(err => {
	console.log('Error', err);
});

function saveToFile(fileName, content) {
	jsonfile.writeFile(fileName, content, {spaces: 2}, err => {
		if (err) {
			console.log('Shit, something went wrong. Error writing to file.', err);
		} else {
			console.log(`Done syncing! List has now ${Object.keys(content).length} cryptocurrencies.`);
		}
	});
}

function getMissingCurrencies(coinmarketcapList) {
	return coinmarketcapList.reduce((list, coinmarketcap) => {
		if (!currentCryptocurrenciesList[coinmarketcap.symbol]) {
			list[coinmarketcap.symbol] = coinmarketcap.name;
		}
		return list;
	}, {});
}

function sortObjectsByValue(unsortedObject) {
	return _(unsortedObject).toPairs().sortBy(1).fromPairs().value();
}
