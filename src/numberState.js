import stepper from 'react-motion/lib/stepper';
import { isSpring } from './spring';

export default class NumberState {
  moving = false;
  vel = 0;

  constructor(val) {
    this.x = val;
  }

  step(delta, destination, config) {
    if (isSpring(destination)) return this.step(delta, destination.value, destination.config);
    if (!config) {
      this.x = destination;
      this.vel = 0;
      this.moving = false;
      return this;
    }

    const { stiffness, damping } = config;
    const newStuff = stepper(delta / 1000,
        this.x,
        this.vel,
        destination,
        stiffness,
        damping,
        0.05);
    this.x = newStuff[0];
    this.vel = newStuff[1];
    if (this.x === destination && this.vel === 0) this.moving = false;
    else this.moving = true;
    return this;
  }
}

