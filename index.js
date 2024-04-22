import {readFile} from 'node:fs/promises';

const fileUrl = new URL('cryptocurrencies.json', import.meta.url);
const symbolList = JSON.parse(await readFile(fileUrl, 'utf8'));

export const symbols = Object.keys(symbolList);

export default symbolList;
