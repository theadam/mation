import raf from 'raf';
import now from 'performance-now';
import presets from 'react-motion/lib/presets';

import State from './state';
import Signal from 'simple-signal';
import { spring } from './spring';

export { presets, spring };

class Animation {
  signal = Signal()
  moveSignal = Signal()
  settleSignal = Signal();

  constructor(val, config) {
    this.state = State(val);
    this.config = config;
    this.destination = val;
    this.last;
    this.updateHandler = (current) => this.update(current);
  }

  moveTo(newVal) {
    this.last = this.state.moving ? this.last : now();
    this.destination = newVal;
    if (!this.state.moving) (this.moveSignal.emit(), this.scheduleUpdate());
  }

  scheduleUpdate() {
    raf(this.updateHandler);
  }

  update(current) {
    const delta = current - this.last;
    this.last = current;
    // hack for inactive tabs
    if (delta > 100) return this.scheduleUpdate();

    this.state.step(delta, this.destination, this.config);
    this.signal.emit(this.state.x);
    if (this.state.moving) this.scheduleUpdate();
    else this.settleSignal.emit();
  }

  on(listener) {
    this.signal.on(listener);
  }

  off(listener) {
    this.signal.off(listener);
  }

  onSettle(fn) {
    this.settleSignal.on(fn);
  }

  offSettle(fn) {
    this.settleSignal.off(fn);
  }

  onMove(fn) {
    this.moveSignal.on(fn);
  }

  offMove(fn) {
    this.moveSignal.off(fn);
  }
}

export default function Mation(val, config) {
  return new Animation(val, config);
}
