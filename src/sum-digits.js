const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a number, replace this number with
 * the sum of its digits until we get to a one digit number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For 100, the result should be 1 (1 + 0 + 0 = 1)
 * For 91, the result should be 1 (9 + 1 = 10, 1 + 0 = 1)
 *
 */
function getSumOfDigits(n) {
  const array = String(n).split('');
  if (array.length === 1) {
    return Number(array[0]);
  }
  const num = array.reduce((ac, el) => Number(ac) + Number(el), 0);
  if (String(num).length > 1) {
    return getSumOfDigits(num)
  } else {
    return num;
  }
}

module.exports = {
  getSumOfDigits
};
