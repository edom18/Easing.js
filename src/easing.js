/*
 * easing.js
 *
 * This script give easing functions.
 *
 * Copyright (c) 2012 Kazuya Hiruma
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author   Kazuya Hiruma (http://css-eblog.com/)
 * @version  0.1.0
 * @github   https://github.com/edom18/easing.js
 */

(function (win, doc, exports) {

'use strict';

/**
 * Easing functions
 * @param {number} t Time.
 * @param {number} b Beginning position.
 * @param {number} c Total change
 * @param {number} d Duration
 * @example
 *  var begin    = 100,
 *      finish   = 220,
 *      change   = finish - begin,
 *      duration = 30,
 *      time     = 0;
 * (function easing() {
 *     var x = easeInCubic(time++, begin, change, duration);
 *
 *     if (time > duration) return;
 *     setTimeout(easing, 1000 / 60);
 * }());
 */

/**
 * @constructor
 * @param {string} type Easing name.
 */
function Easing(type, t, b, c, d) {
    this._easing = easing[type];

    if (!this._easing) {
        throw new Error('Value of `type` is undefined.');
    }

    if (
        typeof t === 'number' &&
        typeof b === 'number' &&
        typeof c === 'number' &&
        typeof d === 'number'
    ) {
         this.setProp(t, b, c, d);
    }
}
Easing.prototype = {
    /**
     * @return {?number} easing value.
     */
    getValue: function () {

        if (
            typeof this._t === 'undefined' ||
            typeof this._b === 'undefined' ||
            typeof this._c === 'undefined' ||
            typeof this._d === 'undefined'
        ) {
            throw new Error('Must be set properties, time, begin, change and duration.');
        }

        var val = this._easing(this._t++, this._b, this._c, this._d);

        if (this._t > this._d && val !== this._f) {
            return null;
        }

        return val;
    },

    /**
     * @param {number} t Time.
     * @param {number} b Beginning position.
     * @param {number} c Total change
     * @param {number} d Duration
     */
    setProp: function (t, b, c, d) {

        if (arguments.length !== 4) {
            throw new Error('Not enough arguments.');
        }

        this._t = t;
        this._b = b;
        this._c = c;
        this._d = d;

        this._f = b + c;
    }
};
Easing.prototype.constructor = Easing;

var easing = {
    easeInCubic: function (t, b, c, d) {
        return c * Math.pow (t / d, 3) + b;
    },
    easeOutCubic: function (t, b, c, d) {
        return c * (Math.pow (t / d - 1, 3) + 1) + b;
    },
    easeInOutCubic: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow (t, 3) + b;
        }
        return c / 2 * (Math.pow (t - 2, 3) + 2) + b;
    },
    easeInQuart: function (t, b, c, d) {
        return c * Math.pow (t / d, 4) + b;
    },
    easeOutQuart: function (t, b, c, d) {
        return -c * (Math.pow (t / d-1, 4) - 1) + b;
    },
    easeInOutQuart: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow (t, 4) + b;
        }
        return -c / 2 * (Math.pow (t-2, 4) - 2) + b;
    },
    easeInQuint: function (t, b, c, d) {
        return c * Math.pow (t / d, 5) + b;
    },
    easeOutQuint: function (t, b, c, d) {
        return c * (Math.pow (t / d-1, 5) + 1) + b;
    },
    easeInOutQuint: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow (t, 5) + b;
        }
        return c / 2 * (Math.pow (t - 2, 5) + 2) + b;
    },
    easeInSine: function (t, b, c, d) {
        return c * (1 - Math.cos(t / d * (Math.PI / 2))) + b;
    },
    easeOutSine: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (t, b, c, d) {
        return c / 2 * (1 - Math.cos(Math.PI * t / d)) + b;
    },
    easeInExpo: function (t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (t, b, c, d) {
        if ((t/=d/2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (t, b, c, d) {
        return c * (1 - Math.sqrt(1 - (t /= d) * t)) + b;
    },
    easeOutCirc: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * (1 - Math.sqrt(1 - t * t)) + b;
        }
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInQuad: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    linear: function (t, b, c, d) {
        return (c * t / d) + b;
    },
    easeIn: function (t, b, c, d) {
        return (c * (t /= d) * t) + b;
    },
    easeOut: function (t, b, c, d) {
        return c * (-(t /= d) * (t - 2)) + b;
    },
    easeInOut: function (t, b, c, d) {
        if ((t /= d) < 0.5) {
            return c * ((t *= 2) * t / 2) + b;
        }
        else {
            return c * (-2 * t * (t - 2) - 1) + b;
        }
    }
};

//export to global.
exports.Easing = Easing;

}(window, document, window));
