# Mation

Mation is a simple library to provide simple smooth animations.  Animations can be interrupted or redirected, and still look natural.

[Demo using mation with react-sticky](https://theadam.github.com/mation-react-sticky-example)

[Demo using mation / react-mation with react-inform](http://theadam.github.io/react-inform/examples/mation-example)

## Installation

`npm install --save mation`

## Tutorial ([Demo](https://jsfiddle.net/theadam/Lge07wkt/7/embedded/result,js,html,css))

Lets make a very simple animation.  Our goal is to have a button animate the growing and shrinking of a div.

To start lets make a growing and shrinking div without animations.

```javascript
const { Mation, preset, spring } = mation;

const container = document.getElementById('container');
const button = document.getElementById('button');

function modifyContainer(dimensions) {
  container.style.height = `${dimensions}px`
  container.style.width = `${dimensions}px`;
}

let dimensions = 100;
button.onclick = () => {
  dimensions = dimensions > 100 ? 100 : 500;
  modifyContainer(dimensions);
};

modifyContainer(dimensions);
```
[JSFiddle Link](https://jsfiddle.net/theadam/Lge07wkt/3/embedded/result,js,html,css)


Simple enough.  Now lets let Mation manage the size of the box.  To do this, we just create a new Mation, then whenever we want to change the dimensions of the box, we call Mation#moveTo.  We also must listen for value changes using Mation#on.

```javascript
...
let dimensions = 100;
const boxMation = Mation(dimensions);

button.onclick = () => {
  dimensions = dimensions > 100 ? 100 : 500;
  boxMation.moveTo(dimensions);
};

boxMation.on(modifyContainer);
```
[JSFiddle Link](https://jsfiddle.net/theadam/Lge07wkt/4/embedded/result,js,html,css)


There are still no animations!  Since you are moving directly to the dimensions, Mation jumps to that value.  To create an animation, you can add a spring.

```javascript
  boxMation.moveTo(spring(dimensions));
```
[JSFiddle Link](https://jsfiddle.net/theadam/Lge07wkt/5/embedded/result,js,html,css)

Click that button, and watch the box move.  You can click many times and the animation still looks natural as it changes courses!

Thats great, but we want that animation to be more wobbly.  To do this, our spring takes a configuration value.  This value is an object with `damping` and `stiffness` properties.  There are presets provided with Mation for some nice effects.  These presets include `noWobble` (the default), `wobbly`, `gentle`, and `stiff`.

```javascript
  boxMation.moveTo(spring(dimensions, presets.wobbly));
```
[JSFiddle Link](https://jsfiddle.net/theadam/Lge07wkt/6/embedded/result,js,html,css)

Much more wobbly, and spamming the button still doesn't cause the animation to jerk unnaturally.

Mation can handle more complex movements by accepting not just numbers, but also arrays and objects.  Each entry can also have their own spring configurations.

```javascript
function modifyContainer({width, height}) {
  container.style.height = `${height}px`
  container.style.width = `${width}px`;
}

let dimensions = 100;
const boxMation = Mation({width: dimensions, height: dimensions});

button.onclick = () => {
  dimensions = dimensions > 100 ? 100 : 500;
  boxMation.moveTo({
    width: spring(dimensions, presets.gentle),
    height: spring(dimensions, presets.wobbly)
  });
};
```
[JSFiddle Link](https://jsfiddle.net/theadam/Lge07wkt/7/embedded/result,js,html,css)

## Api

### Mation(initialValue, [config])

Creates a new Mation.  Initial value is the initial value of the animation.  Config is the default config to use for all movements without springs.  If left blank, movements without springs jump to the destination immediately. [See this JSFiddle for an example](https://jsfiddle.net/theadam/Lge07wkt/4/embedded/result,js,html,css).

A config object is just an object with numeric `damping` and `stiffness` properties.

#### Mation#moveTo(value)

Creates a movement with the new destination set to the passed value.

#### Mation#on(listener)

Registers a listener for value changes.  The listener should take one argument.

#### Mation#off(listener)

Removes a listener previously registered for this Mation.

#### Mation#onSettle(listener)

Registers a listener that is called each time this Mation settles (stops moving).

#### Mation#offSettle(listener)

Removes a settle listener previously registered for this Mation.

#### Mation#onMove(listener)

Registers a listener that is called each time this Mation starts moving.

#### Mation.offMove(listener)

Removes a move listener previously registered for this Mation.

### spring(destination, [config])

Creates a spring movement to be passed to Mation#moveTo.  The config defaults to `presets.noWobble`.

### presets

Provides preset config objects to be used with `spring` or `Mation`:
- `noWobble`
- `wobbly`
- `stiff`
- `gentle`

## Thanks

- [chenglou](https://github.com/chenglou), his awesome library [react-motion](https://github.com/chenglou/react-motion), and [his talk](https://www.youtube.com/watch?v=1tavDv5hXpo) explaning it.

## License

MIT
