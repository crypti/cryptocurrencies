import test from 'ava';
import cryptocurrencies from '.';

test('produces a JSON object', t => {
	t.is(typeof cryptocurrencies, 'object');
	t.is(cryptocurrencies.BTC.name, 'Bitcoin');
	t.is(cryptocurrencies.BTC.imageUrl, 'https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/BTC.png');
	t.is(cryptocurrencies.BTC.iconUrl, 'https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/BTC-128.png');
});

test('.symbols', t => {
	const symbols = cryptocurrencies.symbols();
	t.is(Array.isArray(symbols), true);
	t.is(symbols.length, Object.keys(cryptocurrencies).length);
});
