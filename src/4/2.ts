// example input:
//
// 2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8

// https://adventofcode.com/2022/day/4#part2

import { readLines } from '../helpers/read-lines'
import _ from 'lodash'

class OverlappingPairSectorsSummator {
  printOverlappingPairSectorsCount (filePath: string): void {
    const overlappingPairSectorsCount = this.countFullyContainedSectors(filePath)

    console.log('Fully contained sectors count:', overlappingPairSectorsCount)
  }

  private countFullyContainedSectors (filePath: string): number {
    let overlappingPairSectorsCount = 0

    const lines = readLines(filePath)
    for (const line of lines) {
      const [firstElfAssignment, secondElfAssignment] = line.split(',')
      const firstElfSectors = this.elfSectors(firstElfAssignment)
      const secondElfSectors = this.elfSectors(secondElfAssignment)
      const overlappingSectors = _.intersection(firstElfSectors, secondElfSectors)

      if (overlappingSectors.length > 0) (overlappingPairSectorsCount += 1)
    }

    return overlappingPairSectorsCount
  }

  private elfSectors (line: string): number[] {
    const [startRange, endRange] = line.split('-').map((i) => parseInt(i))

    return _.range(startRange, endRange + 1)
  }
}

const overlappingPairSectorsSummator = new OverlappingPairSectorsSummator()
overlappingPairSectorsSummator.printOverlappingPairSectorsCount('src/4/input.txt')
