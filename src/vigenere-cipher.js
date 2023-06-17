const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(boolean = true) {
    this.direct = boolean;
    this.letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    this.square = this.createMatrix();
  }

  encrypt(message, key) {
    return this.crypt(message, key, 'encrypt');
  }

  decrypt(encryptedMessage, key) {
    return this.crypt(encryptedMessage, key, 'decrypt');
  }

  crypt(message, key, str) {
    if (message === undefined || key === undefined) this.throwError();
    const keyUp = key.padEnd(message.length, key).toLocaleUpperCase();

    let notLetter = 0;
    let text = '';

    for (let i = 0; i < message.length; i++) {
      const letter = str === 'encrypt' ? message[i].toLocaleUpperCase() : message[i];
      const indexColumn = this.letters.indexOf(keyUp[i - notLetter]);
      const indexRow = str === 'encrypt'
        ? this.letters.indexOf(letter)
        : this.square[indexColumn].indexOf(letter);
      if (indexRow === -1) {
        text += str === 'encrypt' ? message[i] : letter;
        notLetter++;
      } else text += str === 'encrypt'
        ? this.square[indexColumn][indexRow]
        : this.letters[indexRow];
    }
    return this.direct ? text : text.split('').reverse().join('');
  }

  throwError() {
    throw new Error('Incorrect arguments!');
  }

  createMatrix() {
    const matrix = [];

    this.letters.forEach((_, i) => {
      matrix.push([]);
      for (let j = 0; j < this.letters.length; j++) {
        const z = this.letters.length - i;
        this.letters[j + i]
          ? matrix[i].push(this.letters[j + i])
          : matrix[i].push(this.letters[j - z]);
      }
    })
    return matrix;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
