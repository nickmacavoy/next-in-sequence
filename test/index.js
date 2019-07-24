import { assert, expect } from 'chai';
import NextInSequence from '../src';

const subject = (expectedString, expectedTestString) => {
  return new NextInSequence(expectedString, expectedTestString);
};

describe('Constructor', () => {
  it('should save arguments', () => {
    const expectedString = 'Input string';
    const expectedTestString = ['Input string', 'Input string #2'];
    const test = subject(expectedString, expectedTestString);
    assert(test.string === expectedString, 'string not set');
    assert(test.testStrings === expectedTestString, 'testStrings not set');
    // assert(isA(subject.testStrings) === Array, 'testStrings not set');
    expect(test.testStrings).to.be.an('array');
  });
});

describe('execute', () => {
  it('should produce expected result', () => {
    const expectedString = 'XD1';
    const expectedTestString = ['XD0', 'XD1', 'XD2'];
    const { proposal, min, max } = subject(expectedString, expectedTestString);
    assert(proposal === 'XD3');
    assert(min === 'XD0');
    assert(max === 'XD2');
  });

  it('should handle bigint numbers', () => {
    const input = Number.MAX_SAFE_INTEGER.toString();
    const testStrings = [Number.MAX_SAFE_INTEGER.toString()];
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal == Number.MAX_SAFE_INTEGER + 1, `Cant handle bigint ${proposal}`);
    assert(min == Number.MAX_SAFE_INTEGER);
    assert(max == Number.MAX_SAFE_INTEGER);
  });

  it('should handle no numbers', () => {
    const input = 'frank';
    const testStrings = ['123'];
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal === undefined);
    assert(min === undefined);
    assert(max === undefined);
  });

  it('should handle no input', () => {
    const input = undefined;
    const testStrings = ['123'];
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal === undefined);
    assert(min === undefined);
    assert(max === undefined);
  });

  it('should handle blank input', () => {
    const input = '';
    const testStrings = ['123'];
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal === undefined);
    assert(min === undefined);
    assert(max === undefined);
  });

  it('should handle no testStrings', () => {
    const input = 'frank';
    const testStrings = undefined;
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal === undefined);
    assert(min === undefined);
    assert(max === undefined);
  });

  it('should handle blank testStrings', () => {
    const input = 'frank';
    const testStrings = [''];
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal === undefined);
    assert(min === undefined);
    assert(max === undefined);
  });

  it('should handle a many testStrings', () => {
    const length = 30000;
    const input = 'frank2';
    const testStrings = [
      ...[...Array(length)].map((x, i) => `frank${i}`),
      ...[...Array(20)].map((x, i) => `steve${i}`)
    ];
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal === `frank${length}`, proposal);
    assert(min === 'frank0', min);
    assert(max === `frank${length - 1}`, max);
  });

  it('should handle a many duplicate strings', () => {
    const input = 'frank2';
    const testStrings = ['frank1', 'frank1', 'frank1', 'frank2', 'frank2', 'frank3'];
    const { proposal, min, max } = subject(input, testStrings);
    assert(proposal === 'frank4', proposal);
    assert(min === 'frank1', min);
    assert(max === 'frank3', max);
  });
});
