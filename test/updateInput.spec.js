import expect from 'expect';
import { updateInput } from '../src/updateInput';

describe('updateInput', () => {
  describe('when no config is passed', () => {
    describe('when input is a number', () => {
      it('returns the input and no spring', () => {
        expect(updateInput({}, {}, 1)).toEqual([1, false]);
      });
    });
  });

  describe('when config is passed', () => {
    describe('when input is a number', () => {
      it('returns the input and no spring', () => {
        expect(updateInput({}, {}, 1)).toEqual([1, false]);
      });
    });
  });
});

