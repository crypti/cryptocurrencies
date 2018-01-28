import test from 'ava';
import cryptoMeta from './cryptocurrencies-meta.json';
import cryptocurrencies from '.';

test('produces a JSON object', t => {
	t.is(typeof cryptocurrencies, 'object');
	t.is(cryptocurrencies.BTC, 'Bitcoin');
});

test('produce meta JSON', t => {
	t.is(cryptoMeta.BTC.imageUrl, 'https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/BTC.png');
	t.is(cryptoMeta.BTC.iconUrl, 'https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/BTC-128.png');
});

test('.symbols', t => {
	const symbols = cryptocurrencies.symbols();
	t.is(Array.isArray(symbols), true);
	t.is(symbols.length, Object.keys(cryptocurrencies).length);
});
