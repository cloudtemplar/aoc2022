// https://adventofcode.com/2022/day/2#part2

// A - rock       + 1pts
// B - paper      + 2pts
// C - scissors   + 3pts

// X - lose       + 0pts
// Y - draw       + 3pts
// Z - win        + 6pts

import fs from 'fs';

class RPSScoreCounterService {
  static shapePointsBoard = {
    rock: 1,
    paper: 2,
    scissors: 3
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
      const [opponentShape, yourPlay] = round.split(' ');

      switch (yourPlay) {
        case 'X':
          score += this.lostRoundScore(opponentShape);
          break;
        case 'Y':
          score += this.drawnRoundScore(opponentShape);
          break;
        case 'Z':
          score += this.wonRoundScore(opponentShape);
          break;
      }
    }

    return score;
  }

  private rounds(filePath: string): Array<string> {
    const fileContents = fs.readFileSync(filePath, 'utf8');

    return fileContents.split(/\r?\n/);
  }

  private lostRoundScore(opponentShape: string): number {
    const yourShape = this.shapeLosingTo(opponentShape);

    return RPSScoreCounterService.losePoints + this.shapePoints(yourShape);
  }

  private drawnRoundScore(opponentShape: string): number {
    const yourShape = this.shapeDrawingWith(opponentShape);

    return RPSScoreCounterService.drawPoints + this.shapePoints(yourShape);
  }

  private wonRoundScore(opponentShape: string): number {
    const yourShape = this.shapeWinningWith(opponentShape);

    return RPSScoreCounterService.winPoints + this.shapePoints(yourShape);
  }

  private shapeLosingTo(opponentShape: string): string {
    let shape = '';

    switch (opponentShape) {
      case 'A':
        shape = 'scissors';
        break;
      case 'B':
        shape = 'rock';
        break;
      case 'C':
        shape = 'paper';
        break;
    }

    return shape;
  }

  private shapeDrawingWith(opponentShape: string): string {
    let shape = '';

    switch (opponentShape) {
      case 'A':
        shape = 'rock';
        break;
      case 'B':
        shape = 'paper';
        break;
      case 'C':
        shape = 'scissors';
        break;
    }

    return shape;
  }

  private shapeWinningWith(opponentShape: string): string {
    let shape = '';

    switch (opponentShape) {
      case 'A':
        shape = 'paper';
        break;
      case 'B':
        shape = 'scissors';
        break;
      case 'C':
        shape = 'rock';
        break;
    }

    return shape;
  }

  private shapePoints(yourShape: string): number {
    return RPSScoreCounterService.shapePointsBoard[yourShape as keyof typeof RPSScoreCounterService.shapePointsBoard];
  }
}

const caloriesCounterService = new RPSScoreCounterService();
caloriesCounterService.printScore('src/2/input.txt');
