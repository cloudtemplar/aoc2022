// https://adventofcode.com/2022/day/4

import { readLines } from '../helpers/read-lines'
import _ from 'lodash'

class FullyContainedSectorsSummator {
  printFullyContainedSectorsCount (filePath: string): void {
    const fullyContainedSectorsCount = this.countFullyContainedSectors(filePath)

    console.log('Fully contained sectors count:', fullyContainedSectorsCount)
  }

  private countFullyContainedSectors (filePath: string): number {
    let fullyContainedSectorsCount = 0

    const lines = readLines(filePath)
    for (const line of lines) {
      const [firstElfAssignment, secondElfAssignment] = line.split(',')
      const firstElfSectors = this.elfSectors(firstElfAssignment)
      const secondElfSectors = this.elfSectors(secondElfAssignment)
      const overlappingSectors = _.intersection(firstElfSectors, secondElfSectors)

      if (this.isSectorContained(overlappingSectors, firstElfSectors, secondElfSectors)) (fullyContainedSectorsCount += 1)
    }

    return fullyContainedSectorsCount
  }

  private elfSectors (line: string): number[] {
    const [startRange, endRange] = line.split('-').map((i) => parseInt(i))

    return _.range(startRange, endRange + 1)
  }

  private isSectorContained (overlappingSectors: number[], firstElfSectors: number[], secondElfSectors: number[]): boolean {
    return overlappingSectors.length > 0 &&
           (_.isEqual(overlappingSectors, firstElfSectors) || _.isEqual(overlappingSectors, secondElfSectors))
  }
}

const fullyContainedSectorsSummator = new FullyContainedSectorsSummator()
fullyContainedSectorsSummator.printFullyContainedSectorsCount('src/4/input.txt')
