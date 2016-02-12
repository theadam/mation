import './index.css';

import Mation, { presets, spring } from 'mation';

const container = document.getElementById('container');
const button = document.getElementById('add');

const clamp = min => max => v => Math.max(min, Math.min(max, v));

function createEntry() {
  const element = document.createElement('div');
  element.className = 'entry';
  const close = document.createElement('button');
  close.innerHTML = 'x';
  close.className = 'close';
  element.appendChild(close);
  container.appendChild(element);
  const mation = new Mation(0, presets.noWobble);
  mation.on(v => {
    element.style.height = `${Math.max(0, (v / 2) | 0)}px`;
    element.style.borderWidth = `${Math.round(v / 100)}px`;
    element.style.opacity = `${clamp(0)(1)(v / 100)}`;
  });

  close.onclick = () => {
    mation.moveTo(0);
    mation.onSettle(() => element.remove());
  };
  mation.moveTo(100);
}

button.onclick = () => createEntry();
