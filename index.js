'use strict';
const symbolList = require('./cryptocurrencies.json');

module.exports = symbolList;
module.exports.symbols = () => Object.keys(symbolList);
module.exports.names = () => Object.values(symbolList);
module.exports.search = ({name, symbol}) => {
	for (const [key, value] of Object.entries(symbolList)) {
		if (name) {
			if (value.toLowerCase() === name.toLowerCase().trim()) {
				return {symbol: key, name: value};
			}
		}
		if (symbol) {
			if (key.toLowerCase() === symbol.toLowerCase().trim()) {
				return {symbol: key, name: value};
			}
		}
	}

	return null;
};
