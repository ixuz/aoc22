import assert from "assert";
import fs from 'fs';
import path from 'path';
import { printIntro } from "../common/index.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace('dist', 'src');

const getTopSumOfCaloriesCarried = (testData: string, count: number) => {
	const calories = testData.split('\n\n').map(list => list.split('\n')
		.filter(item => !!item)
		.reduce((calories, item) => {
				calories += parseInt(item);
				return calories;
			},
			0));
	calories.sort((a, b) => b - a);
	return calories
		.slice(0, count).reduce((sum, calories) => {
			sum += calories;
			return sum;
		}, 0);
}

export default () => {
  printIntro(1);
  
  const exampleData = fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf-8');
  const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  // Examples
  assert(getTopSumOfCaloriesCarried(exampleData, 1) === 24000);
  assert(getTopSumOfCaloriesCarried(exampleData, 3) === 45000);

  // Challenges
  console.log(`Challenge 1 answer: "${getTopSumOfCaloriesCarried(inputData, 1)}"`);
  console.log(`Challenge 2 answer: "${getTopSumOfCaloriesCarried(inputData, 3)}"`);
}
