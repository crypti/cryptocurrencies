import test from 'ava';
import cryptocurrencies from '.';

test('produces a JSON object', t => {
	t.is(typeof cryptocurrencies, 'object');
	t.is(cryptocurrencies.BTC, 'Bitcoin');
});

test('.symbols', t => {
	const symbols = cryptocurrencies.symbols();
	t.is(Array.isArray(symbols), true);
	t.is(symbols.length, Object.keys(cryptocurrencies).length);
});

test('.names', t => {
	const names = cryptocurrencies.names();
	t.is(Array.isArray(names), true);
	t.is(names.length, Object.keys(cryptocurrencies).length);
});

test('.search by name', t => {
	const {name, symbol} = cryptocurrencies.search({name: 'bitcoin'});
	t.is(symbol, 'BTC');
	t.is(name, 'Bitcoin');
});

test('.search by symbol', t => {
	const {name, symbol} = cryptocurrencies.search({symbol: 'btc'});
	t.is(symbol, 'BTC');
	t.is(name, 'Bitcoin');
});
