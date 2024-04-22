# cryptocurrencies [![CI](https://github.com/crypti/cryptocurrencies/actions/workflows/ci.yml/badge.svg)](https://github.com/crypti/cryptocurrencies/actions/workflows/ci.yml)

> A JSON list of all the cryptocurrency symbols and names

The currency list is a [JSON file](cryptocurrencies.json) that can be used wherever.

## Install

```
$ npm install --save cryptocurrencies
```

## Usage

```js
const cryptocurrencies, {symbols} = require('cryptocurrencies');

cryptocurrencies.BTC;
//=> 'Bitcoin'

console.log(symbols);
//=> ['42', ... 'BTC', 'ETH', 'LTC', ...]
```

## Cryptocurrencies

<!-- DO NOT REMOVE THE COMMENTS BELOW, OR EDIT THIS SECTION DIRECTLY. -->
<!-- Use `npm run build` to auto-generate the section. -->

<!-- BEGIN INJECT -->
There are currently **12242 cryptocurrencies** represented*:

<small><em>* Last updated: Mon, 22 Apr 2024 16:18:05 GMT</em></small>


<!-- END INJECT -->

## Building

The JSON list, the currency icons, and parts of this README file are auto-generated
from the coin list made available by the [cryptocompare coinlist API](https://www.cryptocompare.com/api/data/coinlist/),
and can be updated automatically by running:

```
$ npm run build
```

:bulb: Note that this build routine synchronously downloads the currency icons and saves them to the `images` directory. This means
that the build routine takes a few minutes, since it has to process thousands of images.

## License

MIT © [Crypti Team](https://github.com/crypti)
