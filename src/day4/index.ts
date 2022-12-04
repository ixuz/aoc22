import assert from "assert";
import fs from 'fs';
import path from 'path';
import { printIntro } from "../common/index.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace('dist', 'src');

type OverlapChecker = (a1: number, a2: number, b1: number, b2: number) => boolean;

const overlapsFully = (a1: number, a2: number, b1: number, b2: number) => {
	if (a1 <= b1 && a2 >= b2) return true;
	if (b1 <= a1 && b2 >= a2) return true;
	return false;
}

const overlapsPartially = (a1: number, a2: number, b1: number, b2: number) => {
	if (a1 <= b2 && a1 >= b1) return true;
	if (a2 >= b1 && a2 <= b2) return true;
	if (b1 <= a2 && b1 >= a1) return true;
	if (b2 >= a1 && b2 <= a2) return true;
	return false;
}

const solve = (data: string, overlapChecker: OverlapChecker) => {
	const regexp = /(\d+)-(\d+),(\d+)-(\d+)/g;
	const matches = [...data.matchAll(regexp)];
	return matches.filter((match) => overlapChecker(
		parseInt(match[1]),
		parseInt(match[2]),
		parseInt(match[3]),
		parseInt(match[4]),
	)).length;
};

export default () => {
  printIntro(4);
  
  const exampleData = fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf-8');
  const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  // Examples
  assert(solve(exampleData, overlapsFully) === 2);
  assert(solve(exampleData, overlapsPartially) === 4);

  // Challenges
  console.log(`Challenge 1 answer: "${solve(inputData, overlapsFully)}"`);
  console.log(`Challenge 2 answer: "${solve(inputData, overlapsPartially)}"`);
}
