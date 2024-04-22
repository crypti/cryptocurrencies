import test from 'ava';
import cryptocurrencies, {symbols} from './index.js';

test('cryptocurrencies produces a JSON object', t => {
	t.is(typeof cryptocurrencies, 'object');
	t.is(cryptocurrencies.BTC, 'Bitcoin');
});

test('symbols', t => {
	t.is(Array.isArray(symbols), true);
	t.is(symbols.length, Object.keys(cryptocurrencies).length);
});
