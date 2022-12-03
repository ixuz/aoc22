import assert from "assert";
import fs from 'fs';
import path from 'path';
import { printIntro } from "../common/index.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace('dist', 'src');

const priority: Record<string, number> = {};
for (let i=1; i<=52; i++) {
	if (i <= 26) priority[String.fromCharCode(96+i)] = i
	if (i > 26) priority[String.fromCharCode(38+i)] = i
}

const solve1 = (data: string) => {
	const parseLine = (line: string) => {
		const a = line.slice(0, line.length/2);
		const b = line.slice(line.length/2, line.length);
		const existsA: Record<string, number> = {};
		const existsB: Record<string, number> = {};
		const both: string[] = [];
		for (const item of a) {
			if (!existsA[item]) existsA[item] = 1;
		}
		for (const item of b) {
			if (!existsB[item]) existsB[item] = 1;
			if (existsA[item] && existsB[item]) both.push(item);
		}
		const prio = priority[both[0]];
		return prio;
	};

	const lines = data.split('\n');
	const rugsacks = lines.map(parseLine);
	return rugsacks.reduce((sum, prio) => {
		return sum + prio;
	}, 0);
};

const solve2 = (data: string) => {
	const lines = data.split('\n');
	
	let groupSize = 3;
	let groups: Record<string, number>[] = new Array(groupSize).fill({});

	const badges = lines.reduce((acc: string[], line, i) => {
		if (i % groups.length === 0) {
			for (let k=0; k<groups.length; k++) groups[k] = {};
		}
		for (let j=0; j<line.length; j++) {
			const ch = line[j];

			groups[i % groups.length][ch] = 1;

			if (i % groups.length === 2) {
				let existsInAllGroups = true;
				for (let k=0; k<groups.length; k++) {
					if (!groups[k][ch]) {
						existsInAllGroups = false;
						break;
					}
				}
				if (acc.length < i/groups.length && existsInAllGroups) {
					acc.push(ch);
				}
			}
		}
		return acc;
	}, []);

	return badges.reduce((sum, ch) => { return sum + priority[ch]; }, 0)
}

export default () => {
  printIntro(3);
  
  const exampleData = fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf-8');
  const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  // Examples
  assert(solve1(exampleData) === 157);
  assert(solve2(exampleData) === 70);

  // Challenges
  console.log(`Challenge 1 answer: "${solve1(inputData)}"`);
  console.log(`Challenge 2 answer: "${solve2(inputData)}"`);
}
