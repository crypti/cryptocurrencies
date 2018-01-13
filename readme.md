# cryptocurrencies [![Build Status](https://travis-ci.org/crypti/cryptocurrencies.svg?branch=master)](https://travis-ci.org/crypti/cryptocurrencies)

> A JSON list of all the cryptocurrency symbols and names

The currency list is a [JSON file](cryptocurrencies.json) that can be used wherever.

## Install

```
$ npm install --save cryptocurrencies
```


## Usage

```js
const cryptocurrencies = require('cryptocurrencies');

cryptocurrencies.BTC.name;
//=> 'Bitcoin'

cryptocurrencies.BTC.imageUrl;
//=> 'https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/BTC.png'

cryptocurrencies.BTC.iconUrl;
//=> 'https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/BTC-128.png'

cryptocurrencies.symbols();
//=> ['42', ... 'BTC', 'ETH', 'LTC', ...]
```

## Cryptocurrencies
<!-- DO NOT REMOVE THE COMMENTS BELOW, OR EDIT THIS TABLE DIRECTLY. -->
<!-- BEGIN INJECT STATS -->
This repository currently contains **1992** cryptocurrencies.

For more information, view the list of coins: [`list.md`](https://github.com/crypti/cryptocurrencies/blob/master/list.md)


<small><em>* Last updated: Sat, 13 Jan 2018 21:01:33 GMT</em></small><!-- END INJECT STATS -->

## Building

The JSON list, the currency icons, and the Markdown Table shown above (in this readme) are auto-generated
from the coin list made available by the [cryptocompare coinlist API](https://www.cryptocompare.com/api/data/coinlist/),
and can be updated automatically by running:

```
$ npm run build
```

:bulb: Note that this build routine synchronously downloads the currency icons and saves them to the `images` directory. This means
that the build routine takes a few minutes, since it has to process thousands of images.

## License

MIT © [Crypti Team](https://github.com/crypti)
