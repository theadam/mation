import State from './state';
import { isSpring } from './spring';

function mapObj(obj, transform) {
  const ret = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    ret[keys[i]] = transform(obj[keys[i]]);
  }
  return ret;
}

export default class ObjectState {
  moving = false;

  constructor(val) {
    this.x = mapObj(val, v => v);
    this.states = mapObj(val, v => State(v));
  }

  step(delta, destination, config) {
    if (isSpring(destination)) return this.step(delta, destination.value, destination.config);

    this.moving = false;
    const keys = Object.keys(this.states);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const state = this.states[key];
      state.step(delta, destination[key], config);
      this.x[key] = state.x;
      if (state.moving) (this.moving = true);
    }
    return this;
  }
}

