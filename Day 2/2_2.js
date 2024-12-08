import { reports } from './2_data.js';

let numSafe = 0;

for (const row of reports) {
  let res = checkRow(row);
  numSafe += res ? 1 : 0;
  if (!res) {
    console.log(row, ': Unsafe');
    console.log();
    // break;
  } else {
    console.log(row, ': Safe');
    console.log();
  }
}

console.log('Num Safe: ', numSafe);

function checkRow(row) {
  // store difference
  let logger = '';
  let dir = 0;

  let removedOne = false;

  // loop through 
  for (let i = 0; i < row.length - 1; i++) {
    let current = row[i];
    let next = row[i + 1];
    
    let diff = row[i] - row[i + 1];
    /*
    const diffValid = () => {
    };
    */

    // get initial direction
    if (i === 0) {
      dir = diff < 0 ? 1 : -1;
    }

    // logging for debugging
    if (i === row.length - 2) {
      logger += current + ' ' + next + ' ';
    }
    else {
      logger += current + ' ';
    }

    console.log(logger);
    console.log(`current: ${current}, next: ${next}, dir: ${dir}, removedOne: ${removedOne}`);
    // check current vs next
    // if the two fails, we will attempt a removal of the next
    if (!checkTwo(current, next, dir)) {
      //console.log(logger);

      
      // if one hasn't been removed already, attempt removal of next
      if (!removedOne) {
        // i think the issue is it COULD be the first or second one, so when i = 0,
        // we may need to test if removing both first and last will work... hmmmmmmmmmm fuck

        // if we are at the beginning we need to update the direction
        if (i < 2) {
          // try skipping first index
          current = row[1];
          next = row[2];
          /*
          else if (i === 1) {
            current = row[1];
            next = row[2];
          }
          */

          dir = (current - next) < 0 ? 1 : -1;

          // console.log(logger);

          // remove index 0 and check 
          console.log('lets try removing index 0: ', current);
          if (!checkTwo(current, next, dir)) {
            console.log('removal of index 0 did not help.');
            current = row[0];
            next = row[2];
            dir = (current - next) < 0 ? 1 : -1;

            // remove index 1 and check
            console.log('lets try removing index 1: ', next);
            if (!checkTwo(current, next, dir)) {
              console.log('removal of index 0 did not help. Failure immemenant.');
              return false;
            }
            // if removal of index 1 succeeds
            else {
              console.log('removal of index 1 worked!. Lets continue.');
              removedOne = true;
              i++;
            }
          }
          // if removal of index 0 succeeds
          else {
            console.log('removal of index 0 worked!. Lets continue.');
            removedOne = true;
          }
        }
        // if we passed all previous levels except the last, we can just remove the last
        else if (i === row.length - 2) {
          logger += 'Clipped the last index, Safe!';
          console.log(logger);
          return true;
        }
        // if we are in the middle, we can just remove the next index
        else {
          if (!checkTwo(current, row[i + 2], dir)) {
            return false;
          }
          else {
            removedOne = true;
            i++;
          }
        }
      }
      else {
        return false;
      }
    }
  }

  logger += 'Safe ';
  console.log(logger);
  return true;
}

// answer is higher than 336 but lower than 410 maybe lower than 356

// maybe 375 prob not
// not 348 or 350 or 359 or 356

/*
HELPER FUNCTIONS
*/
function checkTwo(first, second, dir) {
  let diff = first - second;

  if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
    // if we haven't already removed one
    console.log(' Unsafe: diff failed. diff = ' + diff);
    return false;
  }

  let currentDir = diff < 0 ? 1 : -1;

  if (dir !== currentDir) {
    console.log(' Unsafe: dir failed. dir = ' + dir);
    return false;
  }

  return true;
}

