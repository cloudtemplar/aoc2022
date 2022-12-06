// let priorities sum be 0
// for each backpack in backpacks
//   split backpack items in half
//   convert each half to set
//   let item be intersection of those 2 sets
//   get item priority from dictionary
//   increment priorities sum by current item priority
//
// return priorities sum

// https://adventofcode.com/2022/day/3

import fs from 'fs';
import _ from 'lodash';

class ItemPrioritiesSummator {
  static itemTypes = [...'abcdefghijklmnopqrstuvwxyz'].concat([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']);
  static priorities = Array.from({length: 52}, (_, i) => i + 1)
  static itemPriorities = _.zipObject(this.itemTypes, this.priorities);

  printScore(filePath: string): void {
    const prioritiesSum = this.calculatePrioritiesSum(filePath);

    console.log('The sum of the priorities of items:', prioritiesSum);
  }

  private calculatePrioritiesSum(filePath: string): number {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const backpacks = fileContents.split(/\r?\n/);

    let prioritiesSum = 0;

    for (const backpack of backpacks) {
      const halfABackpack = backpack.length / 2;
      const leftCompartment = new Set(backpack.substring(0, halfABackpack).split(''));
      const rightCompartment = new Set(backpack.substring(halfABackpack).split(''));
      const [commonItem] = this.setIntersection(leftCompartment, rightCompartment);
      const priority = this.itemPriority(String(commonItem));
      prioritiesSum += priority;
    }

    return prioritiesSum;
  }

  private setIntersection(setA: any, setB: any) {
    const _intersection = new Set();
    for (const elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }

    return _intersection;
  }

  private itemPriority(commonItem: string): number {
    return ItemPrioritiesSummator.itemPriorities[commonItem];
  }
}

const itemPrioritiesSummator = new ItemPrioritiesSummator();
itemPrioritiesSummator.printScore('src/3/input.txt');
