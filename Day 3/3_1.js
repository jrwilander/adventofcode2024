import data from './3_data.js';
/*
Goal:
- find all 'mul(a,b)' in a main string, where a and b are integers
*/

// two ways we can do this:
// 1. regex
// 2. manual parsing


// regex way
const regexMuls = /(mul\(\d+,\d+\))/g;
const regexNums = /\d+/g;

const muls = data.match(regexMuls);

let sum = 0;

console.log(muls);

let power = true;

for (const mul of muls) {
  const factors = mul.match(regexNums);
  sum += factors[0] * factors[1];
  console.log('power!', factors[0], ' x ', factors[1], ' = ', factors[0] * factors[1])
}

console.log(sum);
