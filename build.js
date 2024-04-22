/* eslint-disable unicorn/prefer-top-level-await */
import fs from 'node:fs';
import fetch from 'isomorphic-fetch';
import sortby from 'lodash.sortby';
import request from 'sync-request';
import ora from 'ora';
import chalk from 'chalk';
import {getDetailSummaryFromSymbolData} from './utils/markdown-table.js';

const endpoint = 'https://www.cryptocompare.com/api/data/coinlist/';

const spinner = ora('Building currencies').start();
spinner.color = 'magenta';

fetch(endpoint)
	.then(response => response.json())
	.then(json => {
		const sorted = sortby(json.Data, o => o.CoinName);

		const symbols = {};
		let imagesSaved = 0;

		/**
		 * Build the JSON file based on the cryptocompare coinlist.
		 */
		for (const [index, currency] of sorted.entries()) {
			const {Name, CoinName, ImageUrl} = currency;
			symbols[Name] = CoinName.trim();

			// Download the image for future use
			if (ImageUrl) {
				spinner.text = `${chalk.gray(index)} ${Name}`;
				spinner.render();
				const response = request(
					'get',
					`https://www.cryptocompare.com${ImageUrl}`,
				);
				fs.writeFileSync(
					`images/${Name.replaceAll(/[:*?\\/<>|]/g, '_')}.${ImageUrl.split('.').pop()}`,
					response.getBody(),
				);
				imagesSaved += 1;
			}
		}

		spinner.succeed([`${imagesSaved} images saved to /images`]);

		spinner.color = 'yellow';
		spinner.start('Saving cryptocurrencies.json file');

		fs.writeFileSync('cryptocurrencies.json', JSON.stringify(symbols, null, 2));
		spinner.succeed(
			`${sorted.length} currencies saved to cryptocurrencies.json`,
		);

		spinner.start('Saving Readme');

		/**
		 * Build the Markdown Table of currencies in the Readme.
		 */
		const template = fs.readFileSync('readme.md').toString();
		const data = JSON.parse(
			fs.readFileSync('cryptocurrencies.json').toString(),
		);

		const newSymbols = Object.keys(data);

		let table = `There are currently **${newSymbols.length} cryptocurrencies** represented*:\n`;
		table += `\n<small><em>* Last updated: ${new Date().toUTCString()}</em></small>`;
		table += '\n\n';

		table += getDetailSummaryFromSymbolData(data);

		// Look for the HTML comments in the README as a target
		const targetRegex
			= /<!-- begin table inject -->(\w|\W)*<!-- end table inject -->/gim;
		const updated = template.replaceAll(
			targetRegex,
			`<!-- BEGIN TABLE INJECT -->\n${table}\n<!-- END TABLE INJECT -->`,
		);
		fs.writeFileSync('readme.md', updated);
		spinner.succeed(['Readme Markdown Table updated']);

		console.log(
			'\n',
			'Remember to',
			chalk.yellow('git commit'),
			'and',
			chalk.yellow('npm publish'),
		);
	})
	.catch(error => console.error(error));
