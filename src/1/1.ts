import fs from 'fs';

class CaloriesCounterService {
  printElvesCalories(filePath: string): void {
    const elvesCaloriesList = this.elvesCaloriesList(filePath);

    console.log('The elf with the most kcal carries: ', this.elfWithMostCalories(elvesCaloriesList));
    console.log('Sum of kcal carried by top 3 elves: ', this.topThreeElvesCaloriesSum(elvesCaloriesList));    
  }

  private elvesCaloriesList(filePath: string): Array<number> {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const lines = fileContents.split(/\r?\n/);
  
    let currentElfsCalories = 0;
    let elvesCaloriesList: Array<number> = []
  
    for (const line of lines) {
      if (!line) {
        elvesCaloriesList.push(currentElfsCalories);
        currentElfsCalories = 0;
      } else {
        currentElfsCalories += +line;
      }
    }
  
    return elvesCaloriesList;
  }

  private elfWithMostCalories(elvesCaloriesList: Array<number>): number {
    return Math.max(...elvesCaloriesList);
  }

  private topThreeElvesCaloriesSum(elvesCaloriesList: Array<number>): number {
    return elvesCaloriesList
      .sort().reverse()
      .slice(0, 3)
      .reduce((sum, current) => sum + current);
  }
}

const caloriesCounterService = new CaloriesCounterService();
caloriesCounterService.printElvesCalories('src/1/input.txt');
