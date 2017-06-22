const fs = require('fs');
const fetch = require('isomorphic-fetch');
const sortby = require('lodash.sortby');

const endpoint = 'https://www.cryptocompare.com/api/data/coinlist/';

fetch(endpoint)
.then(response => response.json())
.then(json => {
	const sorted = sortby(json.Data, o => o.CoinName);

	const symbols = {};

	/**
	 * Build the JSON file based on the cryptocompare coinlist.
	 */
	sorted.forEach(currency => {
		const {Name, CoinName} = currency;
		symbols[Name] = CoinName;
	});

	fs.writeFileSync('cryptocurrencies.json', JSON.stringify(symbols, null, 2));
	console.log('JSON File written');

	/**
	 * Build the Markdown Table of currencies in the Readme.
	 */
	const template = fs.readFileSync('readme.md').toString();
	const data = JSON.parse(fs.readFileSync('cryptocurrencies.json').toString());

	const newSymbols = Object.keys(data);

	let table = `There are currently **${newSymbols.length} cryptocurrencies** represented*:\n`;
	table += '\n\n';
	table += '| Symbol | Name |\n';
	table += '| :------ | :------ |\n';

	newSymbols.forEach(symbol => {
		table += `| \`${symbol}\` | ${data[symbol]} |\n`;
	});

	table += `\n<small><em>* Last updated: ${new Date().toUTCString()}</em></small>`;

	// Look for the HTML comments in the README as a target
	const targetRegex = /<!-- BEGIN TABLE INJECT -->(\w|\W)*<!-- END TABLE INJECT -->/gim;
	const updated = template.replace(targetRegex, `<!-- BEGIN TABLE INJECT -->\n${table}\n<!-- END TABLE INJECT -->`);
	fs.writeFileSync('readme.md', updated);
	console.log('Readme Markdown Table updated');
})
.catch(err => console.error(err));
