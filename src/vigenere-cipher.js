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
    this.letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.vigenereSquare = this.createSquare();
  }

  encrypt(message, key) {
    if (message === undefined || key === undefined) throw new Error('Incorrect arguments!');
    const messageUp = message.toLocaleUpperCase();
    const keyUp = key.padEnd(messageUp.length, key).toLocaleUpperCase();
    let notLetter = 0;
    let cipherText = '';

    for(let i = 0; i < message.length; i++) {
      const indexColumn = this.letters.indexOf(keyUp[i - notLetter]);
      const indexRow = this.letters.indexOf(messageUp[i]);
      if (indexRow === -1) {
        cipherText += message[i];
        notLetter++
      } else {
        cipherText += this.vigenereSquare[indexColumn][indexRow];
      }
    }
    return this.direct ? cipherText : cipherText.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (encryptedMessage === undefined || key === undefined) throw new Error('Incorrect arguments!');
    const keyUp = key.padEnd(encryptedMessage.length, key).toLocaleUpperCase();
    let decodedText = '';
    let notLetter = 0;

    for(let i = 0; i < encryptedMessage.length; i++) {
      const indexColumn = this.letters.indexOf(keyUp[i - notLetter]);
      const indexRow = this.vigenereSquare[indexColumn].indexOf(encryptedMessage[i]);
      if (indexRow === -1) {
        decodedText += encryptedMessage[i];
        notLetter++
      } else {
        decodedText += this.letters[indexRow];
      }
    }
    return this.direct ? decodedText : decodedText.split('').reverse().join('');
  }

  createSquare() {
    const matrix = [];

    for (let i = 0; i < this.letters.length; i++) {
      matrix.push([]);
      for (let j = 0; j < this.letters.length; j++) {
        const k = this.letters.length - i;
        this.letters[j + i] ? matrix[i].push(this.letters[j + i]) : matrix[i].push(this.letters[j - k]);
      }
    }
    return matrix;
  }
}

module.exports = {
  VigenereCipheringMachine
};
