import { reports } from './2_data.js';

let numSafe = 0;

for (const row of reports) {
  let res = isSafe(row, new Set([1, 2, 3]), 1) || isSafe(row, new Set([-1, -2, -3]), 1);
  numSafe += res ? 1 : 0;
  if (!res) {
    console.log(row, ': Unsafe');
    console.log();
  } else {
    console.log(row, ': Safe');
    console.log();
  }
}

console.log('Num Safe: ', numSafe);

/**
 * Checks if a row is safe based on allowed differences and tolerance for removing elements.
 * @param {number[]} row - The row to check.
 * @param {Set<number>} allowed - A set of allowed differences between consecutive elements.
 * @param {number} tol - The tolerance for removing elements.
 * @returns {boolean} - True if the row is safe, false otherwise.
 */
function isSafe(row, allowed, tol = 0) {
  /**
   * Recursively checks if a sequence is safe.
   * @param {number[]} l - The sequence to check.
   * @param {number} tol - The remaining tolerance for removing elements.
   * @returns {boolean} - True if the sequence is safe, false otherwise.
   */
  function checkSequence(l, tol) {
    if (tol < 0) return false; // If tolerance is less than 0, the sequence is not safe.
    if (l.length < 2) return true; // If the sequence has fewer than 2 elements, it is considered safe.
    const [a, b, ...rest] = l; // Destructure the first two elements and the rest of the sequence.
    return (
      // Check if the difference between the first two elements is allowed and recursively check the rest.
      ((a === null || allowed.has(a - b)) && checkSequence([b, ...rest], tol)) ||
      // Alternatively, try removing the second element and recursively check the rest with decremented tolerance.
      checkSequence([a, ...rest], tol - 1)
    );
  }
  return checkSequence([null, ...row], tol); // Start the check with a placeholder null element.
}