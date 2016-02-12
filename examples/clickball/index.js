import './index.css';

import Mation, { presets, spring } from 'mation';

const container = document.getElementById('container');

const ballMation = Mation(100, presets.wobbly);

const reset = () => {
  ballMation.moveTo(100);
};

container.onclick = () => {
  ballMation.moveTo(500);
  setTimeout(reset, 200);
};

ballMation.on(v => container.style.height = `${v}px`);
