(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mation"] = factory();
	else
		root["mation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = Mation;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _raf = __webpack_require__(9);

	var _raf2 = _interopRequireDefault(_raf);

	var _performanceNow = __webpack_require__(3);

	var _performanceNow2 = _interopRequireDefault(_performanceNow);

	var _reactMotionLibPresets = __webpack_require__(4);

	var _reactMotionLibPresets2 = _interopRequireDefault(_reactMotionLibPresets);

	var _state = __webpack_require__(2);

	var _state2 = _interopRequireDefault(_state);

	var _simpleSignal = __webpack_require__(11);

	var _simpleSignal2 = _interopRequireDefault(_simpleSignal);

	var _spring = __webpack_require__(1);

	exports.presets = _reactMotionLibPresets2['default'];
	exports.spring = _spring.spring;

	var Animation = (function () {
	  function Animation(val, config) {
	    var _this = this;

	    _classCallCheck(this, Animation);

	    this.signal = (0, _simpleSignal2['default'])();
	    this.moveSignal = (0, _simpleSignal2['default'])();
	    this.settleSignal = (0, _simpleSignal2['default'])();

	    this.state = (0, _state2['default'])(val);
	    this.config = config;
	    this.destination = val;
	    this.last;
	    this.updateHandler = function (current) {
	      return _this.update(current);
	    };
	  }

	  _createClass(Animation, [{
	    key: 'moveTo',
	    value: function moveTo(newVal) {
	      this.last = this.state.moving ? this.last : (0, _performanceNow2['default'])();
	      this.destination = newVal;
	      if (!this.state.moving) this.moveSignal.emit(), this.scheduleUpdate();
	    }
	  }, {
	    key: 'scheduleUpdate',
	    value: function scheduleUpdate() {
	      (0, _raf2['default'])(this.updateHandler);
	    }
	  }, {
	    key: 'update',
	    value: function update(current) {
	      var delta = current - this.last;
	      this.last = current;
	      // hack for inactive tabs
	      if (delta > 100) return this.scheduleUpdate();

	      this.state.step(delta, this.destination, this.config);
	      this.signal.emit(this.state.x);
	      if (this.state.moving) this.scheduleUpdate();else this.settleSignal.emit();
	    }
	  }, {
	    key: 'on',
	    value: function on(listener) {
	      this.signal.on(listener);
	    }
	  }, {
	    key: 'off',
	    value: function off(listener) {
	      this.signal.off(listener);
	    }
	  }, {
	    key: 'onSettle',
	    value: function onSettle(fn) {
	      this.settleSignal.on(fn);
	    }
	  }, {
	    key: 'offSettle',
	    value: function offSettle(fn) {
	      this.settleSignal.off(fn);
	    }
	  }, {
	    key: 'onMove',
	    value: function onMove(fn) {
	      this.moveSignal.on(fn);
	    }
	  }, {
	    key: 'offMove',
	    value: function offMove(fn) {
	      this.moveSignal.off(fn);
	    }
	  }]);

	  return Animation;
	})();

	function Mation(val, config) {
	  return new Animation(val, config);
	}

	exports.Mation = Mation;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.isSpring = isSpring;
	exports.spring = spring;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _reactMotionLibPresets = __webpack_require__(4);

	var _reactMotionLibPresets2 = _interopRequireDefault(_reactMotionLibPresets);

	var key = '__spring';

	function isSpring(val) {
	  return val[key] === true;
	}

	function spring(value) {
	  var _ref;

	  var config = arguments.length <= 1 || arguments[1] === undefined ? _reactMotionLibPresets2['default'].noWobble : arguments[1];

	  return _ref = {}, _defineProperty(_ref, key, true), _defineProperty(_ref, 'value', value), _defineProperty(_ref, 'config', config), _ref;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _arrayState = __webpack_require__(5);

	var _arrayState2 = _interopRequireDefault(_arrayState);

	var _objectState = __webpack_require__(7);

	var _objectState2 = _interopRequireDefault(_objectState);

	var _numberState = __webpack_require__(6);

	var _numberState2 = _interopRequireDefault(_numberState);

	exports['default'] = function (val, config) {
	  if (Array.isArray(val)) {
	    return new _arrayState2['default'](val, config);
	  }
	  if (typeof val === 'object') {
	    return new _objectState2['default'](val, config);
	  }
	  return new _numberState2['default'](val, config);
	};

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = {
	  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
	  gentle: { stiffness: 120, damping: 14 },
	  wobbly: { stiffness: 180, damping: 12 },
	  stiff: { stiffness: 210, damping: 20 }
	};
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _state = __webpack_require__(2);

	var _state2 = _interopRequireDefault(_state);

	var _spring = __webpack_require__(1);

	var ArrayState = (function () {
	  function ArrayState(val) {
	    _classCallCheck(this, ArrayState);

	    this.moving = false;

	    this.x = val.slice();
	    this.states = val.map(function (v) {
	      return (0, _state2['default'])(v);
	    });
	  }

	  _createClass(ArrayState, [{
	    key: 'step',
	    value: function step(delta, destination, config) {
	      if ((0, _spring.isSpring)(destination)) return this.step(delta, destination.value, destination.config);

	      this.moving = false;
	      for (var i = 0; i < this.states.length; i++) {
	        this.states[i].step(delta, destination[i], config);
	        this.x[i] = this.states[i].x;
	        if (this.states[i].moving) this.moving = true;
	      }
	      return this;
	    }
	  }]);

	  return ArrayState;
	})();

	exports['default'] = ArrayState;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _reactMotionLibStepper = __webpack_require__(10);

	var _reactMotionLibStepper2 = _interopRequireDefault(_reactMotionLibStepper);

	var _spring = __webpack_require__(1);

	var NumberState = (function () {
	  function NumberState(val) {
	    _classCallCheck(this, NumberState);

	    this.moving = false;
	    this.vel = 0;

	    this.x = val;
	  }

	  _createClass(NumberState, [{
	    key: 'step',
	    value: function step(delta, destination, config) {
	      if ((0, _spring.isSpring)(destination)) return this.step(delta, destination.value, destination.config);
	      if (!config) {
	        this.x = destination;
	        this.vel = 0;
	        this.moving = false;
	        return this;
	      }

	      var stiffness = config.stiffness;
	      var damping = config.damping;

	      var newStuff = (0, _reactMotionLibStepper2['default'])(delta / 1000, this.x, this.vel, destination, stiffness, damping, 0.05);
	      this.x = newStuff[0];
	      this.vel = newStuff[1];
	      if (this.x === destination && this.vel === 0) this.moving = false;else this.moving = true;
	      return this;
	    }
	  }]);

	  return NumberState;
	})();

	exports['default'] = NumberState;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _state = __webpack_require__(2);

	var _state2 = _interopRequireDefault(_state);

	var _spring = __webpack_require__(1);

	function mapObj(obj, transform) {
	  var ret = {};
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    ret[keys[i]] = transform(obj[keys[i]]);
	  }
	  return ret;
	}

	var ObjectState = (function () {
	  function ObjectState(val) {
	    _classCallCheck(this, ObjectState);

	    this.moving = false;

	    this.x = mapObj(val, function (v) {
	      return v;
	    });
	    this.states = mapObj(val, function (v) {
	      return (0, _state2['default'])(v);
	    });
	  }

	  _createClass(ObjectState, [{
	    key: 'step',
	    value: function step(delta, destination, config) {
	      if ((0, _spring.isSpring)(destination)) return this.step(delta, destination.value, destination.config);

	      this.moving = false;
	      var keys = Object.keys(this.states);
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var state = this.states[key];
	        state.step(delta, destination[key], config);
	        this.x[key] = state.x;
	        if (state.moving) this.moving = true;
	      }
	      return this;
	    }
	  }]);

	  return ObjectState;
	})();

	exports['default'] = ObjectState;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(3)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]

	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(global, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	

	// stepper is used a lot. Saves allocation to return the same array wrapper.
	// This is fine and danger-free against mutations because the callsite
	// immediately destructures it and gets the numbers inside without passing the
	"use strict";

	exports.__esModule = true;
	exports["default"] = stepper;

	var reusedTuple = [];

	function stepper(secondPerFrame, x, v, destX, k, b, precision) {
	  // Spring stiffness, in kg / s^2

	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);

	  // Damping, in kg / s
	  var Fdamper = -b * v;

	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;

	  var newV = v + a * secondPerFrame;
	  var newX = x + newV * secondPerFrame;

	  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
	    reusedTuple[0] = destX;
	    reusedTuple[1] = 0;
	    return reusedTuple;
	  }

	  reusedTuple[0] = newX;
	  reusedTuple[1] = newV;
	  return reusedTuple;
	}

	module.exports = exports["default"];
	// array reference around.

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = Signal;

	function Signal() {
	  var subscribers = [];
	  return {
	    on: function on(fn) {
	      subscribers.push(fn);
	    },
	    off: function off(fn) {
	      var index = subscribers.indexOf(fn);
	      if (index > -1) {
	        subscribers.splice(index, 1);
	      }
	    },
	    emit: function emit(val) {
	      for (var i = 0; i < subscribers.length; i++) {
	        subscribers[i](val);
	      }
	    }
	  };
	}

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;