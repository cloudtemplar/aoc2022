// https://adventofcode.com/2022/day/3#part2

import { readLines } from '../helpers/read-lines'
import _ from 'lodash'

class ItemPrioritiesSummator {
  static itemTypes = [...'abcdefghijklmnopqrstuvwxyz'].concat([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'])
  static priorities = Array.from({ length: 52 }, (_, i) => i + 1)
  static itemPriorities = _.zipObject(this.itemTypes, this.priorities)

  printScore (filePath: string): void {
    const prioritiesSum = this.calculatePrioritiesSum(filePath)

    console.log('The sum of the priorities of items:', prioritiesSum)
  }

  private calculatePrioritiesSum (filePath: string): number {
    let prioritiesSum = 0

    const backpacks = readLines(filePath)
    const elfGroups = _.chunk(backpacks, 3)
    for (const group of elfGroups) {
      const commonItem = this.commonItem(group)
      const priority = this.itemPriority(commonItem)
      prioritiesSum += priority
    }

    return prioritiesSum
  }

  private commonItem (group: string[]): string {
    const items = group.map((inventory) => inventory.split(''))
    const [commonItem] = _.intersection((_.intersection(items[0], items[1])), items[2])

    return String(commonItem)
  }

  private itemPriority (commonItem: string): number {
    return ItemPrioritiesSummator.itemPriorities[commonItem]
  }
}

const itemPrioritiesSummator = new ItemPrioritiesSummator()
itemPrioritiesSummator.printScore('src/3/input.txt')
