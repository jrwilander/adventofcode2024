import { left, right } from './1_data.js';

let totalDistance = 0;

left.sort((a,b) => a - b);
right.sort((a,b) => a - b);

for (let i = 0; i < left.length; i++) {
  totalDistance += Math.abs(left[i] - right[i]);
  // console.log(left[i], right[i]);
}

console.log(totalDistance);
