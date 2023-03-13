const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const string = String(n);
  let max = Number(string.replace(string[0], ''));
  for (let i = 1; i < string.length; i++) {
    const count = Number(string.replace(string[i], ''));
    if (count > max) max = count;
  }
  return max;
}

module.exports = {
  deleteDigit
};
