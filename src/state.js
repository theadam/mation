import ArrayState from './arrayState';
import ObjectState from './objectState';
import NumberState from './numberState';

export default function(val, config) {
  if (Array.isArray(val)) {
    return new ArrayState(val, config);
  }
  if (typeof val === 'object') {
    return new ObjectState(val, config);
  }
  return new NumberState(val, config);
}
