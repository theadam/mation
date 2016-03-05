import { isSpring, spring } from '../src/spring';
import expect from 'expect';
import { noWobble, wobbly } from 'react-motion/lib/presets';

describe('spring', () => {
  describe('.isSpring', () => {
    it('returns true if __spring is true', () => {
      expect(isSpring({__spring: true})).toEqual(true);
    });

    it('returns false if __spring is false', () => {
      expect(isSpring({__spring: false})).toEqual(false);
    });

    it('returns false if __spring doesnt exist', () => {
      expect(isSpring({})).toEqual(false);
    });
  });

  describe('.spring', () => {
    const value = 1;

    it('returns a spring', () => {
      expect(isSpring(spring(value))).toEqual(true);
    });

    it('sets the value to the passed value', () => {
      expect(spring(value).value).toEqual(value);
    });

    describe('when no config is passed', () => {
      it('defaults the config to noWobble', () => {
        expect(spring(value).config).toEqual(noWobble);
      });
    });

    describe('when a config is passed', () => {
      it('sets the config to the passed config', () => {
        expect(spring(value, wobbly).config).toEqual(wobbly);
      });
    });
  });
});
