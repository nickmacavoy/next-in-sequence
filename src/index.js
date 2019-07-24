/* eslint-disable no-underscore-dangle */

class NextInSequence {
  constructor(input, testStrings) {
    this.string = input;
    this.testStrings = testStrings;
    return this.execute();
  }

  execute() {
    if (!this.match()) return false;
    if (!this.canSequence()) return false;

    const { prefix, sequenceStart } = NextInSequence.digitsToSequence(this.stringSanitised());
    let max = sequenceStart;
    let min = sequenceStart;

    const searchStrings = this.testStringsSanitised()
      .filter(string => string.includes(prefix));

    while (searchStrings.includes(`${prefix}${max}`)) {
      max += 1;
    }

    while (searchStrings.includes(`${prefix}${min}`)) {
      min -= 1;
    }

    return {
      proposal: `${prefix}${max}`,
      min: `${prefix}${min + 1}`,
      max: `${prefix}${max - 1}`,
    };
  }

  static digitsToSequence(string) {
    let foundSequence;
    let test;
    const regex = /\d+/g;

    // eslint-disable-next-line no-cond-assign
    while ((test = regex.exec(string)) !== null) {
      foundSequence = test;
    }

    foundSequence = parseInt(foundSequence, 10);
    const index = string.lastIndexOf(foundSequence);
    return {
      prefix: string.slice(0, index),
      sequenceStart: foundSequence
    };
  }

  canSequence() {
    return /\d/.test(this.stringSanitised());
  }

  testStringsSanitised() {
    if (this._testStringsSanitised) return this._testStringsSanitised;

    let testStrings = this.testStrings || [];
    testStrings = testStrings.map(string => string.toString().trim());
    // Make unique
    testStrings = [...new Set(testStrings)];
    this._testStringsSanitised = testStrings;
    return this._testStringsSanitised;
  }

  stringSanitised() {
    if (this._stringSanitised) return this._stringSanitised;

    const string = this.string || '';
    this._stringSanitised = string.trim();
    return this._stringSanitised;
  }

  match() {
    if (!this.valid()) return false;
    return this.testStringsSanitised().includes(this.stringSanitised());
  }

  valid() {
    if (this.testStringsSanitised().length === 0) return false;
    if (this.stringSanitised().length === 0) return false;
    return true;
  }
}

export default NextInSequence;
