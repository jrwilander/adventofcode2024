/*
A report counts as safe if both of the following are true:
- The levels are either all increasing or all decreasing
- Any two adjacent levels differ by at least one and at most three
so get difference between current and next index,
if difference >= 1 && <= 3
keep track of total number of safe reports
*/
import { reports } from './2_data.js';

let numSafe = 0;

for (const row of reports) {
  numSafe += checkRow(row) ? 1 : 0;
}

console.log(numSafe);

function checkRow(rowArr) {
  // store difference
  let logger = '';
  let dir = 0;

  for (let i = 0; i < rowArr.length - 1; i++) {
    let diff = rowArr[i] - rowArr[i + 1];

    if (i === 0) {
      dir = diff < 0 ? 1 : -1;
    }

    logger += rowArr[i] + ' ';

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      logger += ' Unsafe: diff failed. diff = ' + diff;
      console.log(logger);
      return false;
    }
      
    let currentDir = diff < 0 ? 1 : -1;

    if (dir !== currentDir) {
      logger += ' Unsafe: dir failed. dir = ' + dir;
      console.log(logger);
      return false;
    }
  }

  logger += ' Safe'
  console.log(logger);
  return true;
}
