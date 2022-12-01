const fs = require('fs');
const readLine = require('readline');

async function topThreeCaloriesSum(filePath: string): Promise<number> {
  let topThreeCaloriesSum = 0;

  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readLine.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let elfCaloriesList: Array<number> = [];
    let currentElfsCalories = 0;

    for await (const line of rl) {
      if (!line) {
        elfCaloriesList.push(currentElfsCalories);
        currentElfsCalories = 0;
      } else {
        currentElfsCalories = currentElfsCalories + +line;
      }
    }

    topThreeCaloriesSum = calculateTopThreeCaloriesSum(elfCaloriesList);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Got an error trying to read the file: ${error.message}`);  
    } else {
      console.error('Unexpected error', error);
    }
  }

  return topThreeCaloriesSum;
}

function calculateTopThreeCaloriesSum(elfCaloriesList: Array<number>): number {
  return elfCaloriesList.sort().reverse().slice(0, 3).reduce((sum, current) => sum + current);
}

let mostCalories = topThreeCaloriesSum('lib/input.txt');
mostCalories.then((result) => {
  console.log(result);
});
