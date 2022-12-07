// https://adventofcode.com/2022/day/3

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
    for (const backpack of backpacks) {
      const halfABackpack = backpack.length / 2
      const leftCompartment = backpack.substring(0, halfABackpack).split('')
      const rightCompartment = backpack.substring(halfABackpack).split('')
      const [commonItem] = _.intersection(leftCompartment, rightCompartment)
      const priority = this.itemPriority(String(commonItem))
      prioritiesSum += priority
    }

    return prioritiesSum
  }

  private itemPriority (commonItem: string): number {
    return ItemPrioritiesSummator.itemPriorities[commonItem]
  }
}

const itemPrioritiesSummator = new ItemPrioritiesSummator()
itemPrioritiesSummator.printScore('src/3/input.txt')
