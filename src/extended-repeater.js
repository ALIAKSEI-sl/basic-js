const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let string;
  let addition;
  const fullOptions = { ...options };

  if (fullOptions.separator === undefined) fullOptions.separator = '+';
  if (fullOptions.additionSeparator === undefined)
    fullOptions.additionSeparator = '|';
  if (fullOptions.addition !== undefined)
    fullOptions.addition = String(fullOptions.addition);

  if (fullOptions.addition !== undefined) {
    if (fullOptions.additionRepeatTimes !== undefined) {
      if (fullOptions.additionSeparator !== undefined) {
        addition = Array(fullOptions.additionRepeatTimes)
          .fill(fullOptions.addition)
          .join(fullOptions.additionSeparator);
      } else {
        addition = Array(fullOptions.additionRepeatTimes)
          .fill(fullOptions.addition)
          .join('');
      }
    } else addition = fullOptions.addition;
  } else addition = '';

  if (fullOptions.repeatTimes !== undefined) {
    string = Array(fullOptions.repeatTimes)
      .fill(str + addition)
      .join(fullOptions.separator);
  } else string = str + addition;

  return string;
}

module.exports = {
  repeater,
};
