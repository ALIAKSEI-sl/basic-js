const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const arr = []
  for (let k = 0; k < matrix.length; k++) {
    arr.push([])
    for (let l = 0; l < matrix[0].length; l++) {
      arr[k].push(0)
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === true) {
        if (i - 1 >= 0) {
          arr[i - 1][j] += 1
        }
        if (i - 1 >= 0 && j + 1 < matrix[0].length) {
          arr[i - 1][j + 1] += 1
        }
        if (j + 1 < matrix[0].length) {
          arr[i][j + 1] += 1
        }
        if (i + 1 < matrix.length && j + 1 < matrix[0].length) {
          arr[i + 1][j + 1] += 1
        }
        if (i + 1 < matrix.length) {
          arr[i + 1][j] += 1
        }
        if (i + 1 < matrix.length && j - 1 >= 0) {
          arr[i + 1][j - 1] += 1
        }
        if (j - 1 >= 0) {
          arr[i][j - 1] += 1
        }
        if (i - 1 >= 0 && j - 1 >= 0) {
          arr[i - 1][j - 1] += 1
        }
      }
    }
  }
  return arr;
}

module.exports = {
  minesweeper
};
