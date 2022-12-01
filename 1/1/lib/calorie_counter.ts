const fs = require('fs');
const readLine = require('readline');

async function findMostCalories(filePath: string): Promise<number> {
  let mostCalories = 0;

  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readLine.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let currentElfsCalories = 0;

    for await (const line of rl) {
      if (!line) {
        if (currentElfsCalories > mostCalories) {
          mostCalories = currentElfsCalories;
        }
        currentElfsCalories = 0;
      } else {
        currentElfsCalories = currentElfsCalories + +line;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Got an error trying to read the file: ${error.message}`);  
    } else {
      console.error('Unexpected error', error);
    }
  }

  return mostCalories;
}

let mostCalories = findMostCalories('lib/input.txt');
mostCalories.then((result) => {
  console.log(result);
});
