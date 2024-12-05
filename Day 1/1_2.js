import { left, right } from './1_data.js';
// similarity score
let sScore = 0;

const reduced = right.reduce((occ, item) => {
  occ[item] = (occ[item] || 0) + 1;
  return occ;
}, {});

// occurance map one liner:
// const occMap = new Map(Object.entries(reduced).map(([key, value]) => [parseInt(key), value]));
const occMap = new Map();
const entries = Object.entries(reduced);
for (const [key, value] of entries) {
  const parsedKey = parseInt(key);
  occMap.set(parsedKey, value);
}

for (const num of left) {
  let count = occMap.get(num);
  if (count) {
    sScore += count * num;
  }
}

console.log(sScore);
