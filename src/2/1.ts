// https://adventofcode.com/2022/day/2

import { readLines } from '../helpers/read-lines'

class RPSScoreCounterService {
  static shapePointsBoard = {
    X: 1,
    Y: 2,
    Z: 3
  }

  static winPoints = 6
  static drawPoints = 3
  static losePoints = 0

  printScore (filePath: string): void {
    const score = this.calculateScore(filePath)

    console.log('Score:', score)
  }

  private calculateScore (filePath: string): number {
    let score = 0

    const rounds = readLines(filePath)
    for (const round of rounds) {
      const [opponentShape, yourShape] = round.split(' ')

      if (this.roundWon(opponentShape, yourShape)) {
        score += (RPSScoreCounterService.winPoints + this.shapePoints(yourShape))
      } else if (this.roundDrawn(opponentShape, yourShape)) {
        score += (RPSScoreCounterService.drawPoints + this.shapePoints(yourShape))
      } else {
        score += (RPSScoreCounterService.losePoints + this.shapePoints(yourShape))
      }
    }

    return score
  }

  private roundWon (opponentShape: string, yourShape: string): boolean {
    switch (opponentShape) {
      case 'A':
        if (yourShape === 'Y') {
          return true
        }
        break
      case 'B':
        if (yourShape === 'Z') {
          return true
        }
        break
      case 'C':
        if (yourShape === 'X') {
          return true
        }
        break
    }

    return false
  }

  private roundDrawn (opponentShape: string, yourShape: string): boolean {
    switch (opponentShape) {
      case 'A':
        if (yourShape === 'X') {
          return true
        }
        break
      case 'B':
        if (yourShape === 'Y') {
          return true
        }
        break
      case 'C':
        if (yourShape === 'Z') {
          return true
        }
        break
    }

    return false
  }

  private shapePoints (yourShape: string): number {
    return RPSScoreCounterService.shapePointsBoard[yourShape as keyof typeof RPSScoreCounterService.shapePointsBoard]
  }
}

const caloriesCounterService = new RPSScoreCounterService()
caloriesCounterService.printScore('src/2/input.txt')
