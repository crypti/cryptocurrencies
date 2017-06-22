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
