import data from './3_data.js';
/*
Goal:
- find all 'mul(a,b)' in a main string, where a and b are integers
*/

// two ways we can do this:
// 1. regex
// 2. manual parsing


// regex way
const regexMuls = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
const regexNums = /\d+/g;

const muls = data.match(regexMuls);

let sum = 0;

console.log(muls);

let power = true;

for (const mul of muls) {
  // do() 2 (
  // don't() 2 n
  // mul() 2 l
  
  switch (mul[2]) {
    case '(':
      power = true;
      break;
    case 'n':
      power = false;
      break;
    case 'l':
      if (power) {
        const factors = mul.match(regexNums);
        sum += factors[0] * factors[1];
        console.log('power!', factors[0], ' x ', factors[1], ' = ', factors[0] * factors[1])
      }
      break;
  }

}

console.log(sum);
