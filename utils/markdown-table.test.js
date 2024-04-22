import test from 'ava';
import {
	getDetailSummaryFromSymbolData,
	getMarkdownTableFromSymbols,
} from './markdown-table.js';

const data = {
	0: '0 coin',
	'01': '01 coin',
	1: '1 coin',
	A: 'A coin',
	AA: 'AA coin',
	B: 'B coin',
	C: 'C coin',
	CC: 'CC coin',
};

test('should generate a markdown table', t => {
	const expected = [
		'| Symbol | Name |',
		'| :------ | :------ |',
		'| `B` | B coin |',
		'| `C` | C coin |',
	]
		.join('\n')
		.trim();

	const actual = getMarkdownTableFromSymbols(data, ['B', 'C']).trim();
	t.is(actual, expected);
});

test('getDetailSummaryFromSymbolData', t => {
	const expected = `
<details><summary>0-9 (3)</summary>

| Symbol | Name |
| :------ | :------ |
| \`0\` | 0 coin |
| \`1\` | 1 coin |
| \`01\` | 01 coin |
</details>

<details><summary>A (2)</summary>

| Symbol | Name |
| :------ | :------ |
| \`A\` | A coin |
| \`AA\` | AA coin |
</details>

<details><summary>B (1)</summary>

| Symbol | Name |
| :------ | :------ |
| \`B\` | B coin |
</details>

<details><summary>C (2)</summary>

| Symbol | Name |
| :------ | :------ |
| \`C\` | C coin |
| \`CC\` | CC coin |
</details>
`.trim();

	const actual = getDetailSummaryFromSymbolData(data).trim();
	t.is(actual, expected);
});
