// let priorities sum be 0
// split input into lines
// group lines by 3 items (elf group)
// for each group in groups
//   convert each group member's backpack to set
//   badge is intersection of all 3 backpacks
//   increment prorities sum with badges priority
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
    const elfGroups = _.chunk(backpacks, 3);

    let prioritiesSum = 0;

    for (const group of elfGroups) {
      const commonItem = this.commonItem(group);
      const priority = this.itemPriority(commonItem);
      prioritiesSum += priority;
    }

    return prioritiesSum;
  }

  private commonItem(group: Array<string>): string {
    const itemSets = group.map((inventory) => new Set(inventory.split('')));
    const [commonItem] = this.setIntersection((this.setIntersection(itemSets[0], itemSets[1])), itemSets[2]);
    
    return String(commonItem);
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
