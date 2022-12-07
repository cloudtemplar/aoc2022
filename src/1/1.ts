// https://adventofcode.com/2022/day/1

import { readLines } from '../helpers/read-lines'

class CaloriesCounterService {
  printElvesCalories (filePath: string): void {
    const elvesCaloriesList = this.elvesCaloriesList(filePath)

    console.log('The elf with the most kcal carries: ', this.elfWithMostCalories(elvesCaloriesList))
    console.log('Sum of kcal carried by top 3 elves: ', this.topThreeElvesCaloriesSum(elvesCaloriesList))
  }

  private elvesCaloriesList (filePath: string): number[] {
    const elvesCaloriesList: number[] = []
    let currentElfsCalories = 0

    const lines = readLines(filePath)
    for (const line of lines) {
      if (line.length === 0) {
        elvesCaloriesList.push(currentElfsCalories)
        currentElfsCalories = 0
      } else {
        currentElfsCalories += +line
      }
    }

    return elvesCaloriesList
  }

  private elfWithMostCalories (elvesCaloriesList: number[]): number {
    return Math.max(...elvesCaloriesList)
  }

  private topThreeElvesCaloriesSum (elvesCaloriesList: number[]): number {
    return elvesCaloriesList
      .sort((a, b) => a - b)
      .reverse()
      .slice(0, 3)
      .reduce((sum, current) => sum + current)
  }
}

const caloriesCounterService = new CaloriesCounterService()
caloriesCounterService.printElvesCalories('src/1/input.txt')
