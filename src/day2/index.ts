import assert from "assert";
import fs from 'fs';
import path from 'path';
import { printIntro } from "../common/index.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace('dist', 'src');

const scores = {
	'A': 1, 'B': 2, 'C': 3,
	'X': 1, 'Y': 2, 'Z': 3,
	'AX': 3, 'BY': 3, 'CZ': 3,
	'AY': 6, 'BZ': 6, 'CX': 6,
	'AZ': 0, 'BX': 0, 'CY': 0,
};

const simpleCopyStrategy = {
	'AX': 'AX',	'AY': 'AY',	'AZ': 'AZ',
	'BX': 'BX',	'BY': 'BY',	'BZ': 'BZ',
	'CX': 'CX',	'CY': 'CY',	'CZ': 'CZ',
};

const outcomeBasedStrategy = {
	'AX': 'AZ',	'AY': 'AX',	'AZ': 'AY',
	'BX': 'BX',	'BY': 'BY',	'BZ': 'BZ',
	'CX': 'CY',	'CY': 'CZ',	'CZ': 'CX',
};

const computeTotalScore = (data: string, strategy: Record<string, string>) => {
	return data.split('\n')
		.map(list => list.split(' '))
		.reduce((score, item) => {
			const id = strategy[item[0] + item[1]];
			const handScore = scores[id[1]];
			const battleScore = scores[id];
			score += handScore + battleScore;
			return score;
		}, 0);
};

export default () => {
  printIntro(2);
  
  const exampleData = fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf-8');
  const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  // Examples
  assert(computeTotalScore(exampleData, simpleCopyStrategy) === 15);
	assert(computeTotalScore(exampleData, outcomeBasedStrategy) === 12);

  // Challenges
  console.log(`Challenge 1 answer: "${computeTotalScore(inputData, simpleCopyStrategy)}"`);
  console.log(`Challenge 2 answer: "${computeTotalScore(inputData, outcomeBasedStrategy)}"`);
}
