const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const obj = {};
  domains.forEach((string) => {
    const array = string.split('.');
    let key = '';
    for (let i = array.length - 1; i >= 0; i--) {
      key += `.${array[i]}`;
      if (key in obj) obj[key]++;
      else obj[key] = 1;
    }
  });
  return obj;
}

module.exports = {
  getDNSStats,
};
