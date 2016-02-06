import State from './state';
import { isSpring } from './spring';

export default class ArrayState {
  moving = false;

  constructor(val) {
    this.x = val.slice();
    this.states = val.map(v => State(v));
  }

  step(delta, destination, config) {
    if (isSpring(destination)) return this.step(delta, destination.value, destination.config);

    this.moving = false;
    for (let i = 0; i < this.states.length; i++) {
      this.states[i].step(delta, destination[i], config);
      this.x[i] = this.states[i].x;
      if (this.states[i].moving) (this.moving = true);
    }
    return this;
  }
}

