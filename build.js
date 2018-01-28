const fs = require('fs');
const path = require('path');
const fetch = require('isomorphic-fetch');
const sortby = require('lodash.sortby');
const request = require('sync-request');
const ora = require('ora');
const chalk = require('chalk');
const sharp = require('sharp');

const endpoint = 'https://www.cryptocompare.com/api/data/coinlist/';
const ghBaseUrl = 'https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images';

const forceOptions = ['force', '--force', '-f', '-force'];
// Iterate through opts and return true if any forceOptions found
const forceDownload = forceOptions.reduce((acc, currentVal) => (acc) ?
										true :
										process.argv.indexOf(currentVal) > 0, false);

const spinner = ora('Building currencies').start();
spinner.color = 'magenta';

fetch(endpoint)
.then(response => response.json())
.then(json => {
	const sorted = sortby(json.Data, o => o.CoinName);

	const symbols = {};
	const symbolsWithMeta = {};
	let imagesSaved = 0;

	/**
	 * Build the JSON file based on the cryptocompare coinlist.
	 */
	sorted.forEach((currency, index) => {
		const {Name, CoinName, ImageUrl} = currency;
		symbolsWithMeta[Name] = {
			name: CoinName
		};

		symbols[Name] = CoinName;

		// download the image for future use
		if (ImageUrl) {
			spinner.text = `${chalk.gray(index)} ${Name}`;
			spinner.render();

			const extension = ImageUrl.split('.').pop();
			const ImageFile = `${Name}.${extension}`;
			const IconFile = `${Name}-128.${extension}`;
			const ImagePath = path.join('images', ImageFile);

			symbolsWithMeta[Name].imageUrl = `${ghBaseUrl}/${ImageFile}`;
			symbolsWithMeta[Name].iconUrl = `${ghBaseUrl}/${IconFile}`;

			// skip pre-existing images for optimization purposes
			if (fs.existsSync(ImagePath) && !forceDownload) {
				spinner.text = `${Name}'s image and icon detected, skipping`;
				return;
			}

			const res = request('get', `https://www.cryptocompare.com${ImageUrl}`);
			const ImageBuffer = res.getBody();

			// Save full size
			fs.writeFileSync(ImagePath, ImageBuffer);
			// Compress to 128 x 128 for icon
			sharp(ImageBuffer).resize(64).toFile(path.join('images', IconFile));
			imagesSaved += 1;
		}
	});

	spinner.succeed([`${imagesSaved} images saved to /images`]);

	spinner.color = 'yellow';
	spinner.start(`Saving cryptocurrencies.json & cryptocurrencies-meta.json file`);

	fs.writeFileSync('cryptocurrencies-meta.json', JSON.stringify(symbolsWithMeta, null, 2));
	fs.writeFileSync('cryptocurrencies.json', JSON.stringify(symbols, null, 2));
	spinner.succeed(`${sorted.length} currencies saved to cryptocurrencies.json`);

	spinner.start('Saving Readme');

	/**
	 * Build the Markdown Table of currencies in the List.md.
	 */
	const template = fs.readFileSync('list.md').toString();
	const data = JSON.parse(fs.readFileSync('cryptocurrencies-meta.json').toString());

	const newSymbols = Object.keys(data);

	let table = `There are currently **${newSymbols.length} cryptocurrencies** represented*:\n`;
	table += '\n\n';
	table += '| Symbol | Name | Icon | \n';
	table += '| :------ | :------ | :------ | \n';

	newSymbols.forEach(symbol => {
		const imageHtml = `<img src="${data[symbol].imageUrl}" width="64" height="64" alt="${data[symbol].name}'s Icon">`;
		table += `| \`${symbol}\` | ${data[symbol].name} | ${imageHtml} | \n`;
	});

	const updateString = `\n<small><em>* Last updated: ${new Date().toUTCString()}</em></small>`;
	table += updateString;

	// Look for the HTML comments in the README as a target
	const targetRegex = /<!-- BEGIN TABLE INJECT -->(\w|\W)*<!-- END TABLE INJECT -->/gim;
	const updated = template.replace(targetRegex, `<!-- BEGIN TABLE INJECT -->\n${table}\n<!-- END TABLE INJECT -->`);
	fs.writeFileSync('list.md', updated);
	spinner.succeed(['Master List Markdown Table updated']);

	/**
	  * Update Stats on Readme
      */
	const readme = fs.readFileSync('readme.md').toString();
	const readmeTarget = /<!-- BEGIN INJECT STATS -->(\w|\W)*<!-- END INJECT STATS -->/gim;
	const stats = `This repository currently contains **${newSymbols.length}** cryptocurrencies.

For more information, view the list of coins: [\`list.md\`](https://github.com/crypti/cryptocurrencies/blob/master/list.md) \n
${updateString}`;
	const statUpdate = readme.replace(readmeTarget, `<!-- BEGIN INJECT STATS -->\n${stats}<!-- END INJECT STATS -->`);
	fs.writeFileSync('readme.md', statUpdate);

	console.log('\n', 'Remember to', chalk.yellow('git commit'), 'and', chalk.yellow('npm publish'));
})
.catch(err => console.error(err));
