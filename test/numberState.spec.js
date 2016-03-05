import sinon from 'sinon';
import rewire from 'rewire';

const NumberState = rewire('../src/numberState.js');

NumberState.__set__('stepper', 1);

new NumberState();


describe('NumberState', () => {

});
