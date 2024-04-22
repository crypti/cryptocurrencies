/**
 * Get a Markdown table of currencies.
 * @param {JSON} data - the map of currency key:value pairs
 * @param {JSON} symbols - the symbols to create a table for
 * @returns {string}
 */
export function getMarkdownTableFromSymbols(data, symbols) {
	let table = '';

	table += '| Symbol | Name |\n';
	table += '| :------ | :------ |\n';

	for (const symbol of symbols) {
		table += `| \`${symbol}\` | ${data[symbol]} |\n`;
	}

	return table;
}

export function getDetailSummaryFromSymbolData(data) {
	let table = '';

	// Keep a map of all the keys, we wil use this to sort all of the keys to build the
	// collapsable setions in the readme, organized alphabetically.
	const symbolMap = {};

	for (const symbol of Object.keys(data)) {
		let key = symbol.toUpperCase()[0];

		// If the key starts with a number, add it to the 0-9 key.
		if ('0123456789'.includes(key)) {
			key = '0-9';
		}

		if (symbol.length > 0 && !symbolMap[key]) {
			symbolMap[key] = [];
		}

		symbolMap[key].push(symbol);
	}

	for (const key of Object.keys(symbolMap).sort()) {
		table += `<details><summary>${key} (${symbolMap[key].length})</summary>\n\n`;
		table += getMarkdownTableFromSymbols(data, symbolMap[key]);
		table += '</details>\n\n';
	}

	return table;
}
