// https://adventofcode.com/2022/day/2

// A - rock
// B - paper
// C - scissors

// X - rock      + 1 point
// Y - paper     + 2 points
// Z - scissors  + 3 points

// win           + 6 points
// draw          + 3 points
// lose          + 0 points

import fs from 'fs';

class RPSScoreCounterService {
  static shapePointsBoard = {
    X: 1,
    Y: 2,
    Z: 3
  }
  static winPoints = 6;
  static drawPoints = 3;
  static losePoints = 0;

  printScore(filePath: string): void {
    const score = this.calculateScore(filePath);

    console.log('Score:', score);
  }

  private calculateScore(filePath: string): number {
    const rounds = this.rounds(filePath);

    let score = 0;

    for (const round of rounds) {
      const [opponentShape, yourShape] = round.split(' ');

      if (this.roundWon(opponentShape, yourShape)) {
        score += (RPSScoreCounterService.winPoints + this.shapePoints(yourShape));
      } else if (this.roundDrawn(opponentShape, yourShape)) {
        score += (RPSScoreCounterService.drawPoints + this.shapePoints(yourShape));
      } else {
        score += (RPSScoreCounterService.losePoints + this.shapePoints(yourShape));
      }
    }

    return score;
  }

  private rounds(filePath: string): Array<string> {
    const fileContents = fs.readFileSync(filePath, 'utf8');

    return fileContents.split(/\r?\n/);
  }

  private roundWon(opponentShape: string, yourShape: string): boolean {
    let result = false;

    switch (opponentShape) {
      case 'A':
        if (yourShape === 'Y') {
          result = true;
        }
        break;
      case 'B':
        if (yourShape === 'Z') {
          result = true;
        }
        break;
      case 'C':
        if (yourShape === 'X') {
          result = true;
        }
        break;
    }

    return result;
  }

  private roundDrawn(opponentShape: string, yourShape: string): boolean {
    let result = false;

    switch (opponentShape) {
      case 'A':
        if (yourShape === 'X') {
          result = true;
        }
        break;
      case 'B':
        if (yourShape === 'Y') {
          result = true;
        }
        break;
      case 'C':
        if (yourShape === 'Z') {
          result = true;
        }
        break;
    }

    return result;
  }

  private shapePoints(yourShape: string): number {
    return RPSScoreCounterService.shapePointsBoard[yourShape as keyof typeof RPSScoreCounterService.shapePointsBoard];
  }
}

const caloriesCounterService = new RPSScoreCounterService();
caloriesCounterService.printScore('src/2/input.txt');
