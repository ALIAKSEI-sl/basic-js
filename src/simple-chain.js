const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  content: '',

  getLength() {
    return this.content.split('~~').length;
  },

  addLink(value) {
    if (this.content.length) {
      this.content += `~~( ${value} )`;
    } else {
      this.content += `( ${value} )`;
    }
    return this;
  },

  removeLink(position) {
    if (!Number.isInteger(position) || (position <= 0) || position > this.getLength()) {
      this.content = ''
      throw new Error("You can't remove incorrect link!");
    }

    const array = this.content.split('~~');
    array.splice((position - 1), 1);
    this.content = array.join('~~');
    return this;
  },

  reverseChain() {
    this.content = this.content.split('~~').reverse().join('~~');
    return this;
  },

  finishChain() {
    const content = this.content;
    this.content = ''
    return content;
  }
};

module.exports = {
  chainMaker
};
