import './index.css';

import Mation, { presets, spring } from 'mation';

const container = document.getElementById('container');

const ballMation = new Mation({x: 0, y: 0}, presets.gentle);

ballMation.on(v => {
  container.style.transform = `translate3d(${v.x | 0}px, ${v.y | 0}px, 0px)`;
});

let isDown = false;
const iter = () => {
  ballMation.moveTo(isDown ? {x: 0, y: 0} : spring({x: 0, y: 500}, presets.wobbly));
  isDown = !isDown;
};

ballMation.onSettle(iter);
iter();

