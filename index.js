'use strict';
const symbolList = require('./cryptocurrencies.json');

module.exports = symbolList;
module.exports.symbols = () => Object.keys(symbolList);
