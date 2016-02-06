import presets from 'react-motion/lib/presets';

const key = '__spring';

export function isSpring(val) {
  return val[key] === true;
}

export function spring(value, config = presets.noWobble) {
  return {
    [key]: true,
    value,
    config,
  };
}
