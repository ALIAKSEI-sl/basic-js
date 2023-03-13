const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(string) {
  const MODERN_ACTIVITY = 15;
  const HALF_LIFE_PERIOD = 5730;

  if (typeof string !== 'string' || string.length === 0) return false;
  
  const date = Number(string);
  if(Number.isNaN(date) || date <= 0) return false;

  const age = Math.ceil(Math.log(MODERN_ACTIVITY / date) * HALF_LIFE_PERIOD / 0.693);
  return age < 0 ? false : age;
}

module.exports = {
  dateSample
};
