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
    if (message === undefined || key === undefined) this.throwError();
    const messageUp = message.toLocaleUpperCase();
    const keyUp = key.padEnd(messageUp.length, key).toLocaleUpperCase();

    let notLetter = 0;
    let cipherText = '';

    for (let i = 0; i < message.length; i++) {
      const indexColumn = this.letters.indexOf(keyUp[i - notLetter]);
      const indexRow = this.letters.indexOf(messageUp[i]);
      if (indexRow === -1) {
        cipherText += message[i];
        notLetter++;
      } else cipherText += this.square[indexColumn][indexRow];
    }
    return this.direct ? cipherText : cipherText.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (encryptedMessage === undefined || key === undefined) this.throwError();
    const keyUp = key.padEnd(encryptedMessage.length, key).toLocaleUpperCase();
    let notLetter = 0;
    let decodedText = '';

    for (let i = 0; i < encryptedMessage.length; i++) {
      const indexColumn = this.letters.indexOf(keyUp[i - notLetter]);
      const indexRow = this.square[indexColumn].indexOf(encryptedMessage[i]);
      if (indexRow === -1) {
        decodedText += encryptedMessage[i];
        notLetter++;
      } else decodedText += this.letters[indexRow];
    }
    return this.direct ? decodedText : decodedText.split('').reverse().join('');
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
