/** 
 * Kendo UI v2016.3.1118 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('util/main', ['kendo.core'], f);
}(function () {
    (function () {
        var math = Math, kendo = window.kendo, deepExtend = kendo.deepExtend;
        var DEG_TO_RAD = math.PI / 180, MAX_NUM = Number.MAX_VALUE, MIN_NUM = -Number.MAX_VALUE, UNDEFINED = 'undefined';
        function defined(value) {
            return typeof value !== UNDEFINED;
        }
        function round(value, precision) {
            var power = pow(precision);
            return math.round(value * power) / power;
        }
        function pow(p) {
            if (p) {
                return math.pow(10, p);
            } else {
                return 1;
            }
        }
        function limitValue(value, min, max) {
            return math.max(math.min(value, max), min);
        }
        function rad(degrees) {
            return degrees * DEG_TO_RAD;
        }
        function deg(radians) {
            return radians / DEG_TO_RAD;
        }
        function isNumber(val) {
            return typeof val === 'number' && !isNaN(val);
        }
        function valueOrDefault(value, defaultValue) {
            return defined(value) ? value : defaultValue;
        }
        function sqr(value) {
            return value * value;
        }
        function objectKey(object) {
            var parts = [];
            for (var key in object) {
                parts.push(key + object[key]);
            }
            return parts.sort().join('');
        }
        function hashKey(str) {
            var hash = 2166136261;
            for (var i = 0; i < str.length; ++i) {
                hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
                hash ^= str.charCodeAt(i);
            }
            return hash >>> 0;
        }
        function hashObject(object) {
            return hashKey(objectKey(object));
        }
        var now = Date.now;
        if (!now) {
            now = function () {
                return new Date().getTime();
            };
        }
        function arrayLimits(arr) {
            var length = arr.length, i, min = MAX_NUM, max = MIN_NUM;
            for (i = 0; i < length; i++) {
                max = math.max(max, arr[i]);
                min = math.min(min, arr[i]);
            }
            return {
                min: min,
                max: max
            };
        }
        function arrayMin(arr) {
            return arrayLimits(arr).min;
        }
        function arrayMax(arr) {
            return arrayLimits(arr).max;
        }
        function sparseArrayMin(arr) {
            return sparseArrayLimits(arr).min;
        }
        function sparseArrayMax(arr) {
            return sparseArrayLimits(arr).max;
        }
        function sparseArrayLimits(arr) {
            var min = MAX_NUM, max = MIN_NUM;
            for (var i = 0, length = arr.length; i < length; i++) {
                var n = arr[i];
                if (n !== null && isFinite(n)) {
                    min = math.min(min, n);
                    max = math.max(max, n);
                }
            }
            return {
                min: min === MAX_NUM ? undefined : min,
                max: max === MIN_NUM ? undefined : max
            };
        }
        function last(array) {
            if (array) {
                return array[array.length - 1];
            }
        }
        function append(first, second) {
            first.push.apply(first, second);
            return first;
        }
        function renderTemplate(text) {
            return kendo.template(text, {
                useWithBlock: false,
                paramName: 'd'
            });
        }
        function renderAttr(name, value) {
            return defined(value) && value !== null ? ' ' + name + '=\'' + value + '\' ' : '';
        }
        function renderAllAttr(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                output += renderAttr(attrs[i][0], attrs[i][1]);
            }
            return output;
        }
        function renderStyle(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                var value = attrs[i][1];
                if (defined(value)) {
                    output += attrs[i][0] + ':' + value + ';';
                }
            }
            if (output !== '') {
                return output;
            }
        }
        function renderSize(size) {
            if (typeof size !== 'string') {
                size += 'px';
            }
            return size;
        }
        function renderPos(pos) {
            var result = [];
            if (pos) {
                var parts = kendo.toHyphens(pos).split('-');
                for (var i = 0; i < parts.length; i++) {
                    result.push('k-pos-' + parts[i]);
                }
            }
            return result.join(' ');
        }
        function isTransparent(color) {
            return color === '' || color === null || color === 'none' || color === 'transparent' || !defined(color);
        }
        function arabicToRoman(n) {
            var literals = {
                1: 'i',
                10: 'x',
                100: 'c',
                2: 'ii',
                20: 'xx',
                200: 'cc',
                3: 'iii',
                30: 'xxx',
                300: 'ccc',
                4: 'iv',
                40: 'xl',
                400: 'cd',
                5: 'v',
                50: 'l',
                500: 'd',
                6: 'vi',
                60: 'lx',
                600: 'dc',
                7: 'vii',
                70: 'lxx',
                700: 'dcc',
                8: 'viii',
                80: 'lxxx',
                800: 'dccc',
                9: 'ix',
                90: 'xc',
                900: 'cm',
                1000: 'm'
            };
            var values = [
                1000,
                900,
                800,
                700,
                600,
                500,
                400,
                300,
                200,
                100,
                90,
                80,
                70,
                60,
                50,
                40,
                30,
                20,
                10,
                9,
                8,
                7,
                6,
                5,
                4,
                3,
                2,
                1
            ];
            var roman = '';
            while (n > 0) {
                if (n < values[0]) {
                    values.shift();
                } else {
                    roman += literals[values[0]];
                    n -= values[0];
                }
            }
            return roman;
        }
        function romanToArabic(r) {
            r = r.toLowerCase();
            var digits = {
                i: 1,
                v: 5,
                x: 10,
                l: 50,
                c: 100,
                d: 500,
                m: 1000
            };
            var value = 0, prev = 0;
            for (var i = 0; i < r.length; ++i) {
                var v = digits[r.charAt(i)];
                if (!v) {
                    return null;
                }
                value += v;
                if (v > prev) {
                    value -= 2 * prev;
                }
                prev = v;
            }
            return value;
        }
        function memoize(f) {
            var cache = Object.create(null);
            return function () {
                var id = '';
                for (var i = arguments.length; --i >= 0;) {
                    id += ':' + arguments[i];
                }
                return id in cache ? cache[id] : cache[id] = f.apply(this, arguments);
            };
        }
        function ucs2decode(string) {
            var output = [], counter = 0, length = string.length, value, extra;
            while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 55296 && value <= 56319 && counter < length) {
                    extra = string.charCodeAt(counter++);
                    if ((extra & 64512) == 56320) {
                        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                    } else {
                        output.push(value);
                        counter--;
                    }
                } else {
                    output.push(value);
                }
            }
            return output;
        }
        function ucs2encode(array) {
            return array.map(function (value) {
                var output = '';
                if (value > 65535) {
                    value -= 65536;
                    output += String.fromCharCode(value >>> 10 & 1023 | 55296);
                    value = 56320 | value & 1023;
                }
                output += String.fromCharCode(value);
                return output;
            }).join('');
        }
        function mergeSort(a, cmp) {
            if (a.length < 2) {
                return a.slice();
            }
            function merge(a, b) {
                var r = [], ai = 0, bi = 0, i = 0;
                while (ai < a.length && bi < b.length) {
                    if (cmp(a[ai], b[bi]) <= 0) {
                        r[i++] = a[ai++];
                    } else {
                        r[i++] = b[bi++];
                    }
                }
                if (ai < a.length) {
                    r.push.apply(r, a.slice(ai));
                }
                if (bi < b.length) {
                    r.push.apply(r, b.slice(bi));
                }
                return r;
            }
            return function sort(a) {
                if (a.length <= 1) {
                    return a;
                }
                var m = Math.floor(a.length / 2);
                var left = a.slice(0, m);
                var right = a.slice(m);
                left = sort(left);
                right = sort(right);
                return merge(left, right);
            }(a);
        }
        deepExtend(kendo, {
            util: {
                MAX_NUM: MAX_NUM,
                MIN_NUM: MIN_NUM,
                append: append,
                arrayLimits: arrayLimits,
                arrayMin: arrayMin,
                arrayMax: arrayMax,
                defined: defined,
                deg: deg,
                hashKey: hashKey,
                hashObject: hashObject,
                isNumber: isNumber,
                isTransparent: isTransparent,
                last: last,
                limitValue: limitValue,
                now: now,
                objectKey: objectKey,
                round: round,
                rad: rad,
                renderAttr: renderAttr,
                renderAllAttr: renderAllAttr,
                renderPos: renderPos,
                renderSize: renderSize,
                renderStyle: renderStyle,
                renderTemplate: renderTemplate,
                sparseArrayLimits: sparseArrayLimits,
                sparseArrayMin: sparseArrayMin,
                sparseArrayMax: sparseArrayMax,
                sqr: sqr,
                valueOrDefault: valueOrDefault,
                romanToArabic: romanToArabic,
                arabicToRoman: arabicToRoman,
                memoize: memoize,
                ucs2encode: ucs2encode,
                ucs2decode: ucs2decode,
                mergeSort: mergeSort
            }
        });
        kendo.drawing.util = kendo.util;
        kendo.dataviz.util = kendo.util;
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('util/text-metrics', [
        'kendo.core',
        'util/main'
    ], f);
}(function () {
    (function ($) {
        var doc = document, kendo = window.kendo, Class = kendo.Class, util = kendo.util, defined = util.defined;
        var LRUCache = Class.extend({
            init: function (size) {
                this._size = size;
                this._length = 0;
                this._map = {};
            },
            put: function (key, value) {
                var lru = this, map = lru._map, entry = {
                        key: key,
                        value: value
                    };
                map[key] = entry;
                if (!lru._head) {
                    lru._head = lru._tail = entry;
                } else {
                    lru._tail.newer = entry;
                    entry.older = lru._tail;
                    lru._tail = entry;
                }
                if (lru._length >= lru._size) {
                    map[lru._head.key] = null;
                    lru._head = lru._head.newer;
                    lru._head.older = null;
                } else {
                    lru._length++;
                }
            },
            get: function (key) {
                var lru = this, entry = lru._map[key];
                if (entry) {
                    if (entry === lru._head && entry !== lru._tail) {
                        lru._head = entry.newer;
                        lru._head.older = null;
                    }
                    if (entry !== lru._tail) {
                        if (entry.older) {
                            entry.older.newer = entry.newer;
                            entry.newer.older = entry.older;
                        }
                        entry.older = lru._tail;
                        entry.newer = null;
                        lru._tail.newer = entry;
                        lru._tail = entry;
                    }
                    return entry.value;
                }
            }
        });
        var defaultMeasureBox = $('<div style=\'position: absolute !important; top: -4000px !important; width: auto !important; height: auto !important;' + 'padding: 0 !important; margin: 0 !important; border: 0 !important;' + 'line-height: normal !important; visibility: hidden !important; white-space: nowrap!important;\' />')[0];
        function zeroSize() {
            return {
                width: 0,
                height: 0,
                baseline: 0
            };
        }
        var TextMetrics = Class.extend({
            init: function (options) {
                this._cache = new LRUCache(1000);
                this._initOptions(options);
            },
            options: { baselineMarkerSize: 1 },
            measure: function (text, style, box) {
                if (!text) {
                    return zeroSize();
                }
                var styleKey = util.objectKey(style), cacheKey = util.hashKey(text + styleKey), cachedResult = this._cache.get(cacheKey);
                if (cachedResult) {
                    return cachedResult;
                }
                var size = zeroSize();
                var measureBox = box ? box : defaultMeasureBox;
                var baselineMarker = this._baselineMarker().cloneNode(false);
                for (var key in style) {
                    var value = style[key];
                    if (defined(value)) {
                        measureBox.style[key] = value;
                    }
                }
                $(measureBox).text(text);
                measureBox.appendChild(baselineMarker);
                doc.body.appendChild(measureBox);
                if ((text + '').length) {
                    size.width = measureBox.offsetWidth - this.options.baselineMarkerSize;
                    size.height = measureBox.offsetHeight;
                    size.baseline = baselineMarker.offsetTop + this.options.baselineMarkerSize;
                }
                if (size.width > 0 && size.height > 0) {
                    this._cache.put(cacheKey, size);
                }
                measureBox.parentNode.removeChild(measureBox);
                return size;
            },
            _baselineMarker: function () {
                return $('<div class=\'k-baseline-marker\' ' + 'style=\'display: inline-block; vertical-align: baseline;' + 'width: ' + this.options.baselineMarkerSize + 'px; height: ' + this.options.baselineMarkerSize + 'px;' + 'overflow: hidden;\' />')[0];
            }
        });
        TextMetrics.current = new TextMetrics();
        function measureText(text, style, measureBox) {
            return TextMetrics.current.measure(text, style, measureBox);
        }
        function loadFonts(fonts, callback) {
            var promises = [];
            if (fonts.length > 0 && document.fonts) {
                try {
                    promises = fonts.map(function (font) {
                        return document.fonts.load(font);
                    });
                } catch (e) {
                    kendo.logToConsole(e);
                }
                Promise.all(promises).then(callback, callback);
            } else {
                callback();
            }
        }
        kendo.util.TextMetrics = TextMetrics;
        kendo.util.LRUCache = LRUCache;
        kendo.util.loadFonts = loadFonts;
        kendo.util.measureText = measureText;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('util/base64', ['util/main'], f);
}(function () {
    (function () {
        var kendo = window.kendo, deepExtend = kendo.deepExtend, fromCharCode = String.fromCharCode;
        var KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        function encodeBase64(input) {
            var output = '';
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = encodeUTF8(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
            }
            return output;
        }
        function encodeUTF8(input) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                var c = input.charCodeAt(i);
                if (c < 128) {
                    output += fromCharCode(c);
                } else if (c < 2048) {
                    output += fromCharCode(192 | c >>> 6);
                    output += fromCharCode(128 | c & 63);
                } else if (c < 65536) {
                    output += fromCharCode(224 | c >>> 12);
                    output += fromCharCode(128 | c >>> 6 & 63);
                    output += fromCharCode(128 | c & 63);
                }
            }
            return output;
        }
        deepExtend(kendo.util, {
            encodeBase64: encodeBase64,
            encodeUTF8: encodeUTF8
        });
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('mixins/observers', ['kendo.core'], f);
}(function () {
    (function ($) {
        var math = Math, kendo = window.kendo, deepExtend = kendo.deepExtend, inArray = $.inArray;
        var ObserversMixin = {
            observers: function () {
                this._observers = this._observers || [];
                return this._observers;
            },
            addObserver: function (element) {
                if (!this._observers) {
                    this._observers = [element];
                } else {
                    this._observers.push(element);
                }
                return this;
            },
            removeObserver: function (element) {
                var observers = this.observers();
                var index = inArray(element, observers);
                if (index != -1) {
                    observers.splice(index, 1);
                }
                return this;
            },
            trigger: function (methodName, event) {
                var observers = this._observers;
                var observer;
                var idx;
                if (observers && !this._suspended) {
                    for (idx = 0; idx < observers.length; idx++) {
                        observer = observers[idx];
                        if (observer[methodName]) {
                            observer[methodName](event);
                        }
                    }
                }
                return this;
            },
            optionsChange: function (e) {
                e = e || {};
                e.element = this;
                this.trigger('optionsChange', e);
            },
            geometryChange: function () {
                this.trigger('geometryChange', { element: this });
            },
            suspend: function () {
                this._suspended = (this._suspended || 0) + 1;
                return this;
            },
            resume: function () {
                this._suspended = math.max((this._suspended || 0) - 1, 0);
                return this;
            },
            _observerField: function (field, value) {
                if (this[field]) {
                    this[field].removeObserver(this);
                }
                this[field] = value;
                value.addObserver(this);
            }
        };
        deepExtend(kendo, { mixins: { ObserversMixin: ObserversMixin } });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/geometry', [
        'util/main',
        'mixins/observers'
    ], f);
}(function () {
    (function () {
        var math = Math, pow = math.pow, kendo = window.kendo, Class = kendo.Class, deepExtend = kendo.deepExtend, ObserversMixin = kendo.mixins.ObserversMixin, util = kendo.util, defined = util.defined, rad = util.rad, deg = util.deg, round = util.round;
        var PI_DIV_2 = math.PI / 2, MIN_NUM = util.MIN_NUM, MAX_NUM = util.MAX_NUM, PRECISION = 10;
        var Point = Class.extend({
            init: function (x, y) {
                this.x = x || 0;
                this.y = y || 0;
            },
            equals: function (other) {
                return other && other.x === this.x && other.y === this.y;
            },
            clone: function () {
                return new Point(this.x, this.y);
            },
            rotate: function (angle, origin) {
                return this.transform(transform().rotate(angle, origin));
            },
            translate: function (x, y) {
                this.x += x;
                this.y += y;
                this.geometryChange();
                return this;
            },
            translateWith: function (point) {
                return this.translate(point.x, point.y);
            },
            move: function (x, y) {
                this.x = this.y = 0;
                return this.translate(x, y);
            },
            scale: function (scaleX, scaleY) {
                if (!defined(scaleY)) {
                    scaleY = scaleX;
                }
                this.x *= scaleX;
                this.y *= scaleY;
                this.geometryChange();
                return this;
            },
            scaleCopy: function (scaleX, scaleY) {
                return this.clone().scale(scaleX, scaleY);
            },
            transform: function (transformation) {
                var mx = toMatrix(transformation), x = this.x, y = this.y;
                this.x = mx.a * x + mx.c * y + mx.e;
                this.y = mx.b * x + mx.d * y + mx.f;
                this.geometryChange();
                return this;
            },
            transformCopy: function (transformation) {
                var point = this.clone();
                if (transformation) {
                    point.transform(transformation);
                }
                return point;
            },
            distanceTo: function (point) {
                var dx = this.x - point.x;
                var dy = this.y - point.y;
                return math.sqrt(dx * dx + dy * dy);
            },
            round: function (digits) {
                this.x = round(this.x, digits);
                this.y = round(this.y, digits);
                this.geometryChange();
                return this;
            },
            toArray: function (digits) {
                var doRound = defined(digits);
                var x = doRound ? round(this.x, digits) : this.x;
                var y = doRound ? round(this.y, digits) : this.y;
                return [
                    x,
                    y
                ];
            }
        });
        defineAccessors(Point.fn, [
            'x',
            'y'
        ]);
        deepExtend(Point.fn, ObserversMixin);
        Point.fn.toString = function (digits, separator) {
            var x = this.x, y = this.y;
            if (defined(digits)) {
                x = round(x, digits);
                y = round(y, digits);
            }
            separator = separator || ' ';
            return x + separator + y;
        };
        Point.create = function (arg0, arg1) {
            if (defined(arg0)) {
                if (arg0 instanceof Point) {
                    return arg0;
                } else if (arguments.length === 1 && arg0.length === 2) {
                    return new Point(arg0[0], arg0[1]);
                } else {
                    return new Point(arg0, arg1);
                }
            }
        };
        Point.min = function () {
            var minX = util.MAX_NUM;
            var minY = util.MAX_NUM;
            for (var i = 0; i < arguments.length; i++) {
                var pt = arguments[i];
                minX = math.min(pt.x, minX);
                minY = math.min(pt.y, minY);
            }
            return new Point(minX, minY);
        };
        Point.max = function () {
            var maxX = util.MIN_NUM;
            var maxY = util.MIN_NUM;
            for (var i = 0; i < arguments.length; i++) {
                var pt = arguments[i];
                maxX = math.max(pt.x, maxX);
                maxY = math.max(pt.y, maxY);
            }
            return new Point(maxX, maxY);
        };
        Point.minPoint = function () {
            return new Point(MIN_NUM, MIN_NUM);
        };
        Point.maxPoint = function () {
            return new Point(MAX_NUM, MAX_NUM);
        };
        Point.ZERO = new Point(0, 0);
        var Size = Class.extend({
            init: function (width, height) {
                this.width = width || 0;
                this.height = height || 0;
            },
            equals: function (other) {
                return other && other.width === this.width && other.height === this.height;
            },
            clone: function () {
                return new Size(this.width, this.height);
            },
            toArray: function (digits) {
                var doRound = defined(digits);
                var width = doRound ? round(this.width, digits) : this.width;
                var height = doRound ? round(this.height, digits) : this.height;
                return [
                    width,
                    height
                ];
            }
        });
        defineAccessors(Size.fn, [
            'width',
            'height'
        ]);
        deepExtend(Size.fn, ObserversMixin);
        Size.create = function (arg0, arg1) {
            if (defined(arg0)) {
                if (arg0 instanceof Size) {
                    return arg0;
                } else if (arguments.length === 1 && arg0.length === 2) {
                    return new Size(arg0[0], arg0[1]);
                } else {
                    return new Size(arg0, arg1);
                }
            }
        };
        Size.ZERO = new Size(0, 0);
        var Rect = Class.extend({
            init: function (origin, size) {
                this.setOrigin(origin || new Point());
                this.setSize(size || new Size());
            },
            clone: function () {
                return new Rect(this.origin.clone(), this.size.clone());
            },
            equals: function (other) {
                return other && other.origin.equals(this.origin) && other.size.equals(this.size);
            },
            setOrigin: function (value) {
                this._observerField('origin', Point.create(value));
                this.geometryChange();
                return this;
            },
            getOrigin: function () {
                return this.origin;
            },
            setSize: function (value) {
                this._observerField('size', Size.create(value));
                this.geometryChange();
                return this;
            },
            getSize: function () {
                return this.size;
            },
            width: function () {
                return this.size.width;
            },
            height: function () {
                return this.size.height;
            },
            topLeft: function () {
                return this.origin.clone();
            },
            bottomRight: function () {
                return this.origin.clone().translate(this.width(), this.height());
            },
            topRight: function () {
                return this.origin.clone().translate(this.width(), 0);
            },
            bottomLeft: function () {
                return this.origin.clone().translate(0, this.height());
            },
            center: function () {
                return this.origin.clone().translate(this.width() / 2, this.height() / 2);
            },
            bbox: function (matrix) {
                var tl = this.topLeft().transformCopy(matrix);
                var tr = this.topRight().transformCopy(matrix);
                var br = this.bottomRight().transformCopy(matrix);
                var bl = this.bottomLeft().transformCopy(matrix);
                return Rect.fromPoints(tl, tr, br, bl);
            },
            transformCopy: function (m) {
                return Rect.fromPoints(this.topLeft().transform(m), this.bottomRight().transform(m));
            },
            expand: function (x, y) {
                if (!defined(y)) {
                    y = x;
                }
                this.size.width += 2 * x;
                this.size.height += 2 * y;
                this.origin.translate(-x, -y);
                return this;
            },
            expandCopy: function (x, y) {
                return this.clone().expand(x, y);
            },
            containsPoint: function (point) {
                var origin = this.origin;
                var bottomRight = this.bottomRight();
                return !(point.x < origin.x || point.y < origin.y || bottomRight.x < point.x || bottomRight.y < point.y);
            },
            _isOnPath: function (point, width) {
                var rectOuter = this.expandCopy(width, width);
                var rectInner = this.expandCopy(-width, -width);
                return rectOuter.containsPoint(point) && !rectInner.containsPoint(point);
            }
        });
        deepExtend(Rect.fn, ObserversMixin);
        Rect.fromPoints = function () {
            var topLeft = Point.min.apply(this, arguments);
            var bottomRight = Point.max.apply(this, arguments);
            var size = new Size(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            return new Rect(topLeft, size);
        };
        Rect.union = function (a, b) {
            return Rect.fromPoints(Point.min(a.topLeft(), b.topLeft()), Point.max(a.bottomRight(), b.bottomRight()));
        };
        Rect.intersect = function (a, b) {
            a = {
                left: a.topLeft().x,
                top: a.topLeft().y,
                right: a.bottomRight().x,
                bottom: a.bottomRight().y
            };
            b = {
                left: b.topLeft().x,
                top: b.topLeft().y,
                right: b.bottomRight().x,
                bottom: b.bottomRight().y
            };
            if (a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom) {
                return Rect.fromPoints(new Point(math.max(a.left, b.left), math.max(a.top, b.top)), new Point(math.min(a.right, b.right), math.min(a.bottom, b.bottom)));
            }
        };
        var Circle = Class.extend({
            init: function (center, radius) {
                this.setCenter(center || new Point());
                this.setRadius(radius || 0);
            },
            setCenter: function (value) {
                this._observerField('center', Point.create(value));
                this.geometryChange();
                return this;
            },
            getCenter: function () {
                return this.center;
            },
            equals: function (other) {
                return other && other.center.equals(this.center) && other.radius === this.radius;
            },
            clone: function () {
                return new Circle(this.center.clone(), this.radius);
            },
            pointAt: function (angle) {
                return this._pointAt(rad(angle));
            },
            bbox: function (matrix) {
                var minPoint = Point.maxPoint();
                var maxPoint = Point.minPoint();
                var extremeAngles = ellipseExtremeAngles(this.center, this.radius, this.radius, matrix);
                for (var i = 0; i < 4; i++) {
                    var currentPointX = this._pointAt(extremeAngles.x + i * PI_DIV_2).transformCopy(matrix);
                    var currentPointY = this._pointAt(extremeAngles.y + i * PI_DIV_2).transformCopy(matrix);
                    var currentPoint = new Point(currentPointX.x, currentPointY.y);
                    minPoint = Point.min(minPoint, currentPoint);
                    maxPoint = Point.max(maxPoint, currentPoint);
                }
                return Rect.fromPoints(minPoint, maxPoint);
            },
            _pointAt: function (angle) {
                var c = this.center;
                var r = this.radius;
                return new Point(c.x - r * math.cos(angle), c.y - r * math.sin(angle));
            },
            containsPoint: function (point) {
                var center = this.center;
                var inCircle = math.pow(point.x - center.x, 2) + math.pow(point.y - center.y, 2) <= math.pow(this.radius, 2);
                return inCircle;
            },
            _isOnPath: function (point, width) {
                var center = this.center;
                var radius = this.radius;
                var pointDistance = center.distanceTo(point);
                return radius - width <= pointDistance && pointDistance <= radius + width;
            }
        });
        defineAccessors(Circle.fn, ['radius']);
        deepExtend(Circle.fn, ObserversMixin);
        var Arc = Class.extend({
            init: function (center, options) {
                this.setCenter(center || new Point());
                options = options || {};
                this.radiusX = options.radiusX;
                this.radiusY = options.radiusY || options.radiusX;
                this.startAngle = options.startAngle;
                this.endAngle = options.endAngle;
                this.anticlockwise = options.anticlockwise || false;
            },
            clone: function () {
                return new Arc(this.center, {
                    radiusX: this.radiusX,
                    radiusY: this.radiusY,
                    startAngle: this.startAngle,
                    endAngle: this.endAngle,
                    anticlockwise: this.anticlockwise
                });
            },
            setCenter: function (value) {
                this._observerField('center', Point.create(value));
                this.geometryChange();
                return this;
            },
            getCenter: function () {
                return this.center;
            },
            MAX_INTERVAL: 45,
            pointAt: function (angle) {
                var center = this.center;
                var radian = rad(angle);
                return new Point(center.x + this.radiusX * math.cos(radian), center.y + this.radiusY * math.sin(radian));
            },
            curvePoints: function () {
                var startAngle = this.startAngle;
                var dir = this.anticlockwise ? -1 : 1;
                var curvePoints = [this.pointAt(startAngle)];
                var currentAngle = startAngle;
                var interval = this._arcInterval();
                var intervalAngle = interval.endAngle - interval.startAngle;
                var subIntervalsCount = math.ceil(intervalAngle / this.MAX_INTERVAL);
                var subIntervalAngle = intervalAngle / subIntervalsCount;
                for (var i = 1; i <= subIntervalsCount; i++) {
                    var nextAngle = currentAngle + dir * subIntervalAngle;
                    var points = this._intervalCurvePoints(currentAngle, nextAngle);
                    curvePoints.push(points.cp1, points.cp2, points.p2);
                    currentAngle = nextAngle;
                }
                return curvePoints;
            },
            bbox: function (matrix) {
                var arc = this;
                var interval = arc._arcInterval();
                var startAngle = interval.startAngle;
                var endAngle = interval.endAngle;
                var extremeAngles = ellipseExtremeAngles(this.center, this.radiusX, this.radiusY, matrix);
                var extremeX = deg(extremeAngles.x);
                var extremeY = deg(extremeAngles.y);
                var currentPoint = arc.pointAt(startAngle).transformCopy(matrix);
                var endPoint = arc.pointAt(endAngle).transformCopy(matrix);
                var minPoint = Point.min(currentPoint, endPoint);
                var maxPoint = Point.max(currentPoint, endPoint);
                var currentAngleX = bboxStartAngle(extremeX, startAngle);
                var currentAngleY = bboxStartAngle(extremeY, startAngle);
                while (currentAngleX < endAngle || currentAngleY < endAngle) {
                    var currentPointX;
                    if (currentAngleX < endAngle) {
                        currentPointX = arc.pointAt(currentAngleX).transformCopy(matrix);
                        currentAngleX += 90;
                    }
                    var currentPointY;
                    if (currentAngleY < endAngle) {
                        currentPointY = arc.pointAt(currentAngleY).transformCopy(matrix);
                        currentAngleY += 90;
                    }
                    currentPoint = new Point(currentPointX.x, currentPointY.y);
                    minPoint = Point.min(minPoint, currentPoint);
                    maxPoint = Point.max(maxPoint, currentPoint);
                }
                return Rect.fromPoints(minPoint, maxPoint);
            },
            _arcInterval: function () {
                var startAngle = this.startAngle;
                var endAngle = this.endAngle;
                var anticlockwise = this.anticlockwise;
                if (anticlockwise) {
                    var oldStart = startAngle;
                    startAngle = endAngle;
                    endAngle = oldStart;
                }
                if (startAngle > endAngle || anticlockwise && startAngle === endAngle) {
                    endAngle += 360;
                }
                return {
                    startAngle: startAngle,
                    endAngle: endAngle
                };
            },
            _intervalCurvePoints: function (startAngle, endAngle) {
                var arc = this;
                var p1 = arc.pointAt(startAngle);
                var p2 = arc.pointAt(endAngle);
                var p1Derivative = arc._derivativeAt(startAngle);
                var p2Derivative = arc._derivativeAt(endAngle);
                var t = (rad(endAngle) - rad(startAngle)) / 3;
                var cp1 = new Point(p1.x + t * p1Derivative.x, p1.y + t * p1Derivative.y);
                var cp2 = new Point(p2.x - t * p2Derivative.x, p2.y - t * p2Derivative.y);
                return {
                    p1: p1,
                    cp1: cp1,
                    cp2: cp2,
                    p2: p2
                };
            },
            _derivativeAt: function (angle) {
                var arc = this;
                var radian = rad(angle);
                return new Point(-arc.radiusX * math.sin(radian), arc.radiusY * math.cos(radian));
            },
            containsPoint: function (point) {
                var interval = this._arcInterval();
                var intervalAngle = interval.endAngle - interval.startAngle;
                var center = this.center;
                var distance = center.distanceTo(point);
                var angleRad = math.atan2(point.y - center.y, point.x - center.x);
                var pointRadius = this.radiusX * this.radiusY / math.sqrt(math.pow(this.radiusX, 2) * math.pow(math.sin(angleRad), 2) + math.pow(this.radiusY, 2) * math.pow(math.cos(angleRad), 2));
                var startPoint = this.pointAt(this.startAngle).round(PRECISION);
                var endPoint = this.pointAt(this.endAngle).round(PRECISION);
                var intersection = lineIntersection(center, point.round(PRECISION), startPoint, endPoint);
                var containsPoint;
                if (intervalAngle < 180) {
                    containsPoint = intersection && closeOrLess(center.distanceTo(intersection), distance) && closeOrLess(distance, pointRadius);
                } else {
                    var angle = calculateAngle(center.x, center.y, this.radiusX, this.radiusY, point.x, point.y);
                    if (angle != 360) {
                        angle = (360 + angle) % 360;
                    }
                    var inAngleRange = interval.startAngle <= angle && angle <= interval.endAngle;
                    containsPoint = inAngleRange && closeOrLess(distance, pointRadius) || !inAngleRange && (!intersection || intersection.equals(point));
                }
                return containsPoint;
            },
            _isOnPath: function (point, width) {
                var interval = this._arcInterval();
                var center = this.center;
                var angle = calculateAngle(center.x, center.y, this.radiusX, this.radiusY, point.x, point.y);
                if (angle != 360) {
                    angle = (360 + angle) % 360;
                }
                var inAngleRange = interval.startAngle <= angle && angle <= interval.endAngle;
                return inAngleRange && this.pointAt(angle).distanceTo(point) <= width;
            }
        });
        defineAccessors(Arc.fn, [
            'radiusX',
            'radiusY',
            'startAngle',
            'endAngle',
            'anticlockwise'
        ]);
        deepExtend(Arc.fn, ObserversMixin);
        Arc.fromPoints = function (start, end, rx, ry, largeArc, swipe) {
            var arcParameters = normalizeArcParameters(start.x, start.y, end.x, end.y, rx, ry, largeArc, swipe);
            return new Arc(arcParameters.center, {
                startAngle: arcParameters.startAngle,
                endAngle: arcParameters.endAngle,
                radiusX: rx,
                radiusY: ry,
                anticlockwise: swipe === 0
            });
        };
        var Matrix = Class.extend({
            init: function (a, b, c, d, e, f) {
                this.a = a || 0;
                this.b = b || 0;
                this.c = c || 0;
                this.d = d || 0;
                this.e = e || 0;
                this.f = f || 0;
            },
            multiplyCopy: function (m) {
                return new Matrix(this.a * m.a + this.c * m.b, this.b * m.a + this.d * m.b, this.a * m.c + this.c * m.d, this.b * m.c + this.d * m.d, this.a * m.e + this.c * m.f + this.e, this.b * m.e + this.d * m.f + this.f);
            },
            invert: function () {
                var a = this.a, b = this.b;
                var d = this.c, e = this.d;
                var g = this.e, h = this.f;
                var det = a * e - b * d;
                if (det === 0) {
                    return null;
                }
                return new Matrix(e / det, -b / det, -d / det, a / det, (d * h - e * g) / det, (b * g - a * h) / det);
            },
            clone: function () {
                return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
            },
            equals: function (other) {
                if (!other) {
                    return false;
                }
                return this.a === other.a && this.b === other.b && this.c === other.c && this.d === other.d && this.e === other.e && this.f === other.f;
            },
            round: function (precision) {
                this.a = round(this.a, precision);
                this.b = round(this.b, precision);
                this.c = round(this.c, precision);
                this.d = round(this.d, precision);
                this.e = round(this.e, precision);
                this.f = round(this.f, precision);
                return this;
            },
            toArray: function (precision) {
                var arr = [
                    this.a,
                    this.b,
                    this.c,
                    this.d,
                    this.e,
                    this.f
                ];
                if (defined(precision)) {
                    for (var i = 0; i < arr.length; i++) {
                        arr[i] = round(arr[i], precision);
                    }
                }
                return arr;
            }
        });
        Matrix.fn.toString = function (precision, separator) {
            return this.toArray(precision).join(separator || ',');
        };
        Matrix.translate = function (x, y) {
            return new Matrix(1, 0, 0, 1, x, y);
        };
        Matrix.unit = function () {
            return new Matrix(1, 0, 0, 1, 0, 0);
        };
        Matrix.rotate = function (angle, x, y) {
            var m = new Matrix();
            m.a = math.cos(rad(angle));
            m.b = math.sin(rad(angle));
            m.c = -m.b;
            m.d = m.a;
            m.e = x - x * m.a + y * m.b || 0;
            m.f = y - y * m.a - x * m.b || 0;
            return m;
        };
        Matrix.scale = function (scaleX, scaleY) {
            return new Matrix(scaleX, 0, 0, scaleY, 0, 0);
        };
        Matrix.IDENTITY = Matrix.unit();
        var Transformation = Class.extend({
            init: function (matrix) {
                this._matrix = matrix || Matrix.unit();
            },
            clone: function () {
                return new Transformation(this._matrix.clone());
            },
            equals: function (other) {
                return other && other._matrix.equals(this._matrix);
            },
            _optionsChange: function () {
                this.optionsChange({
                    field: 'transform',
                    value: this
                });
            },
            translate: function (x, y) {
                this._matrix = this._matrix.multiplyCopy(Matrix.translate(x, y));
                this._optionsChange();
                return this;
            },
            scale: function (scaleX, scaleY, origin) {
                if (!defined(scaleY)) {
                    scaleY = scaleX;
                }
                if (origin) {
                    origin = Point.create(origin);
                    this._matrix = this._matrix.multiplyCopy(Matrix.translate(origin.x, origin.y));
                }
                this._matrix = this._matrix.multiplyCopy(Matrix.scale(scaleX, scaleY));
                if (origin) {
                    this._matrix = this._matrix.multiplyCopy(Matrix.translate(-origin.x, -origin.y));
                }
                this._optionsChange();
                return this;
            },
            rotate: function (angle, origin) {
                origin = Point.create(origin) || Point.ZERO;
                this._matrix = this._matrix.multiplyCopy(Matrix.rotate(angle, origin.x, origin.y));
                this._optionsChange();
                return this;
            },
            multiply: function (transformation) {
                var matrix = toMatrix(transformation);
                this._matrix = this._matrix.multiplyCopy(matrix);
                this._optionsChange();
                return this;
            },
            matrix: function (matrix) {
                if (matrix) {
                    this._matrix = matrix;
                    this._optionsChange();
                    return this;
                } else {
                    return this._matrix;
                }
            }
        });
        deepExtend(Transformation.fn, ObserversMixin);
        function transform(matrix) {
            if (matrix === null) {
                return null;
            }
            if (matrix instanceof Transformation) {
                return matrix;
            }
            return new Transformation(matrix);
        }
        function toMatrix(value) {
            if (value && kendo.isFunction(value.matrix)) {
                return value.matrix();
            }
            return value;
        }
        function ellipseExtremeAngles(center, rx, ry, matrix) {
            var extremeX = 0, extremeY = 0;
            if (matrix) {
                extremeX = math.atan2(matrix.c * ry, matrix.a * rx);
                if (matrix.b !== 0) {
                    extremeY = math.atan2(matrix.d * ry, matrix.b * rx);
                }
            }
            return {
                x: extremeX,
                y: extremeY
            };
        }
        function bboxStartAngle(angle, start) {
            while (angle < start) {
                angle += 90;
            }
            return angle;
        }
        function defineAccessors(fn, fields) {
            for (var i = 0; i < fields.length; i++) {
                var name = fields[i];
                var capitalized = name.charAt(0).toUpperCase() + name.substring(1, name.length);
                fn['set' + capitalized] = setAccessor(name);
                fn['get' + capitalized] = getAccessor(name);
            }
        }
        function setAccessor(field) {
            return function (value) {
                if (this[field] !== value) {
                    this[field] = value;
                    this.geometryChange();
                }
                return this;
            };
        }
        function getAccessor(field) {
            return function () {
                return this[field];
            };
        }
        function elipseAngle(start, end, swipe) {
            if (start > end) {
                end += 360;
            }
            var alpha = math.abs(end - start);
            if (!swipe) {
                alpha = 360 - alpha;
            }
            return alpha;
        }
        function calculateAngle(cx, cy, rx, ry, x, y) {
            var cos = round((x - cx) / rx, 3);
            var sin = round((y - cy) / ry, 3);
            return round(deg(math.atan2(sin, cos)));
        }
        function normalizeArcParameters(x1, y1, x2, y2, rx, ry, largeArc, swipe) {
            var cx, cy;
            var cx1, cy1;
            var a, b, c, sqrt;
            if (y1 !== y2) {
                var x21 = x2 - x1;
                var y21 = y2 - y1;
                var rx2 = pow(rx, 2), ry2 = pow(ry, 2);
                var k = (ry2 * x21 * (x1 + x2) + rx2 * y21 * (y1 + y2)) / (2 * rx2 * y21);
                var yk2 = k - y2;
                var l = -(x21 * ry2) / (rx2 * y21);
                a = 1 / rx2 + pow(l, 2) / ry2;
                b = 2 * (l * yk2 / ry2 - x2 / rx2);
                c = pow(x2, 2) / rx2 + pow(yk2, 2) / ry2 - 1;
                sqrt = math.sqrt(pow(b, 2) - 4 * a * c);
                cx = (-b - sqrt) / (2 * a);
                cy = k + l * cx;
                cx1 = (-b + sqrt) / (2 * a);
                cy1 = k + l * cx1;
            } else if (x1 !== x2) {
                b = -2 * y2;
                c = pow((x2 - x1) * ry / (2 * rx), 2) + pow(y2, 2) - pow(ry, 2);
                sqrt = math.sqrt(pow(b, 2) - 4 * c);
                cx = cx1 = (x1 + x2) / 2;
                cy = (-b - sqrt) / 2;
                cy1 = (-b + sqrt) / 2;
            } else {
                return false;
            }
            var start = calculateAngle(cx, cy, rx, ry, x1, y1);
            var end = calculateAngle(cx, cy, rx, ry, x2, y2);
            var alpha = elipseAngle(start, end, swipe);
            if (largeArc && alpha <= 180 || !largeArc && alpha > 180) {
                cx = cx1;
                cy = cy1;
                start = calculateAngle(cx, cy, rx, ry, x1, y1);
                end = calculateAngle(cx, cy, rx, ry, x2, y2);
            }
            return {
                center: new Point(cx, cy),
                startAngle: start,
                endAngle: end
            };
        }
        var ComplexNumber = function (real, img) {
            this.real = real || 0;
            this.img = img || 0;
        };
        ComplexNumber.fn = ComplexNumber.prototype = {
            add: function (cNumber) {
                return new ComplexNumber(round(this.real + cNumber.real, PRECISION), round(this.img + cNumber.img, PRECISION));
            },
            addConstant: function (value) {
                return new ComplexNumber(this.real + value, this.img);
            },
            negate: function () {
                return new ComplexNumber(-this.real, -this.img);
            },
            multiply: function (cNumber) {
                return new ComplexNumber(this.real * cNumber.real - this.img * cNumber.img, this.real * cNumber.img + this.img * cNumber.real);
            },
            multiplyConstant: function (value) {
                return new ComplexNumber(this.real * value, this.img * value);
            },
            nthRoot: function (n) {
                var rad = math.atan2(this.img, this.real), r = math.sqrt(math.pow(this.img, 2) + math.pow(this.real, 2)), nthR = math.pow(r, 1 / n);
                return new ComplexNumber(nthR * math.cos(rad / n), nthR * math.sin(rad / n));
            },
            equals: function (cNumber) {
                return this.real === cNumber.real && this.img === cNumber.img;
            },
            isReal: function () {
                return this.img === 0;
            }
        };
        function solveCubic(a, b, c, d) {
            if (a === 0) {
                return solveQuadratic(b, c, d);
            }
            var p = (3 * a * c - math.pow(b, 2)) / (3 * math.pow(a, 2)), q = (2 * math.pow(b, 3) - 9 * a * b * c + 27 * math.pow(a, 2) * d) / (27 * math.pow(a, 3)), Q = math.pow(p / 3, 3) + math.pow(q / 2, 2), i = new ComplexNumber(0, 1), b3a = -b / (3 * a), x1, x2, y1, y2, y3, result = [], z1, z2;
            if (Q < 0) {
                x1 = new ComplexNumber(-q / 2, math.sqrt(-Q)).nthRoot(3);
                x2 = new ComplexNumber(-q / 2, -math.sqrt(-Q)).nthRoot(3);
            } else {
                x1 = -q / 2 + math.sqrt(Q);
                x1 = new ComplexNumber(numberSign(x1) * math.pow(math.abs(x1), 1 / 3));
                x2 = -q / 2 - math.sqrt(Q);
                x2 = new ComplexNumber(numberSign(x2) * math.pow(math.abs(x2), 1 / 3));
            }
            y1 = x1.add(x2);
            z1 = x1.add(x2).multiplyConstant(-1 / 2);
            z2 = x1.add(x2.negate()).multiplyConstant(math.sqrt(3) / 2);
            y2 = z1.add(i.multiply(z2));
            y3 = z1.add(i.negate().multiply(z2));
            if (y1.isReal()) {
                result.push(round(y1.real + b3a, PRECISION));
            }
            if (y2.isReal()) {
                result.push(round(y2.real + b3a, PRECISION));
            }
            if (y3.isReal()) {
                result.push(round(y3.real + b3a, PRECISION));
            }
            return result;
        }
        function toCubicPolynomial(points, field) {
            return [
                -points[0][field] + 3 * points[1][field] - 3 * points[2][field] + points[3][field],
                3 * (points[0][field] - 2 * points[1][field] + points[2][field]),
                3 * (-points[0][field] + points[1][field]),
                points[0][field]
            ];
        }
        function calculateCurveAt(t, field, points) {
            var t1 = 1 - t;
            return math.pow(t1, 3) * points[0][field] + 3 * math.pow(t1, 2) * t * points[1][field] + 3 * math.pow(t, 2) * t1 * points[2][field] + math.pow(t, 3) * points[3][field];
        }
        function curveIntersectionsCount(points, point, bbox) {
            var polynomial = toCubicPolynomial(points, 'x');
            var roots = solveCubic(polynomial[0], polynomial[1], polynomial[2], polynomial[3] - point.x);
            var count = 0;
            var rayIntersection;
            var intersectsRay;
            for (var i = 0; i < roots.length; i++) {
                rayIntersection = calculateCurveAt(roots[i], 'y', points);
                intersectsRay = close(rayIntersection, point.y) || rayIntersection > point.y;
                if (intersectsRay && ((roots[i] === 0 || roots[i] === 1) && bbox.bottomRight().x > point.x || 0 < roots[i] && roots[i] < 1)) {
                    count++;
                }
            }
            return count;
        }
        function lineIntersectionsCount(a, b, point) {
            var intersects;
            if (a.x != b.x) {
                var minX = math.min(a.x, b.x), maxX = math.max(a.x, b.x), minY = math.min(a.y, b.y), maxY = math.max(a.y, b.y), inRange = minX <= point.x && point.x < maxX;
                if (minY == maxY) {
                    intersects = point.y <= minY && inRange;
                } else {
                    intersects = inRange && (maxY - minY) * ((a.x - b.x) * (a.y - b.y) > 0 ? point.x - minX : maxX - point.x) / (maxX - minX) + minY - point.y >= 0;
                }
            }
            return intersects ? 1 : 0;
        }
        function lineIntersection(p0, p1, p2, p3) {
            var s1x = p1.x - p0.x;
            var s2x = p3.x - p2.x;
            var s1y = p1.y - p0.y;
            var s2y = p3.y - p2.y;
            var nx = p0.x - p2.x;
            var ny = p0.y - p2.y;
            var d = s1x * s2y - s2x * s1y;
            var s = (s1x * ny - s1y * nx) / d;
            var t = (s2x * ny - s2y * nx) / d;
            if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
                return new Point(p0.x + t * s1x, p0.y + t * s1y);
            }
        }
        function close(a, b, tolerance) {
            return round(math.abs(a - b), tolerance || PRECISION) === 0;
        }
        function closeOrLess(a, b, tolerance) {
            return a < b || close(a, b, tolerance);
        }
        function numberSign(x) {
            return x < 0 ? -1 : 1;
        }
        function isOutOfEndPoint(endPoint, controlPoint, point) {
            var angle = util.deg(math.atan2(controlPoint.y - endPoint.y, controlPoint.x - endPoint.x));
            var rotatedPoint = point.transformCopy(transform().rotate(-angle, endPoint));
            return rotatedPoint.x < endPoint.x;
        }
        function hasRootsInRange(points, point, field, rootField, range) {
            var polynomial = toCubicPolynomial(points, rootField);
            var roots = solveCubic(polynomial[0], polynomial[1], polynomial[2], polynomial[3] - point[rootField]);
            var intersection;
            for (var idx = 0; idx < roots.length; idx++) {
                if (0 <= roots[idx] && roots[idx] <= 1) {
                    intersection = calculateCurveAt(roots[idx], field, points);
                    if (math.abs(intersection - point[field]) <= range) {
                        return true;
                    }
                }
            }
        }
        function solveQuadratic(a, b, c) {
            var squareRoot = math.sqrt(math.pow(b, 2) - 4 * a * c);
            return [
                (-b + squareRoot) / (2 * a),
                (-b - squareRoot) / (2 * a)
            ];
        }
        deepExtend(kendo, {
            geometry: {
                Arc: Arc,
                Circle: Circle,
                curveIntersectionsCount: curveIntersectionsCount,
                lineIntersectionsCount: lineIntersectionsCount,
                Matrix: Matrix,
                Point: Point,
                Rect: Rect,
                Size: Size,
                Transformation: Transformation,
                transform: transform,
                toMatrix: toMatrix,
                isOutOfEndPoint: isOutOfEndPoint,
                hasRootsInRange: hasRootsInRange
            }
        });
        kendo.dataviz.geometry = kendo.geometry;
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/core', [
        'drawing/geometry',
        'kendo.popup'
    ], f);
}(function () {
    (function ($) {
        var noop = $.noop, toString = Object.prototype.toString, kendo = window.kendo, outerWidth = kendo._outerWidth, outerHeight = kendo._outerHeight, Class = kendo.Class, Widget = kendo.ui.Widget, deepExtend = kendo.deepExtend, util = kendo.util, defined = util.defined, limitValue = util.limitValue, g = kendo.geometry, proxy = $.proxy, NS = '.kendo', TOOLTIP_TEMPLATE = '<div class="k-tooltip">' + '<div class="k-tooltip-content"></div>' + '</div>', TOOLTIP_CLOSE_TEMPLATE = '<div class="k-tooltip-button"><a href="\\#" class="k-icon k-i-close">close</a></div>';
        var Surface = Widget.extend({
            init: function (element, options) {
                this.options = deepExtend({}, this.options, options);
                Widget.fn.init.call(this, element, this.options);
                this._click = this._handler('click');
                this._mouseenter = this._handler('mouseenter');
                this._mouseleave = this._handler('mouseleave');
                this._mousemove = this._handler('mousemove');
                this._visual = new kendo.drawing.Group();
                if (this.options.width) {
                    this.element.css('width', this.options.width);
                }
                if (this.options.height) {
                    this.element.css('height', this.options.height);
                }
                this._enableTracking();
            },
            options: {
                name: 'Surface',
                tooltip: {}
            },
            events: [
                'click',
                'mouseenter',
                'mouseleave',
                'mousemove',
                'resize',
                'tooltipOpen',
                'tooltipClose'
            ],
            draw: function (element) {
                this._visual.children.push(element);
            },
            clear: function () {
                this._visual.children = [];
                this.hideTooltip();
            },
            destroy: function () {
                this._visual = null;
                if (this._tooltip) {
                    this._tooltip.destroy();
                    delete this._tooltip;
                }
                Widget.fn.destroy.call(this);
            },
            exportVisual: function () {
                return this._visual;
            },
            getSize: function () {
                return {
                    width: this.element.width(),
                    height: this.element.height()
                };
            },
            setSize: function (size) {
                this.element.css({
                    width: size.width,
                    height: size.height
                });
                this._size = size;
                this._resize();
            },
            eventTarget: function (e) {
                var domNode = $(e.touch ? e.touch.initialTouch : e.target);
                var node;
                while (!node && domNode.length > 0) {
                    node = domNode[0]._kendoNode;
                    if (domNode.is(this.element) || domNode.length === 0) {
                        break;
                    }
                    domNode = domNode.parent();
                }
                if (node) {
                    return node.srcElement;
                }
            },
            showTooltip: function (shape, options) {
                if (this._tooltip) {
                    this._tooltip.show(shape, options);
                }
            },
            hideTooltip: function () {
                if (this._tooltip) {
                    this._tooltip.hide();
                }
            },
            suspendTracking: function () {
                this._suspendedTracking = true;
                this.hideTooltip();
            },
            resumeTracking: function () {
                this._suspendedTracking = false;
            },
            _resize: noop,
            _handler: function (event) {
                var surface = this;
                return function (e) {
                    var node = surface.eventTarget(e);
                    if (node && !surface._suspendedTracking) {
                        surface.trigger(event, {
                            element: node,
                            originalEvent: e,
                            type: event
                        });
                    }
                };
            },
            _enableTracking: function () {
                if (kendo.ui.Popup) {
                    this._tooltip = new SurfaceTooltip(this, this.options.tooltip || {});
                }
            },
            _elementOffset: function () {
                var element = this.element;
                var offset = element.offset();
                var paddingLeft = parseInt(element.css('paddingLeft'), 10);
                var paddingTop = parseInt(element.css('paddingTop'), 10);
                return {
                    left: offset.left + paddingLeft,
                    top: offset.top + paddingTop
                };
            },
            _surfacePoint: function (event) {
                var offset = this._elementOffset();
                var coord = eventCoordinates(event);
                var x = coord.x - offset.left;
                var y = coord.y - offset.top;
                return new g.Point(x, y);
            }
        });
        kendo.ui.plugin(Surface);
        Surface.create = function (element, options) {
            return SurfaceFactory.current.create(element, options);
        };
        var BaseNode = Class.extend({
            init: function (srcElement) {
                this.childNodes = [];
                this.parent = null;
                if (srcElement) {
                    this.srcElement = srcElement;
                    this.observe();
                }
            },
            destroy: function () {
                if (this.srcElement) {
                    this.srcElement.removeObserver(this);
                }
                var children = this.childNodes;
                for (var i = 0; i < children.length; i++) {
                    this.childNodes[i].destroy();
                }
                this.parent = null;
            },
            load: noop,
            observe: function () {
                if (this.srcElement) {
                    this.srcElement.addObserver(this);
                }
            },
            append: function (node) {
                this.childNodes.push(node);
                node.parent = this;
            },
            insertAt: function (node, pos) {
                this.childNodes.splice(pos, 0, node);
                node.parent = this;
            },
            remove: function (index, count) {
                var end = index + count;
                for (var i = index; i < end; i++) {
                    this.childNodes[i].removeSelf();
                }
                this.childNodes.splice(index, count);
            },
            removeSelf: function () {
                this.clear();
                this.destroy();
            },
            clear: function () {
                this.remove(0, this.childNodes.length);
            },
            invalidate: function () {
                if (this.parent) {
                    this.parent.invalidate();
                }
            },
            geometryChange: function () {
                this.invalidate();
            },
            optionsChange: function () {
                this.invalidate();
            },
            childrenChange: function (e) {
                if (e.action === 'add') {
                    this.load(e.items, e.index);
                } else if (e.action === 'remove') {
                    this.remove(e.index, e.items.length);
                }
                this.invalidate();
            }
        });
        var OptionsStore = Class.extend({
            init: function (options, prefix) {
                var field, member;
                this.prefix = prefix || '';
                for (field in options) {
                    member = options[field];
                    member = this._wrap(member, field);
                    this[field] = member;
                }
            },
            get: function (field) {
                return kendo.getter(field, true)(this);
            },
            set: function (field, value) {
                var current = kendo.getter(field, true)(this);
                if (current !== value) {
                    var composite = this._set(field, this._wrap(value, field));
                    if (!composite) {
                        this.optionsChange({
                            field: this.prefix + field,
                            value: value
                        });
                    }
                }
            },
            _set: function (field, value) {
                var composite = field.indexOf('.') >= 0;
                if (composite) {
                    var parts = field.split('.'), path = '', obj;
                    while (parts.length > 1) {
                        path += parts.shift();
                        obj = kendo.getter(path, true)(this);
                        if (!obj) {
                            obj = new OptionsStore({}, path + '.');
                            obj.addObserver(this);
                            this[path] = obj;
                        }
                        if (obj instanceof OptionsStore) {
                            obj.set(parts.join('.'), value);
                            return composite;
                        }
                        path += '.';
                    }
                }
                this._clear(field);
                kendo.setter(field)(this, value);
                return composite;
            },
            _clear: function (field) {
                var current = kendo.getter(field, true)(this);
                if (current && current.removeObserver) {
                    current.removeObserver(this);
                }
            },
            _wrap: function (object, field) {
                var type = toString.call(object);
                if (object !== null && defined(object) && type === '[object Object]') {
                    if (!(object instanceof OptionsStore) && !(object instanceof Class)) {
                        object = new OptionsStore(object, this.prefix + field + '.');
                    }
                    object.addObserver(this);
                }
                return object;
            }
        });
        deepExtend(OptionsStore.fn, kendo.mixins.ObserversMixin);
        var SurfaceFactory = function () {
            this._items = [];
        };
        SurfaceFactory.prototype = {
            register: function (name, type, order) {
                var items = this._items, first = items[0], entry = {
                        name: name,
                        type: type,
                        order: order
                    };
                if (!first || order < first.order) {
                    items.unshift(entry);
                } else {
                    items.push(entry);
                }
            },
            create: function (element, options) {
                var items = this._items, match = items[0];
                if (options && options.type) {
                    var preferred = options.type.toLowerCase();
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name === preferred) {
                            match = items[i];
                            break;
                        }
                    }
                }
                if (match) {
                    return new match.type(element, options);
                }
                kendo.logToConsole('Warning: Unable to create Kendo UI Drawing Surface. Possible causes:\n' + '- The browser does not support SVG, VML and Canvas. User agent: ' + navigator.userAgent + '\n' + '- The Kendo UI scripts are not fully loaded');
            }
        };
        SurfaceFactory.current = new SurfaceFactory();
        var SurfaceTooltip = Class.extend({
            init: function (surface, options) {
                this.element = $(TOOLTIP_TEMPLATE);
                this.content = this.element.children('.k-tooltip-content');
                options = options || {};
                this.options = deepExtend({}, this.options, this._tooltipOptions(options));
                this.popup = new kendo.ui.Popup(this.element, {
                    appendTo: options.appendTo,
                    animation: options.animation,
                    copyAnchorStyles: false,
                    collision: 'fit fit'
                });
                this._openPopupHandler = $.proxy(this._openPopup, this);
                this.surface = surface;
                this._bindEvents();
            },
            options: {
                position: 'top',
                showOn: 'mouseenter',
                offset: 7,
                autoHide: true,
                hideDelay: 0,
                showAfter: 100
            },
            _bindEvents: function () {
                this._showHandler = proxy(this._showEvent, this);
                this._surfaceLeaveHandler = proxy(this._surfaceLeave, this);
                this._mouseleaveHandler = proxy(this._mouseleave, this);
                this._mousemoveHandler = proxy(this._mousemove, this);
                this.surface.bind('click', this._showHandler);
                this.surface.bind('mouseenter', this._showHandler);
                this.surface.bind('mouseleave', this._mouseleaveHandler);
                this.surface.bind('mousemove', this._mousemoveHandler);
                this.surface.element.on('mouseleave' + NS, this._surfaceLeaveHandler);
                this.element.on('click' + NS, '.k-tooltip-button', proxy(this._hideClick, this));
            },
            destroy: function () {
                var popup = this.popup;
                this.surface.unbind('click', this._showHandler);
                this.surface.unbind('mouseenter', this._showHandler);
                this.surface.unbind('mouseleave', this._mouseleaveHandler);
                this.surface.unbind('mousemove', this._mousemoveHandler);
                this.surface.element.off('mouseleave' + NS, this._surfaceLeaveHandler);
                this.element.off('click' + NS);
                if (popup) {
                    popup.destroy();
                    delete this.popup;
                }
                clearTimeout(this._timeout);
                delete this.popup;
                delete this.element;
                delete this.content;
                delete this.surface;
            },
            _tooltipOptions: function (options) {
                options = options || {};
                return {
                    position: options.position,
                    showOn: options.showOn,
                    offset: options.offset,
                    autoHide: options.autoHide,
                    width: options.width,
                    height: options.height,
                    content: options.content,
                    shared: options.shared,
                    hideDelay: options.hideDelay,
                    showAfter: options.showAfter
                };
            },
            _tooltipShape: function (shape) {
                while (shape && !shape.options.tooltip) {
                    shape = shape.parent;
                }
                return shape;
            },
            _updateContent: function (target, shape, options) {
                var content = options.content;
                if (kendo.isFunction(content)) {
                    content = content({
                        element: shape,
                        target: target
                    });
                }
                if (content) {
                    this.content.html(content);
                    return true;
                }
            },
            _position: function (shape, options, elementSize, event) {
                var position = options.position;
                var tooltipOffset = options.offset || 0;
                var surface = this.surface;
                var offset = surface._elementOffset();
                var size = surface.getSize();
                var surfaceOffset = surface._offset;
                var bbox = shape.bbox();
                var width = elementSize.width;
                var height = elementSize.height;
                var left = 0, top = 0;
                bbox.origin.translate(offset.left, offset.top);
                if (surfaceOffset) {
                    bbox.origin.translate(-surfaceOffset.x, -surfaceOffset.y);
                }
                if (position == 'cursor' && event) {
                    var coord = eventCoordinates(event);
                    left = coord.x - width / 2;
                    top = coord.y - height - tooltipOffset;
                } else if (position == 'left') {
                    left = bbox.origin.x - width - tooltipOffset;
                    top = bbox.center().y - height / 2;
                } else if (position == 'right') {
                    left = bbox.bottomRight().x + tooltipOffset;
                    top = bbox.center().y - height / 2;
                } else if (position == 'bottom') {
                    left = bbox.center().x - width / 2;
                    top = bbox.bottomRight().y + tooltipOffset;
                } else {
                    left = bbox.center().x - width / 2;
                    top = bbox.origin.y - height - tooltipOffset;
                }
                return {
                    left: limitValue(left, offset.left, offset.left + size.width),
                    top: limitValue(top, offset.top, offset.top + size.height)
                };
            },
            show: function (shape, options) {
                this._show(shape, shape, deepExtend({}, this.options, this._tooltipOptions(shape.options.tooltip), options));
            },
            hide: function () {
                var current = this._current;
                delete this._current;
                clearTimeout(this._showTimeout);
                if (this.popup.visible() && current && !this.surface.trigger('tooltipClose', {
                        element: current.shape,
                        target: current.target,
                        popup: this.popup
                    })) {
                    this.popup.close();
                }
            },
            _hideClick: function (e) {
                e.preventDefault();
                this.hide();
            },
            _show: function (target, shape, options, event, delay) {
                var current = this._current;
                clearTimeout(this._timeout);
                if (current && (current.shape === shape && options.shared || current.target === target)) {
                    return;
                }
                clearTimeout(this._showTimeout);
                if (!this.surface.trigger('tooltipOpen', {
                        element: shape,
                        target: target,
                        popup: this.popup
                    }) && this._updateContent(target, shape, options)) {
                    this._autoHide(options);
                    var elementSize = this._measure(options);
                    var popup = this.popup;
                    if (popup.visible()) {
                        popup.close(true);
                    }
                    this._current = {
                        options: options,
                        elementSize: elementSize,
                        shape: shape,
                        target: target,
                        position: this._position(options.shared ? shape : target, options, elementSize, event)
                    };
                    if (delay) {
                        this._showTimeout = setTimeout(this._openPopupHandler, options.showAfter || 0);
                    } else {
                        this._openPopup();
                    }
                }
            },
            _openPopup: function () {
                var current = this._current;
                var position = current.position;
                this.popup.open(position.left, position.top);
            },
            _autoHide: function (options) {
                if (options.autoHide && this._closeButton) {
                    this.element.removeClass('k-tooltip-closable');
                    this._closeButton.remove();
                    delete this._closeButton;
                }
                if (!options.autoHide && !this._closeButton) {
                    this.element.addClass('k-tooltip-closable');
                    this._closeButton = $(TOOLTIP_CLOSE_TEMPLATE).prependTo(this.element);
                }
            },
            _showEvent: function (e) {
                var shape = this._tooltipShape(e.element);
                if (shape) {
                    var options = deepExtend({}, this.options, this._tooltipOptions(shape.options.tooltip));
                    if (options && options.showOn == e.type) {
                        this._show(e.element, shape, options, e.originalEvent, true);
                    }
                }
            },
            _measure: function (options) {
                var width, height;
                this.element.css({
                    width: 'auto',
                    height: 'auto'
                });
                var visible = this.popup.visible();
                if (!visible) {
                    this.popup.wrapper.show();
                }
                this.element.css({
                    width: defined(options.width) ? options.width : 'auto',
                    height: defined(options.height) ? options.height : 'auto'
                });
                width = outerWidth(this.element);
                height = outerHeight(this.element);
                if (!visible) {
                    this.popup.wrapper.hide();
                }
                return {
                    width: width,
                    height: height
                };
            },
            _mouseleave: function (e) {
                if (!this._popupRelatedTarget(e.originalEvent)) {
                    var tooltip = this;
                    var current = tooltip._current;
                    if (current && current.options.autoHide) {
                        tooltip._timeout = setTimeout(function () {
                            clearTimeout(tooltip._showTimeout);
                            tooltip.hide();
                        }, current.options.hideDelay || 0);
                    }
                }
            },
            _mousemove: function (e) {
                var current = this._current;
                if (current && e.element) {
                    var options = current.options;
                    if (options.position == 'cursor') {
                        var position = this._position(e.element, options, current.elementSize, e.originalEvent);
                        current.position = position;
                        this.popup.wrapper.css({
                            left: position.left,
                            top: position.top
                        });
                    }
                }
            },
            _surfaceLeave: function (e) {
                if (!this._popupRelatedTarget(e)) {
                    clearTimeout(this._showTimeout);
                    this.hide();
                }
            },
            _popupRelatedTarget: function (e) {
                return e.relatedTarget && $(e.relatedTarget).closest(this.popup.wrapper).length;
            }
        });
        function eventCoordinates(event) {
            var x, y;
            if (event.touch) {
                x = event.x.location;
                y = event.y.location;
            } else {
                x = event.pageX || event.clientX || 0;
                y = event.pageY || event.clientY || 0;
            }
            return {
                x: x,
                y: y
            };
        }
        deepExtend(kendo, {
            drawing: {
                DASH_ARRAYS: {
                    dot: [
                        1.5,
                        3.5
                    ],
                    dash: [
                        4,
                        3.5
                    ],
                    longdash: [
                        8,
                        3.5
                    ],
                    dashdot: [
                        3.5,
                        3.5,
                        1.5,
                        3.5
                    ],
                    longdashdot: [
                        8,
                        3.5,
                        1.5,
                        3.5
                    ],
                    longdashdotdot: [
                        8,
                        3.5,
                        1.5,
                        3.5,
                        1.5,
                        3.5
                    ]
                },
                Color: kendo.Color,
                BaseNode: BaseNode,
                OptionsStore: OptionsStore,
                Surface: Surface,
                SurfaceFactory: SurfaceFactory,
                SurfaceTooltip: SurfaceTooltip
            }
        });
        kendo.dataviz.drawing = kendo.drawing;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/mixins', ['drawing/core'], f);
}(function () {
    (function () {
        var kendo = window.kendo, deepExtend = kendo.deepExtend, defined = kendo.util.defined, g = kendo.geometry;
        var GRADIENT = 'gradient';
        var IDENTITY_MATRIX_HASH = g.Matrix.IDENTITY.toString();
        var Paintable = {
            extend: function (proto) {
                proto.fill = this.fill;
                proto.stroke = this.stroke;
            },
            fill: function (color, opacity) {
                var options = this.options;
                if (defined(color)) {
                    if (color && color.nodeType != GRADIENT) {
                        var newFill = { color: color };
                        if (defined(opacity)) {
                            newFill.opacity = opacity;
                        }
                        options.set('fill', newFill);
                    } else {
                        options.set('fill', color);
                    }
                    return this;
                } else {
                    return options.get('fill');
                }
            },
            stroke: function (color, width, opacity) {
                if (defined(color)) {
                    this.options.set('stroke.color', color);
                    if (defined(width)) {
                        this.options.set('stroke.width', width);
                    }
                    if (defined(opacity)) {
                        this.options.set('stroke.opacity', opacity);
                    }
                    return this;
                } else {
                    return this.options.get('stroke');
                }
            }
        };
        var Traversable = {
            extend: function (proto, childrenField) {
                proto.traverse = function (callback) {
                    var children = this[childrenField];
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (child.traverse) {
                            child.traverse(callback);
                        } else {
                            callback(child);
                        }
                    }
                    return this;
                };
            }
        };
        var Measurable = {
            extend: function (proto) {
                proto.bbox = this.bbox;
                proto.geometryChange = this.geometryChange;
            },
            bbox: function (transformation) {
                var combinedMatrix = g.toMatrix(this.currentTransform(transformation));
                var matrixHash = combinedMatrix ? combinedMatrix.toString() : IDENTITY_MATRIX_HASH;
                var bbox;
                if (this._bboxCache && this._matrixHash == matrixHash) {
                    bbox = this._bboxCache.clone();
                } else {
                    bbox = this._bbox(combinedMatrix);
                    this._bboxCache = bbox ? bbox.clone() : null;
                    this._matrixHash = matrixHash;
                }
                var strokeWidth = this.options.get('stroke.width');
                if (strokeWidth && bbox) {
                    bbox.expand(strokeWidth / 2);
                }
                return bbox;
            },
            geometryChange: function () {
                delete this._bboxCache;
                this.trigger('geometryChange', { element: this });
            }
        };
        deepExtend(kendo.drawing, {
            mixins: {
                Paintable: Paintable,
                Traversable: Traversable,
                Measurable: Measurable
            }
        });
    }());
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/shapes', [
        'drawing/core',
        'drawing/mixins',
        'util/text-metrics',
        'mixins/observers'
    ], f);
}(function () {
    (function ($) {
        var kendo = window.kendo, Class = kendo.Class, deepExtend = kendo.deepExtend, g = kendo.geometry, Point = g.Point, Size = g.Size, Matrix = g.Matrix, toMatrix = g.toMatrix, drawing = kendo.drawing, OptionsStore = drawing.OptionsStore, math = Math, pow = math.pow, util = kendo.util, append = util.append, arrayLimits = util.arrayLimits, defined = util.defined, last = util.last, valueOrDefault = util.valueOrDefault, ObserversMixin = kendo.mixins.ObserversMixin, inArray = $.inArray, push = [].push, pop = [].pop, splice = [].splice, shift = [].shift, slice = [].slice, unshift = [].unshift, defId = 1, START = 'start', END = 'end', HORIZONTAL = 'horizontal';
        var Element = Class.extend({
            nodeType: 'Element',
            init: function (options) {
                this._initOptions(options);
            },
            _initOptions: function (options) {
                options = options || {};
                var transform = options.transform;
                var clip = options.clip;
                if (transform) {
                    options.transform = g.transform(transform);
                }
                if (clip && !clip.id) {
                    clip.id = generateDefinitionId();
                }
                this.options = new OptionsStore(options);
                this.options.addObserver(this);
            },
            transform: function (transform) {
                if (defined(transform)) {
                    this.options.set('transform', g.transform(transform));
                } else {
                    return this.options.get('transform');
                }
            },
            parentTransform: function () {
                var element = this, transformation, parentMatrix;
                while (element.parent) {
                    element = element.parent;
                    transformation = element.transform();
                    if (transformation) {
                        parentMatrix = transformation.matrix().multiplyCopy(parentMatrix || Matrix.unit());
                    }
                }
                if (parentMatrix) {
                    return g.transform(parentMatrix);
                }
            },
            currentTransform: function (parentTransform) {
                var elementTransform = this.transform(), elementMatrix = toMatrix(elementTransform), parentMatrix, combinedMatrix;
                if (!defined(parentTransform)) {
                    parentTransform = this.parentTransform();
                }
                parentMatrix = toMatrix(parentTransform);
                if (elementMatrix && parentMatrix) {
                    combinedMatrix = parentMatrix.multiplyCopy(elementMatrix);
                } else {
                    combinedMatrix = elementMatrix || parentMatrix;
                }
                if (combinedMatrix) {
                    return g.transform(combinedMatrix);
                }
            },
            visible: function (visible) {
                if (defined(visible)) {
                    this.options.set('visible', visible);
                    return this;
                } else {
                    return this.options.get('visible') !== false;
                }
            },
            clip: function (clip) {
                var options = this.options;
                if (defined(clip)) {
                    if (clip && !clip.id) {
                        clip.id = generateDefinitionId();
                    }
                    options.set('clip', clip);
                    return this;
                } else {
                    return options.get('clip');
                }
            },
            opacity: function (value) {
                if (defined(value)) {
                    this.options.set('opacity', value);
                    return this;
                } else {
                    return valueOrDefault(this.options.get('opacity'), 1);
                }
            },
            clippedBBox: function (transformation) {
                var box = this._clippedBBox(transformation);
                if (box) {
                    var clip = this.clip();
                    return clip ? g.Rect.intersect(box, clip.bbox(transformation)) : box;
                }
            },
            containsPoint: function (point, parentTransform) {
                if (this.visible()) {
                    var transform = this.currentTransform(parentTransform);
                    if (transform) {
                        point = point.transformCopy(transform.matrix().invert());
                    }
                    return this._hasFill() && this._containsPoint(point) || this._isOnPath && this._hasStroke() && this._isOnPath(point);
                }
                return false;
            },
            _hasFill: function () {
                var fill = this.options.fill;
                return fill && !util.isTransparent(fill.color);
            },
            _hasStroke: function () {
                var stroke = this.options.stroke;
                return stroke && stroke.width > 0 && !util.isTransparent(stroke.color);
            },
            _clippedBBox: function (transformation) {
                return this.bbox(transformation);
            }
        });
        deepExtend(Element.fn, ObserversMixin);
        var ElementsArray = Class.extend({
            init: function (array) {
                array = array || [];
                this.length = 0;
                this._splice(0, array.length, array);
            },
            elements: function (elements) {
                if (elements) {
                    this._splice(0, this.length, elements);
                    this._change();
                    return this;
                } else {
                    return this.slice(0);
                }
            },
            push: function () {
                var elements = arguments;
                var result = push.apply(this, elements);
                this._add(elements);
                return result;
            },
            slice: slice,
            pop: function () {
                var length = this.length;
                var result = pop.apply(this);
                if (length) {
                    this._remove([result]);
                }
                return result;
            },
            splice: function (index, howMany) {
                var elements = slice.call(arguments, 2);
                var result = this._splice(index, howMany, elements);
                this._change();
                return result;
            },
            shift: function () {
                var length = this.length;
                var result = shift.apply(this);
                if (length) {
                    this._remove([result]);
                }
                return result;
            },
            unshift: function () {
                var elements = arguments;
                var result = unshift.apply(this, elements);
                this._add(elements);
                return result;
            },
            indexOf: function (element) {
                var that = this;
                var idx;
                var length;
                for (idx = 0, length = that.length; idx < length; idx++) {
                    if (that[idx] === element) {
                        return idx;
                    }
                }
                return -1;
            },
            _splice: function (index, howMany, elements) {
                var result = splice.apply(this, [
                    index,
                    howMany
                ].concat(elements));
                this._clearObserver(result);
                this._setObserver(elements);
                return result;
            },
            _add: function (elements) {
                this._setObserver(elements);
                this._change();
            },
            _remove: function (elements) {
                this._clearObserver(elements);
                this._change();
            },
            _setObserver: function (elements) {
                for (var idx = 0; idx < elements.length; idx++) {
                    elements[idx].addObserver(this);
                }
            },
            _clearObserver: function (elements) {
                for (var idx = 0; idx < elements.length; idx++) {
                    elements[idx].removeObserver(this);
                }
            },
            _change: function () {
            }
        });
        deepExtend(ElementsArray.fn, ObserversMixin);
        var Group = Element.extend({
            nodeType: 'Group',
            init: function (options) {
                Element.fn.init.call(this, options);
                this.children = [];
            },
            childrenChange: function (action, items, index) {
                this.trigger('childrenChange', {
                    action: action,
                    items: items,
                    index: index
                });
            },
            append: function () {
                append(this.children, arguments);
                this._reparent(arguments, this);
                this.childrenChange('add', arguments);
                return this;
            },
            insert: function (index, element) {
                this.children.splice(index, 0, element);
                element.parent = this;
                this.childrenChange('add', [element], index);
                return this;
            },
            insertAt: function (element, index) {
                return this.insert(index, element);
            },
            remove: function (element) {
                var index = inArray(element, this.children);
                if (index >= 0) {
                    this.children.splice(index, 1);
                    element.parent = null;
                    this.childrenChange('remove', [element], index);
                }
                return this;
            },
            removeAt: function (index) {
                if (0 <= index && index < this.children.length) {
                    var element = this.children[index];
                    this.children.splice(index, 1);
                    element.parent = null;
                    this.childrenChange('remove', [element], index);
                }
                return this;
            },
            clear: function () {
                var items = this.children;
                this.children = [];
                this._reparent(items, null);
                this.childrenChange('remove', items, 0);
                return this;
            },
            bbox: function (transformation) {
                return elementsBoundingBox(this.children, true, this.currentTransform(transformation));
            },
            rawBBox: function () {
                return elementsBoundingBox(this.children, false);
            },
            _clippedBBox: function (transformation) {
                return elementsClippedBoundingBox(this.children, this.currentTransform(transformation));
            },
            currentTransform: function (transformation) {
                return Element.fn.currentTransform.call(this, transformation) || null;
            },
            containsPoint: function (point, parentTransform) {
                if (this.visible()) {
                    var children = this.children;
                    var transform = this.currentTransform(parentTransform);
                    for (var idx = 0; idx < children.length; idx++) {
                        if (children[idx].containsPoint(point, transform)) {
                            return true;
                        }
                    }
                }
                return false;
            },
            _reparent: function (elements, newParent) {
                for (var i = 0; i < elements.length; i++) {
                    var child = elements[i];
                    var parent = child.parent;
                    if (parent && parent != this && parent.remove) {
                        parent.remove(child);
                    }
                    child.parent = newParent;
                }
            }
        });
        drawing.mixins.Traversable.extend(Group.fn, 'children');
        var Text = Element.extend({
            nodeType: 'Text',
            init: function (content, position, options) {
                Element.fn.init.call(this, options);
                this.content(content);
                this.position(position || new g.Point());
                if (!this.options.font) {
                    this.options.font = '12px sans-serif';
                }
                if (!defined(this.options.fill)) {
                    this.fill('#000');
                }
            },
            content: function (value) {
                if (defined(value)) {
                    this.options.set('content', value);
                    return this;
                } else {
                    return this.options.get('content');
                }
            },
            measure: function () {
                var metrics = util.measureText(this.content(), { font: this.options.get('font') });
                return metrics;
            },
            rect: function () {
                var size = this.measure();
                var pos = this.position().clone();
                return new g.Rect(pos, [
                    size.width,
                    size.height
                ]);
            },
            bbox: function (transformation) {
                var combinedMatrix = toMatrix(this.currentTransform(transformation));
                return this.rect().bbox(combinedMatrix);
            },
            rawBBox: function () {
                return this.rect().bbox();
            },
            _containsPoint: function (point) {
                return this.rect().containsPoint(point);
            }
        });
        drawing.mixins.Paintable.extend(Text.fn);
        definePointAccessors(Text.fn, ['position']);
        var Circle = Element.extend({
            nodeType: 'Circle',
            init: function (geometry, options) {
                Element.fn.init.call(this, options);
                this.geometry(geometry || new g.Circle());
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                }
            },
            _bbox: function (matrix) {
                return this._geometry.bbox(matrix);
            },
            rawBBox: function () {
                return this._geometry.bbox();
            },
            _containsPoint: function (point) {
                return this.geometry().containsPoint(point);
            },
            _isOnPath: function (point) {
                return this.geometry()._isOnPath(point, this.options.stroke.width / 2);
            }
        });
        drawing.mixins.Paintable.extend(Circle.fn);
        drawing.mixins.Measurable.extend(Circle.fn);
        defineGeometryAccessors(Circle.fn, ['geometry']);
        var Arc = Element.extend({
            nodeType: 'Arc',
            init: function (geometry, options) {
                Element.fn.init.call(this, options);
                this.geometry(geometry || new g.Arc());
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                }
            },
            _bbox: function (matrix) {
                return this._geometry.bbox(matrix);
            },
            rawBBox: function () {
                return this.geometry().bbox();
            },
            toPath: function () {
                var path = new Path();
                var curvePoints = this.geometry().curvePoints();
                if (curvePoints.length > 0) {
                    path.moveTo(curvePoints[0].x, curvePoints[0].y);
                    for (var i = 1; i < curvePoints.length; i += 3) {
                        path.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
                    }
                }
                return path;
            },
            _containsPoint: function (point) {
                return this.geometry().containsPoint(point);
            },
            _isOnPath: function (point) {
                return this.geometry()._isOnPath(point, this.options.stroke.width / 2);
            }
        });
        drawing.mixins.Paintable.extend(Arc.fn);
        drawing.mixins.Measurable.extend(Arc.fn);
        defineGeometryAccessors(Arc.fn, ['geometry']);
        var GeometryElementsArray = ElementsArray.extend({
            _change: function () {
                this.geometryChange();
            }
        });
        var Segment = Class.extend({
            init: function (anchor, controlIn, controlOut) {
                this.anchor(anchor || new Point());
                this.controlIn(controlIn);
                this.controlOut(controlOut);
            },
            bboxTo: function (toSegment, matrix) {
                var rect;
                var segmentAnchor = this.anchor().transformCopy(matrix);
                var toSegmentAnchor = toSegment.anchor().transformCopy(matrix);
                if (this.controlOut() && toSegment.controlIn()) {
                    rect = this._curveBoundingBox(segmentAnchor, this.controlOut().transformCopy(matrix), toSegment.controlIn().transformCopy(matrix), toSegmentAnchor);
                } else {
                    rect = this._lineBoundingBox(segmentAnchor, toSegmentAnchor);
                }
                return rect;
            },
            _lineBoundingBox: function (p1, p2) {
                return g.Rect.fromPoints(p1, p2);
            },
            _curveBoundingBox: function (p1, cp1, cp2, p2) {
                var points = [
                        p1,
                        cp1,
                        cp2,
                        p2
                    ], extremesX = this._curveExtremesFor(points, 'x'), extremesY = this._curveExtremesFor(points, 'y'), xLimits = arrayLimits([
                        extremesX.min,
                        extremesX.max,
                        p1.x,
                        p2.x
                    ]), yLimits = arrayLimits([
                        extremesY.min,
                        extremesY.max,
                        p1.y,
                        p2.y
                    ]);
                return g.Rect.fromPoints(new Point(xLimits.min, yLimits.min), new Point(xLimits.max, yLimits.max));
            },
            _curveExtremesFor: function (points, field) {
                var extremes = this._curveExtremes(points[0][field], points[1][field], points[2][field], points[3][field]);
                return {
                    min: this._calculateCurveAt(extremes.min, field, points),
                    max: this._calculateCurveAt(extremes.max, field, points)
                };
            },
            _calculateCurveAt: function (t, field, points) {
                var t1 = 1 - t;
                return pow(t1, 3) * points[0][field] + 3 * pow(t1, 2) * t * points[1][field] + 3 * pow(t, 2) * t1 * points[2][field] + pow(t, 3) * points[3][field];
            },
            _curveExtremes: function (x1, x2, x3, x4) {
                var a = x1 - 3 * x2 + 3 * x3 - x4;
                var b = -2 * (x1 - 2 * x2 + x3);
                var c = x1 - x2;
                var sqrt = math.sqrt(b * b - 4 * a * c);
                var t1 = 0;
                var t2 = 1;
                if (a === 0) {
                    if (b !== 0) {
                        t1 = t2 = -c / b;
                    }
                } else if (!isNaN(sqrt)) {
                    t1 = (-b + sqrt) / (2 * a);
                    t2 = (-b - sqrt) / (2 * a);
                }
                var min = math.max(math.min(t1, t2), 0);
                if (min < 0 || min > 1) {
                    min = 0;
                }
                var max = math.min(math.max(t1, t2), 1);
                if (max > 1 || max < 0) {
                    max = 1;
                }
                return {
                    min: min,
                    max: max
                };
            },
            _intersectionsTo: function (segment, point) {
                var intersectionsCount;
                if (this.controlOut() && segment.controlIn()) {
                    intersectionsCount = g.curveIntersectionsCount([
                        this.anchor(),
                        this.controlOut(),
                        segment.controlIn(),
                        segment.anchor()
                    ], point, this.bboxTo(segment));
                } else {
                    intersectionsCount = g.lineIntersectionsCount(this.anchor(), segment.anchor(), point);
                }
                return intersectionsCount;
            },
            _isOnCurveTo: function (segment, point, width, endSegment) {
                var bbox = this.bboxTo(segment).expand(width, width);
                if (bbox.containsPoint(point)) {
                    var p1 = this.anchor();
                    var p2 = this.controlOut();
                    var p3 = segment.controlIn();
                    var p4 = segment.anchor();
                    if (endSegment == 'start' && p1.distanceTo(point) <= width) {
                        return !g.isOutOfEndPoint(p1, p2, point);
                    } else if (endSegment == 'end' && p4.distanceTo(point) <= width) {
                        return !g.isOutOfEndPoint(p4, p3, point);
                    }
                    var hasRootsInRange = g.hasRootsInRange;
                    var points = [
                        p1,
                        p2,
                        p3,
                        p4
                    ];
                    if (hasRootsInRange(points, point, 'x', 'y', width) || hasRootsInRange(points, point, 'y', 'x', width)) {
                        return true;
                    }
                    var rotation = g.transform().rotate(45, point);
                    var rotatedPoints = [
                        p1.transformCopy(rotation),
                        p2.transformCopy(rotation),
                        p3.transformCopy(rotation),
                        p4.transformCopy(rotation)
                    ];
                    return hasRootsInRange(rotatedPoints, point, 'x', 'y', width) || hasRootsInRange(rotatedPoints, point, 'y', 'x', width);
                }
            },
            _isOnLineTo: function (segment, point, width) {
                var p1 = this.anchor();
                var p2 = segment.anchor();
                var angle = util.deg(math.atan2(p2.y - p1.y, p2.x - p1.x));
                var rect = new g.Rect([
                    p1.x,
                    p1.y - width / 2
                ], [
                    p1.distanceTo(p2),
                    width
                ]);
                return rect.containsPoint(point.transformCopy(g.transform().rotate(-angle, p1)));
            },
            _isOnPathTo: function (segment, point, width, endSegment) {
                var isOnPath;
                if (this.controlOut() && segment.controlIn()) {
                    isOnPath = this._isOnCurveTo(segment, point, width / 2, endSegment);
                } else {
                    isOnPath = this._isOnLineTo(segment, point, width);
                }
                return isOnPath;
            }
        });
        definePointAccessors(Segment.fn, [
            'anchor',
            'controlIn',
            'controlOut'
        ]);
        deepExtend(Segment.fn, ObserversMixin);
        var Path = Element.extend({
            nodeType: 'Path',
            init: function (options) {
                Element.fn.init.call(this, options);
                this.segments = new GeometryElementsArray();
                this.segments.addObserver(this);
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                    if (!defined(this.options.stroke.lineJoin)) {
                        this.options.set('stroke.lineJoin', 'miter');
                    }
                }
            },
            moveTo: function (x, y) {
                this.suspend();
                this.segments.elements([]);
                this.resume();
                this.lineTo(x, y);
                return this;
            },
            lineTo: function (x, y) {
                var point = defined(y) ? new Point(x, y) : x, segment = new Segment(point);
                this.segments.push(segment);
                return this;
            },
            curveTo: function (controlOut, controlIn, point) {
                if (this.segments.length > 0) {
                    var lastSegment = last(this.segments);
                    var segment = new Segment(point, controlIn);
                    this.suspend();
                    lastSegment.controlOut(controlOut);
                    this.resume();
                    this.segments.push(segment);
                }
                return this;
            },
            arc: function (startAngle, endAngle, radiusX, radiusY, anticlockwise) {
                if (this.segments.length > 0) {
                    var lastSegment = last(this.segments);
                    var anchor = lastSegment.anchor();
                    var start = util.rad(startAngle);
                    var center = new Point(anchor.x - radiusX * math.cos(start), anchor.y - radiusY * math.sin(start));
                    var arc = new g.Arc(center, {
                        startAngle: startAngle,
                        endAngle: endAngle,
                        radiusX: radiusX,
                        radiusY: radiusY,
                        anticlockwise: anticlockwise
                    });
                    this._addArcSegments(arc);
                }
                return this;
            },
            arcTo: function (end, rx, ry, largeArc, swipe) {
                if (this.segments.length > 0) {
                    var lastSegment = last(this.segments);
                    var anchor = lastSegment.anchor();
                    var arc = g.Arc.fromPoints(anchor, end, rx, ry, largeArc, swipe);
                    this._addArcSegments(arc);
                }
                return this;
            },
            _addArcSegments: function (arc) {
                this.suspend();
                var curvePoints = arc.curvePoints();
                for (var i = 1; i < curvePoints.length; i += 3) {
                    this.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
                }
                this.resume();
                this.geometryChange();
            },
            close: function () {
                this.options.closed = true;
                this.geometryChange();
                return this;
            },
            rawBBox: function () {
                return this._bbox();
            },
            _containsPoint: function (point) {
                var segments = this.segments;
                var length = segments.length;
                var intersectionsCount = 0;
                var previous, current;
                for (var idx = 1; idx < length; idx++) {
                    previous = segments[idx - 1];
                    current = segments[idx];
                    intersectionsCount += previous._intersectionsTo(current, point);
                }
                if (this.options.closed || !segments[0].anchor().equals(segments[length - 1].anchor())) {
                    intersectionsCount += g.lineIntersectionsCount(segments[0].anchor(), segments[length - 1].anchor(), point);
                }
                return intersectionsCount % 2 !== 0;
            },
            _isOnPath: function (point, width) {
                var segments = this.segments;
                var length = segments.length;
                width = width || this.options.stroke.width;
                if (length > 1) {
                    if (segments[0]._isOnPathTo(segments[1], point, width, 'start')) {
                        return true;
                    }
                    for (var idx = 2; idx <= length - 2; idx++) {
                        if (segments[idx - 1]._isOnPathTo(segments[idx], point, width)) {
                            return true;
                        }
                    }
                    if (segments[length - 2]._isOnPathTo(segments[length - 1], point, width, 'end')) {
                        return true;
                    }
                }
                return false;
            },
            _bbox: function (matrix) {
                var segments = this.segments;
                var length = segments.length;
                var boundingBox;
                if (length === 1) {
                    var anchor = segments[0].anchor().transformCopy(matrix);
                    boundingBox = new g.Rect(anchor, Size.ZERO);
                } else if (length > 0) {
                    for (var i = 1; i < length; i++) {
                        var segmentBox = segments[i - 1].bboxTo(segments[i], matrix);
                        if (boundingBox) {
                            boundingBox = g.Rect.union(boundingBox, segmentBox);
                        } else {
                            boundingBox = segmentBox;
                        }
                    }
                }
                return boundingBox;
            }
        });
        drawing.mixins.Paintable.extend(Path.fn);
        drawing.mixins.Measurable.extend(Path.fn);
        Path.fromRect = function (rect, options) {
            return new Path(options).moveTo(rect.topLeft()).lineTo(rect.topRight()).lineTo(rect.bottomRight()).lineTo(rect.bottomLeft()).close();
        };
        Path.fromPoints = function (points, options) {
            if (points) {
                var path = new Path(options);
                for (var i = 0; i < points.length; i++) {
                    var pt = Point.create(points[i]);
                    if (pt) {
                        if (i === 0) {
                            path.moveTo(pt);
                        } else {
                            path.lineTo(pt);
                        }
                    }
                }
                return path;
            }
        };
        Path.fromArc = function (arc, options) {
            var path = new Path(options);
            var startAngle = arc.startAngle;
            var start = arc.pointAt(startAngle);
            path.moveTo(start.x, start.y);
            path.arc(startAngle, arc.endAngle, arc.radiusX, arc.radiusY, arc.anticlockwise);
            return path;
        };
        var MultiPath = Element.extend({
            nodeType: 'MultiPath',
            init: function (options) {
                Element.fn.init.call(this, options);
                this.paths = new GeometryElementsArray();
                this.paths.addObserver(this);
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                }
            },
            moveTo: function (x, y) {
                var path = new Path();
                path.moveTo(x, y);
                this.paths.push(path);
                return this;
            },
            lineTo: function (x, y) {
                if (this.paths.length > 0) {
                    last(this.paths).lineTo(x, y);
                }
                return this;
            },
            curveTo: function (controlOut, controlIn, point) {
                if (this.paths.length > 0) {
                    last(this.paths).curveTo(controlOut, controlIn, point);
                }
                return this;
            },
            arc: function (startAngle, endAngle, radiusX, radiusY, anticlockwise) {
                if (this.paths.length > 0) {
                    last(this.paths).arc(startAngle, endAngle, radiusX, radiusY, anticlockwise);
                }
                return this;
            },
            arcTo: function (end, rx, ry, largeArc, swipe) {
                if (this.paths.length > 0) {
                    last(this.paths).arcTo(end, rx, ry, largeArc, swipe);
                }
                return this;
            },
            close: function () {
                if (this.paths.length > 0) {
                    last(this.paths).close();
                }
                return this;
            },
            _bbox: function (matrix) {
                return elementsBoundingBox(this.paths, true, matrix);
            },
            rawBBox: function () {
                return elementsBoundingBox(this.paths, false);
            },
            _containsPoint: function (point) {
                var paths = this.paths;
                for (var idx = 0; idx < paths.length; idx++) {
                    if (paths[idx]._containsPoint(point)) {
                        return true;
                    }
                }
                return false;
            },
            _isOnPath: function (point) {
                var paths = this.paths;
                var width = this.options.stroke.width;
                for (var idx = 0; idx < paths.length; idx++) {
                    if (paths[idx]._isOnPath(point, width)) {
                        return true;
                    }
                }
                return false;
            },
            _clippedBBox: function (transformation) {
                return elementsClippedBoundingBox(this.paths, this.currentTransform(transformation));
            }
        });
        drawing.mixins.Paintable.extend(MultiPath.fn);
        drawing.mixins.Measurable.extend(MultiPath.fn);
        var Image = Element.extend({
            nodeType: 'Image',
            init: function (src, rect, options) {
                Element.fn.init.call(this, options);
                this.src(src);
                this.rect(rect || new g.Rect());
            },
            src: function (value) {
                if (defined(value)) {
                    this.options.set('src', value);
                    return this;
                } else {
                    return this.options.get('src');
                }
            },
            bbox: function (transformation) {
                var combinedMatrix = toMatrix(this.currentTransform(transformation));
                return this._rect.bbox(combinedMatrix);
            },
            rawBBox: function () {
                return this._rect.bbox();
            },
            _containsPoint: function (point) {
                return this._rect.containsPoint(point);
            },
            _hasFill: function () {
                return this.src();
            }
        });
        defineGeometryAccessors(Image.fn, ['rect']);
        var GradientStop = Class.extend({
            init: function (offset, color, opacity) {
                this.options = new OptionsStore({
                    offset: offset,
                    color: color,
                    opacity: defined(opacity) ? opacity : 1
                });
                this.options.addObserver(this);
            }
        });
        defineOptionsAccessors(GradientStop.fn, [
            'offset',
            'color',
            'opacity'
        ]);
        deepExtend(GradientStop.fn, ObserversMixin);
        GradientStop.create = function (arg) {
            if (defined(arg)) {
                var stop;
                if (arg instanceof GradientStop) {
                    stop = arg;
                } else if (arg.length > 1) {
                    stop = new GradientStop(arg[0], arg[1], arg[2]);
                } else {
                    stop = new GradientStop(arg.offset, arg.color, arg.opacity);
                }
                return stop;
            }
        };
        var StopsArray = ElementsArray.extend({
            _change: function () {
                this.optionsChange({ field: 'stops' });
            }
        });
        var Gradient = Class.extend({
            nodeType: 'gradient',
            init: function (options) {
                this.stops = new StopsArray(this._createStops(options.stops));
                this.stops.addObserver(this);
                this._userSpace = options.userSpace;
                this.id = generateDefinitionId();
            },
            userSpace: function (value) {
                if (defined(value)) {
                    this._userSpace = value;
                    this.optionsChange();
                    return this;
                } else {
                    return this._userSpace;
                }
            },
            _createStops: function (stops) {
                var result = [];
                var idx;
                stops = stops || [];
                for (idx = 0; idx < stops.length; idx++) {
                    result.push(GradientStop.create(stops[idx]));
                }
                return result;
            },
            addStop: function (offset, color, opacity) {
                this.stops.push(new GradientStop(offset, color, opacity));
            },
            removeStop: function (stop) {
                var index = this.stops.indexOf(stop);
                if (index >= 0) {
                    this.stops.splice(index, 1);
                }
            }
        });
        deepExtend(Gradient.fn, ObserversMixin, {
            optionsChange: function (e) {
                this.trigger('optionsChange', {
                    field: 'gradient' + (e ? '.' + e.field : ''),
                    value: this
                });
            },
            geometryChange: function () {
                this.optionsChange();
            }
        });
        var LinearGradient = Gradient.extend({
            init: function (options) {
                options = options || {};
                Gradient.fn.init.call(this, options);
                this.start(options.start || new Point());
                this.end(options.end || new Point(1, 0));
            }
        });
        definePointAccessors(LinearGradient.fn, [
            'start',
            'end'
        ]);
        var RadialGradient = Gradient.extend({
            init: function (options) {
                options = options || {};
                Gradient.fn.init.call(this, options);
                this.center(options.center || new Point());
                this._radius = defined(options.radius) ? options.radius : 1;
                this._fallbackFill = options.fallbackFill;
            },
            radius: function (value) {
                if (defined(value)) {
                    this._radius = value;
                    this.geometryChange();
                    return this;
                } else {
                    return this._radius;
                }
            },
            fallbackFill: function (value) {
                if (defined(value)) {
                    this._fallbackFill = value;
                    this.optionsChange();
                    return this;
                } else {
                    return this._fallbackFill;
                }
            }
        });
        definePointAccessors(RadialGradient.fn, ['center']);
        var Rect = Element.extend({
            nodeType: 'Rect',
            init: function (geometry, options) {
                Element.fn.init.call(this, options);
                this.geometry(geometry || new g.Rect());
                if (!defined(this.options.stroke)) {
                    this.stroke('#000');
                }
            },
            _bbox: function (matrix) {
                return this._geometry.bbox(matrix);
            },
            rawBBox: function () {
                return this._geometry.bbox();
            },
            _containsPoint: function (point) {
                return this._geometry.containsPoint(point);
            },
            _isOnPath: function (point) {
                return this.geometry()._isOnPath(point, this.options.stroke.width / 2);
            }
        });
        drawing.mixins.Paintable.extend(Rect.fn);
        drawing.mixins.Measurable.extend(Rect.fn);
        defineGeometryAccessors(Rect.fn, ['geometry']);
        var Layout = Group.extend({
            init: function (rect, options) {
                Group.fn.init.call(this, kendo.deepExtend({}, this._defaults, options));
                this._rect = rect;
                this._fieldMap = {};
            },
            _defaults: {
                alignContent: START,
                justifyContent: START,
                alignItems: START,
                spacing: 0,
                orientation: HORIZONTAL,
                lineSpacing: 0,
                wrap: true
            },
            rect: function (value) {
                if (value) {
                    this._rect = value;
                    return this;
                } else {
                    return this._rect;
                }
            },
            _initMap: function () {
                var options = this.options;
                var fieldMap = this._fieldMap;
                if (options.orientation == HORIZONTAL) {
                    fieldMap.sizeField = 'width';
                    fieldMap.groupsSizeField = 'height';
                    fieldMap.groupAxis = 'x';
                    fieldMap.groupsAxis = 'y';
                } else {
                    fieldMap.sizeField = 'height';
                    fieldMap.groupsSizeField = 'width';
                    fieldMap.groupAxis = 'y';
                    fieldMap.groupsAxis = 'x';
                }
            },
            reflow: function () {
                if (!this._rect || this.children.length === 0) {
                    return;
                }
                this._initMap();
                if (this.options.transform) {
                    this.transform(null);
                }
                var options = this.options;
                var fieldMap = this._fieldMap;
                var rect = this._rect;
                var groupOptions = this._initGroups();
                var groups = groupOptions.groups;
                var groupsSize = groupOptions.groupsSize;
                var sizeField = fieldMap.sizeField;
                var groupsSizeField = fieldMap.groupsSizeField;
                var groupAxis = fieldMap.groupAxis;
                var groupsAxis = fieldMap.groupsAxis;
                var groupStart = alignStart(groupsSize, rect, options.alignContent, groupsAxis, groupsSizeField);
                var groupOrigin = new Point();
                var elementOrigin = new Point();
                var size = new g.Size();
                var elementStart, bbox, element, group, groupBox;
                for (var groupIdx = 0; groupIdx < groups.length; groupIdx++) {
                    group = groups[groupIdx];
                    groupOrigin[groupAxis] = elementStart = alignStart(group.size, rect, options.justifyContent, groupAxis, sizeField);
                    groupOrigin[groupsAxis] = groupStart;
                    size[sizeField] = group.size;
                    size[groupsSizeField] = group.lineSize;
                    groupBox = new g.Rect(groupOrigin, size);
                    for (var idx = 0; idx < group.bboxes.length; idx++) {
                        element = group.elements[idx];
                        bbox = group.bboxes[idx];
                        elementOrigin[groupAxis] = elementStart;
                        elementOrigin[groupsAxis] = alignStart(bbox.size[groupsSizeField], groupBox, options.alignItems, groupsAxis, groupsSizeField);
                        translateToPoint(elementOrigin, bbox, element);
                        elementStart += bbox.size[sizeField] + options.spacing;
                    }
                    groupStart += group.lineSize + options.lineSpacing;
                }
                if (!options.wrap && group.size > rect.size[sizeField]) {
                    var scale = rect.size[sizeField] / groupBox.size[sizeField];
                    var scaledStart = groupBox.topLeft().scale(scale, scale);
                    var scaledSize = groupBox.size[groupsSizeField] * scale;
                    var newStart = alignStart(scaledSize, rect, options.alignContent, groupsAxis, groupsSizeField);
                    var transform = g.transform();
                    if (groupAxis === 'x') {
                        transform.translate(rect.origin.x - scaledStart.x, newStart - scaledStart.y);
                    } else {
                        transform.translate(newStart - scaledStart.x, rect.origin.y - scaledStart.y);
                    }
                    transform.scale(scale, scale);
                    this.transform(transform);
                }
            },
            _initGroups: function () {
                var options = this.options;
                var children = this.children;
                var lineSpacing = options.lineSpacing;
                var sizeField = this._fieldMap.sizeField;
                var groupsSize = -lineSpacing;
                var groups = [];
                var group = this._newGroup();
                var addGroup = function () {
                    groups.push(group);
                    groupsSize += group.lineSize + lineSpacing;
                };
                var bbox, element;
                for (var idx = 0; idx < children.length; idx++) {
                    element = children[idx];
                    bbox = children[idx].clippedBBox();
                    if (element.visible() && bbox) {
                        if (options.wrap && group.size + bbox.size[sizeField] + options.spacing > this._rect.size[sizeField]) {
                            if (group.bboxes.length === 0) {
                                this._addToGroup(group, bbox, element);
                                addGroup();
                                group = this._newGroup();
                            } else {
                                addGroup();
                                group = this._newGroup();
                                this._addToGroup(group, bbox, element);
                            }
                        } else {
                            this._addToGroup(group, bbox, element);
                        }
                    }
                }
                if (group.bboxes.length) {
                    addGroup();
                }
                return {
                    groups: groups,
                    groupsSize: groupsSize
                };
            },
            _addToGroup: function (group, bbox, element) {
                group.size += bbox.size[this._fieldMap.sizeField] + this.options.spacing;
                group.lineSize = Math.max(bbox.size[this._fieldMap.groupsSizeField], group.lineSize);
                group.bboxes.push(bbox);
                group.elements.push(element);
            },
            _newGroup: function () {
                return {
                    lineSize: 0,
                    size: -this.options.spacing,
                    bboxes: [],
                    elements: []
                };
            }
        });
        function elementsBoundingBox(elements, applyTransform, transformation) {
            var boundingBox;
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.visible()) {
                    var elementBoundingBox = applyTransform ? element.bbox(transformation) : element.rawBBox();
                    if (elementBoundingBox) {
                        if (boundingBox) {
                            boundingBox = g.Rect.union(boundingBox, elementBoundingBox);
                        } else {
                            boundingBox = elementBoundingBox;
                        }
                    }
                }
            }
            return boundingBox;
        }
        function elementsClippedBoundingBox(elements, transformation) {
            var boundingBox;
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.visible()) {
                    var elementBoundingBox = element.clippedBBox(transformation);
                    if (elementBoundingBox) {
                        if (boundingBox) {
                            boundingBox = g.Rect.union(boundingBox, elementBoundingBox);
                        } else {
                            boundingBox = elementBoundingBox;
                        }
                    }
                }
            }
            return boundingBox;
        }
        function defineGeometryAccessors(fn, names) {
            for (var i = 0; i < names.length; i++) {
                fn[names[i]] = geometryAccessor(names[i]);
            }
        }
        function geometryAccessor(name) {
            var fieldName = '_' + name;
            return function (value) {
                if (defined(value)) {
                    this._observerField(fieldName, value);
                    this.geometryChange();
                    return this;
                } else {
                    return this[fieldName];
                }
            };
        }
        function definePointAccessors(fn, names) {
            for (var i = 0; i < names.length; i++) {
                fn[names[i]] = pointAccessor(names[i]);
            }
        }
        function pointAccessor(name) {
            var fieldName = '_' + name;
            return function (value) {
                if (defined(value)) {
                    this._observerField(fieldName, Point.create(value));
                    this.geometryChange();
                    return this;
                } else {
                    return this[fieldName];
                }
            };
        }
        function defineOptionsAccessors(fn, names) {
            for (var i = 0; i < names.length; i++) {
                fn[names[i]] = optionsAccessor(names[i]);
            }
        }
        function optionsAccessor(name) {
            return function (value) {
                if (defined(value)) {
                    this.options.set(name, value);
                    return this;
                } else {
                    return this.options.get(name);
                }
            };
        }
        function generateDefinitionId() {
            return 'kdef' + defId++;
        }
        function align(elements, rect, alignment) {
            alignElements(elements, rect, alignment, 'x', 'width');
        }
        function vAlign(elements, rect, alignment) {
            alignElements(elements, rect, alignment, 'y', 'height');
        }
        function stack(elements) {
            stackElements(getStackElements(elements), 'x', 'y', 'width');
        }
        function vStack(elements) {
            stackElements(getStackElements(elements), 'y', 'x', 'height');
        }
        function wrap(elements, rect) {
            return wrapElements(elements, rect, 'x', 'y', 'width');
        }
        function vWrap(elements, rect) {
            return wrapElements(elements, rect, 'y', 'x', 'height');
        }
        function wrapElements(elements, rect, axis, otherAxis, sizeField) {
            var result = [];
            var stacks = getStacks(elements, rect, sizeField);
            var origin = rect.origin.clone();
            var startElement;
            var elementIdx;
            var stack;
            var idx;
            for (idx = 0; idx < stacks.length; idx++) {
                stack = stacks[idx];
                startElement = stack[0];
                origin[otherAxis] = startElement.bbox.origin[otherAxis];
                translateToPoint(origin, startElement.bbox, startElement.element);
                startElement.bbox.origin[axis] = origin[axis];
                stackElements(stack, axis, otherAxis, sizeField);
                result.push([]);
                for (elementIdx = 0; elementIdx < stack.length; elementIdx++) {
                    result[idx].push(stack[elementIdx].element);
                }
            }
            return result;
        }
        function fit(element, rect) {
            var bbox = element.clippedBBox();
            var elementSize = bbox.size;
            var rectSize = rect.size;
            if (rectSize.width < elementSize.width || rectSize.height < elementSize.height) {
                var scale = math.min(rectSize.width / elementSize.width, rectSize.height / elementSize.height);
                var transform = element.transform() || g.transform();
                transform.scale(scale, scale);
                element.transform(transform);
            }
        }
        function getStacks(elements, rect, sizeField) {
            var maxSize = rect.size[sizeField];
            var stackSize = 0;
            var stacks = [];
            var stack = [];
            var element;
            var size;
            var bbox;
            var addElementToStack = function () {
                stack.push({
                    element: element,
                    bbox: bbox
                });
            };
            for (var idx = 0; idx < elements.length; idx++) {
                element = elements[idx];
                bbox = element.clippedBBox();
                if (bbox) {
                    size = bbox.size[sizeField];
                    if (stackSize + size > maxSize) {
                        if (stack.length) {
                            stacks.push(stack);
                            stack = [];
                            addElementToStack();
                            stackSize = size;
                        } else {
                            addElementToStack();
                            stacks.push(stack);
                            stack = [];
                            stackSize = 0;
                        }
                    } else {
                        addElementToStack();
                        stackSize += size;
                    }
                }
            }
            if (stack.length) {
                stacks.push(stack);
            }
            return stacks;
        }
        function getStackElements(elements) {
            var stackElements = [];
            var element;
            var bbox;
            for (var idx = 0; idx < elements.length; idx++) {
                element = elements[idx];
                bbox = element.clippedBBox();
                if (bbox) {
                    stackElements.push({
                        element: element,
                        bbox: bbox
                    });
                }
            }
            return stackElements;
        }
        function stackElements(elements, stackAxis, otherAxis, sizeField) {
            if (elements.length > 1) {
                var previousBBox = elements[0].bbox;
                var origin = new Point();
                var element;
                var bbox;
                for (var idx = 1; idx < elements.length; idx++) {
                    element = elements[idx].element;
                    bbox = elements[idx].bbox;
                    origin[stackAxis] = previousBBox.origin[stackAxis] + previousBBox.size[sizeField];
                    origin[otherAxis] = bbox.origin[otherAxis];
                    translateToPoint(origin, bbox, element);
                    bbox.origin[stackAxis] = origin[stackAxis];
                    previousBBox = bbox;
                }
            }
        }
        function alignElements(elements, rect, alignment, axis, sizeField) {
            var bbox, point;
            alignment = alignment || 'start';
            for (var idx = 0; idx < elements.length; idx++) {
                bbox = elements[idx].clippedBBox();
                if (bbox) {
                    point = bbox.origin.clone();
                    point[axis] = alignStart(bbox.size[sizeField], rect, alignment, axis, sizeField);
                    translateToPoint(point, bbox, elements[idx]);
                }
            }
        }
        function alignStart(size, rect, align, axis, sizeField) {
            var start;
            if (align == START) {
                start = rect.origin[axis];
            } else if (align == END) {
                start = rect.origin[axis] + rect.size[sizeField] - size;
            } else {
                start = rect.origin[axis] + (rect.size[sizeField] - size) / 2;
            }
            return start;
        }
        function translate(x, y, element) {
            var transofrm = element.transform() || g.transform();
            var matrix = transofrm.matrix();
            matrix.e += x;
            matrix.f += y;
            transofrm.matrix(matrix);
            element.transform(transofrm);
        }
        function translateToPoint(point, bbox, element) {
            translate(point.x - bbox.origin.x, point.y - bbox.origin.y, element);
        }
        deepExtend(drawing, {
            align: align,
            Arc: Arc,
            Circle: Circle,
            Element: Element,
            ElementsArray: ElementsArray,
            fit: fit,
            Gradient: Gradient,
            GradientStop: GradientStop,
            Group: Group,
            Image: Image,
            Layout: Layout,
            LinearGradient: LinearGradient,
            MultiPath: MultiPath,
            Path: Path,
            RadialGradient: RadialGradient,
            Rect: Rect,
            Segment: Segment,
            stack: stack,
            Text: Text,
            vAlign: vAlign,
            vStack: vStack,
            vWrap: vWrap,
            wrap: wrap
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/parser', ['drawing/shapes'], f);
}(function () {
    (function ($) {
        var kendo = window.kendo, drawing = kendo.drawing, geometry = kendo.geometry, Class = kendo.Class, Point = geometry.Point, deepExtend = kendo.deepExtend, trim = $.trim, util = kendo.util, last = util.last;
        var SEGMENT_REGEX = /([a-df-z]{1})([^a-df-z]*)(z)?/gi, SPLIT_REGEX = /[,\s]?([+\-]?(?:\d*\.\d+|\d+)(?:[eE][+\-]?\d+)?)/g, MOVE = 'm', CLOSE = 'z';
        var PathParser = Class.extend({
            parse: function (str, options) {
                var multiPath = new drawing.MultiPath(options);
                var position = new Point();
                var previousCommand;
                str.replace(SEGMENT_REGEX, function (match, element, params, closePath) {
                    var command = element.toLowerCase();
                    var isRelative = command === element;
                    var parameters = parseParameters(trim(params));
                    if (command === MOVE) {
                        if (isRelative) {
                            position.x += parameters[0];
                            position.y += parameters[1];
                        } else {
                            position.x = parameters[0];
                            position.y = parameters[1];
                        }
                        multiPath.moveTo(position.x, position.y);
                        if (parameters.length > 2) {
                            command = 'l';
                            parameters.splice(0, 2);
                        }
                    }
                    if (ShapeMap[command]) {
                        ShapeMap[command](multiPath, {
                            parameters: parameters,
                            position: position,
                            isRelative: isRelative,
                            previousCommand: previousCommand
                        });
                        if (closePath && closePath.toLowerCase() === CLOSE) {
                            multiPath.close();
                        }
                    } else if (command !== MOVE) {
                        throw new Error('Error while parsing SVG path. Unsupported command: ' + command);
                    }
                    previousCommand = command;
                });
                return multiPath;
            }
        });
        var ShapeMap = {
            l: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                for (var i = 0; i < parameters.length; i += 2) {
                    var point = new Point(parameters[i], parameters[i + 1]);
                    if (options.isRelative) {
                        point.translateWith(position);
                    }
                    path.lineTo(point.x, point.y);
                    position.x = point.x;
                    position.y = point.y;
                }
            },
            c: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                var controlOut, controlIn, point;
                for (var i = 0; i < parameters.length; i += 6) {
                    controlOut = new Point(parameters[i], parameters[i + 1]);
                    controlIn = new Point(parameters[i + 2], parameters[i + 3]);
                    point = new Point(parameters[i + 4], parameters[i + 5]);
                    if (options.isRelative) {
                        controlIn.translateWith(position);
                        controlOut.translateWith(position);
                        point.translateWith(position);
                    }
                    path.curveTo(controlOut, controlIn, point);
                    position.x = point.x;
                    position.y = point.y;
                }
            },
            v: function (path, options) {
                var value = options.isRelative ? 0 : options.position.x;
                toLineParamaters(options.parameters, true, value);
                this.l(path, options);
            },
            h: function (path, options) {
                var value = options.isRelative ? 0 : options.position.y;
                toLineParamaters(options.parameters, false, value);
                this.l(path, options);
            },
            a: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                for (var i = 0; i < parameters.length; i += 7) {
                    var radiusX = parameters[i];
                    var radiusY = parameters[i + 1];
                    var largeArc = parameters[i + 3];
                    var swipe = parameters[i + 4];
                    var endPoint = new Point(parameters[i + 5], parameters[i + 6]);
                    if (options.isRelative) {
                        endPoint.translateWith(position);
                    }
                    path.arcTo(endPoint, radiusX, radiusY, largeArc, swipe);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            },
            s: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                var previousCommand = options.previousCommand;
                var controlOut, endPoint, controlIn, lastControlIn;
                if (previousCommand == 's' || previousCommand == 'c') {
                    lastControlIn = last(last(path.paths).segments).controlIn();
                }
                for (var i = 0; i < parameters.length; i += 4) {
                    controlIn = new Point(parameters[i], parameters[i + 1]);
                    endPoint = new Point(parameters[i + 2], parameters[i + 3]);
                    if (options.isRelative) {
                        controlIn.translateWith(position);
                        endPoint.translateWith(position);
                    }
                    if (lastControlIn) {
                        controlOut = reflectionPoint(lastControlIn, position);
                    } else {
                        controlOut = position.clone();
                    }
                    lastControlIn = controlIn;
                    path.curveTo(controlOut, controlIn, endPoint);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            },
            q: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                var cubicControlPoints, endPoint, controlPoint;
                for (var i = 0; i < parameters.length; i += 4) {
                    controlPoint = new Point(parameters[i], parameters[i + 1]);
                    endPoint = new Point(parameters[i + 2], parameters[i + 3]);
                    if (options.isRelative) {
                        controlPoint.translateWith(position);
                        endPoint.translateWith(position);
                    }
                    cubicControlPoints = quadraticToCubicControlPoints(position, controlPoint, endPoint);
                    path.curveTo(cubicControlPoints.controlOut, cubicControlPoints.controlIn, endPoint);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            },
            t: function (path, options) {
                var parameters = options.parameters;
                var position = options.position;
                var previousCommand = options.previousCommand;
                var cubicControlPoints, controlPoint, endPoint;
                if (previousCommand == 'q' || previousCommand == 't') {
                    var lastSegment = last(last(path.paths).segments);
                    controlPoint = lastSegment.controlIn().clone().translateWith(position.scaleCopy(-1 / 3)).scale(3 / 2);
                }
                for (var i = 0; i < parameters.length; i += 2) {
                    endPoint = new Point(parameters[i], parameters[i + 1]);
                    if (options.isRelative) {
                        endPoint.translateWith(position);
                    }
                    if (controlPoint) {
                        controlPoint = reflectionPoint(controlPoint, position);
                    } else {
                        controlPoint = position.clone();
                    }
                    cubicControlPoints = quadraticToCubicControlPoints(position, controlPoint, endPoint);
                    path.curveTo(cubicControlPoints.controlOut, cubicControlPoints.controlIn, endPoint);
                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            }
        };
        function parseParameters(str) {
            var parameters = [];
            str.replace(SPLIT_REGEX, function (match, number) {
                parameters.push(parseFloat(number));
            });
            return parameters;
        }
        function toLineParamaters(parameters, isVertical, value) {
            var insertPosition = isVertical ? 0 : 1;
            for (var i = 0; i < parameters.length; i += 2) {
                parameters.splice(i + insertPosition, 0, value);
            }
        }
        function reflectionPoint(point, center) {
            if (point && center) {
                return center.scaleCopy(2).translate(-point.x, -point.y);
            }
        }
        function quadraticToCubicControlPoints(position, controlPoint, endPoint) {
            var third = 1 / 3;
            controlPoint = controlPoint.clone().scale(2 / 3);
            return {
                controlOut: controlPoint.clone().translateWith(position.scaleCopy(third)),
                controlIn: controlPoint.translateWith(endPoint.scaleCopy(third))
            };
        }
        PathParser.current = new PathParser();
        drawing.Path.parse = function (str, options) {
            return PathParser.current.parse(str, options);
        };
        deepExtend(drawing, { PathParser: PathParser });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/search', ['drawing/shapes'], f);
}(function () {
    (function ($) {
        var kendo = window.kendo, drawing = kendo.drawing, geometry = kendo.geometry, Class = kendo.Class, Rect = geometry.Rect, deepExtend = kendo.deepExtend, isArray = $.isArray, inArray = $.inArray, math = Math, LEVEL_STEP = 10000, MAX_LEVEL = 75;
        var QuadRoot = Class.extend({
            init: function () {
                this.shapes = [];
            },
            _add: function (shape, bbox) {
                this.shapes.push({
                    bbox: bbox,
                    shape: shape
                });
                shape._quadNode = this;
            },
            pointShapes: function (point) {
                var shapes = this.shapes;
                var length = shapes.length;
                var result = [];
                for (var idx = 0; idx < length; idx++) {
                    if (shapes[idx].bbox.containsPoint(point)) {
                        result.push(shapes[idx].shape);
                    }
                }
                return result;
            },
            insert: function (shape, bbox) {
                this._add(shape, bbox);
            },
            remove: function (shape) {
                var shapes = this.shapes;
                var length = shapes.length;
                for (var idx = 0; idx < length; idx++) {
                    if (shapes[idx].shape === shape) {
                        shapes.splice(idx, 1);
                        break;
                    }
                }
            }
        });
        var QuadNode = QuadRoot.extend({
            init: function (rect) {
                QuadRoot.fn.init.call(this);
                this.children = [];
                this.rect = rect;
            },
            inBounds: function (rect) {
                var nodeRect = this.rect;
                var nodeBottomRight = nodeRect.bottomRight();
                var bottomRight = rect.bottomRight();
                var inBounds = nodeRect.origin.x <= rect.origin.x && nodeRect.origin.y <= rect.origin.y && bottomRight.x <= nodeBottomRight.x && bottomRight.y <= nodeBottomRight.y;
                return inBounds;
            },
            pointShapes: function (point) {
                var children = this.children;
                var length = children.length;
                var result = QuadRoot.fn.pointShapes.call(this, point);
                for (var idx = 0; idx < length; idx++) {
                    result = result.concat(children[idx].pointShapes(point));
                }
                return result;
            },
            insert: function (shape, bbox) {
                var inserted = false;
                var children = this.children;
                if (this.inBounds(bbox)) {
                    if (this.shapes.length < 4) {
                        this._add(shape, bbox);
                    } else {
                        if (!children.length) {
                            this._initChildren();
                        }
                        for (var idx = 0; idx < children.length; idx++) {
                            if (children[idx].insert(shape, bbox)) {
                                inserted = true;
                                break;
                            }
                        }
                        if (!inserted) {
                            this._add(shape, bbox);
                        }
                    }
                    inserted = true;
                }
                return inserted;
            },
            _initChildren: function () {
                var rect = this.rect, children = this.children, center = rect.center(), halfWidth = rect.width() / 2, halfHeight = rect.height() / 2;
                children.push(new QuadNode(new Rect([
                    rect.origin.x,
                    rect.origin.y
                ], [
                    halfWidth,
                    halfHeight
                ])), new QuadNode(new Rect([
                    center.x,
                    rect.origin.y
                ], [
                    halfWidth,
                    halfHeight
                ])), new QuadNode(new Rect([
                    rect.origin.x,
                    center.y
                ], [
                    halfWidth,
                    halfHeight
                ])), new QuadNode(new Rect([
                    center.x,
                    center.y
                ], [
                    halfWidth,
                    halfHeight
                ])));
            }
        });
        var ShapesQuadTree = Class.extend({
            ROOT_SIZE: 1000,
            init: function () {
                this.initRoots();
            },
            initRoots: function () {
                this.rootMap = {};
                this.root = new QuadRoot();
                this.rootElements = [];
            },
            clear: function () {
                var that = this;
                var rootElements = that.rootElements;
                for (var idx = 0; idx < rootElements.length; idx++) {
                    this.remove(rootElements[idx]);
                }
                this.initRoots();
            },
            pointShape: function (point) {
                var size = this.ROOT_SIZE;
                var result = this.root.pointShapes(point);
                var sectorRoot = (this.rootMap[math.floor(point.x / size)] || {})[math.floor(point.y / size)];
                if (sectorRoot) {
                    result = result.concat(sectorRoot.pointShapes(point));
                }
                this.assignZindex(result);
                result.sort(zIndexComparer);
                for (var idx = 0; idx < result.length; idx++) {
                    if (result[idx].containsPoint(point)) {
                        return result[idx];
                    }
                }
            },
            assignZindex: function (elements) {
                var element, levelWeight, zIndex, parents;
                for (var idx = 0; idx < elements.length; idx++) {
                    element = elements[idx];
                    zIndex = 0;
                    levelWeight = math.pow(LEVEL_STEP, MAX_LEVEL);
                    parents = [];
                    while (element) {
                        parents.push(element);
                        element = element.parent;
                    }
                    while (parents.length) {
                        element = parents.pop();
                        zIndex += (inArray(element, element.parent ? element.parent.children : this.rootElements) + 1) * levelWeight;
                        levelWeight /= LEVEL_STEP;
                    }
                    elements[idx]._zIndex = zIndex;
                }
            },
            optionsChange: function (e) {
                if (e.field == 'transform' || e.field == 'stroke.width') {
                    this.bboxChange(e.element);
                }
            },
            geometryChange: function (e) {
                this.bboxChange(e.element);
            },
            bboxChange: function (element) {
                if (element.nodeType === 'Group') {
                    for (var idx = 0; idx < element.children.length; idx++) {
                        this.bboxChange(element.children[idx]);
                    }
                } else {
                    if (element._quadNode) {
                        element._quadNode.remove(element);
                    }
                    this._insertShape(element);
                }
            },
            add: function (elements) {
                var elementsArray = isArray(elements) ? elements.slice(0) : [elements];
                this.rootElements.push.apply(this.rootElements, elementsArray);
                this._insert(elementsArray);
            },
            childrenChange: function (e) {
                if (e.action == 'remove') {
                    for (var idx = 0; idx < e.items.length; idx++) {
                        this.remove(e.items[idx]);
                    }
                } else {
                    this._insert(Array.prototype.slice.call(e.items, 0));
                }
            },
            _insert: function (elements) {
                var element;
                while (elements.length > 0) {
                    element = elements.pop();
                    element.addObserver(this);
                    if (element.nodeType == 'Group') {
                        elements.push.apply(elements, element.children);
                    } else {
                        this._insertShape(element);
                    }
                }
            },
            _insertShape: function (shape) {
                var bbox = shape.bbox();
                if (bbox) {
                    var rootSize = this.ROOT_SIZE;
                    var sectors = this.getSectors(bbox);
                    var x = sectors[0][0];
                    var y = sectors[1][0];
                    if (this.inRoot(sectors)) {
                        this.root.insert(shape, bbox);
                    } else {
                        if (!this.rootMap[x]) {
                            this.rootMap[x] = {};
                        }
                        if (!this.rootMap[x][y]) {
                            this.rootMap[x][y] = new QuadNode(new Rect([
                                x * rootSize,
                                y * rootSize
                            ], [
                                rootSize,
                                rootSize
                            ]));
                        }
                        this.rootMap[x][y].insert(shape, bbox);
                    }
                }
            },
            remove: function (element) {
                element.removeObserver(this);
                if (element.nodeType == 'Group') {
                    var children = element.children;
                    for (var idx = 0; idx < children.length; idx++) {
                        this.remove(children[idx]);
                    }
                } else if (element._quadNode) {
                    element._quadNode.remove(element);
                    delete element._quadNode;
                }
            },
            inRoot: function (sectors) {
                return sectors[0].length > 1 || sectors[1].length > 1;
            },
            getSectors: function (rect) {
                var rootSize = this.ROOT_SIZE;
                var bottomRight = rect.bottomRight();
                var bottomX = math.floor(bottomRight.x / rootSize);
                var bottomY = math.floor(bottomRight.y / rootSize);
                var sectors = [
                    [],
                    []
                ];
                for (var x = math.floor(rect.origin.x / rootSize); x <= bottomX; x++) {
                    sectors[0].push(x);
                }
                for (var y = math.floor(rect.origin.y / rootSize); y <= bottomY; y++) {
                    sectors[1].push(y);
                }
                return sectors;
            }
        });
        function zIndexComparer(x1, x2) {
            if (x1._zIndex < x2._zIndex) {
                return 1;
            }
            if (x1._zIndex > x2._zIndex) {
                return -1;
            }
            return 0;
        }
        deepExtend(drawing, {
            ShapesQuadTree: ShapesQuadTree,
            QuadNode: QuadNode
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/svg', [
        'drawing/shapes',
        'util/main'
    ], f);
}(function () {
    (function ($) {
        var doc = document, kendo = window.kendo, deepExtend = kendo.deepExtend, g = kendo.geometry, d = kendo.drawing, BaseNode = d.BaseNode, util = kendo.util, defined = util.defined, isTransparent = util.isTransparent, renderAttr = util.renderAttr, renderAllAttr = util.renderAllAttr, renderTemplate = util.renderTemplate, inArray = $.inArray;
        var BUTT = 'butt', DASH_ARRAYS = d.DASH_ARRAYS, GRADIENT = 'gradient', NONE = 'none', NS = '.kendo', SOLID = 'solid', SPACE = ' ', SVG_NS = 'http://www.w3.org/2000/svg', TRANSFORM = 'transform', UNDEFINED = 'undefined';
        var Surface = d.Surface.extend({
            init: function (element, options) {
                d.Surface.fn.init.call(this, element, options);
                this._root = new RootNode(this.options);
                renderSVG(this.element[0], this._template(this));
                this._rootElement = this.element[0].firstElementChild;
                alignToScreen(this._rootElement);
                this._root.attachTo(this._rootElement);
                this.element.on('click' + NS, this._click);
                this.element.on('mouseover' + NS, this._mouseenter);
                this.element.on('mouseout' + NS, this._mouseleave);
                this.element.on('mousemove' + NS, this._mousemove);
                this.resize();
            },
            type: 'svg',
            destroy: function () {
                if (this._root) {
                    this._root.destroy();
                    this._root = null;
                    this._rootElement = null;
                    this.element.off(NS);
                }
                d.Surface.fn.destroy.call(this);
            },
            translate: function (offset) {
                var viewBox = kendo.format('{0} {1} {2} {3}', Math.round(offset.x), Math.round(offset.y), this._size.width, this._size.height);
                this._offset = offset;
                this._rootElement.setAttribute('viewBox', viewBox);
            },
            draw: function (element) {
                d.Surface.fn.draw.call(this, element);
                this._root.load([element]);
            },
            clear: function () {
                d.Surface.fn.clear.call(this);
                this._root.clear();
            },
            svg: function () {
                return '<?xml version=\'1.0\' ?>' + this._template(this);
            },
            exportVisual: function () {
                var visual = this._visual;
                var offset = this._offset;
                if (offset) {
                    var wrap = new d.Group();
                    wrap.children.push(visual);
                    wrap.transform(g.transform().translate(-offset.x, -offset.y));
                    visual = wrap;
                }
                return visual;
            },
            _resize: function () {
                if (this._offset) {
                    this.translate(this._offset);
                }
            },
            _template: renderTemplate('<svg style=\'width: 100%; height: 100%; overflow: hidden;\' ' + 'xmlns=\'' + SVG_NS + '\' ' + 'xmlns:xlink=\'http://www.w3.org/1999/xlink\' ' + 'version=\'1.1\'>#= d._root.render() #</svg>')
        });
        var Node = BaseNode.extend({
            init: function (srcElement) {
                BaseNode.fn.init.call(this, srcElement);
                this.definitions = {};
            },
            destroy: function () {
                if (this.element) {
                    this.element._kendoNode = null;
                    this.element = null;
                }
                this.clearDefinitions();
                BaseNode.fn.destroy.call(this);
            },
            load: function (elements, pos) {
                var node = this, element = node.element, childNode, srcElement, children, i;
                for (i = 0; i < elements.length; i++) {
                    srcElement = elements[i];
                    children = srcElement.children;
                    childNode = new nodeMap[srcElement.nodeType](srcElement);
                    if (defined(pos)) {
                        node.insertAt(childNode, pos);
                    } else {
                        node.append(childNode);
                    }
                    childNode.createDefinitions();
                    if (children && children.length > 0) {
                        childNode.load(children);
                    }
                    if (element) {
                        childNode.attachTo(element, pos);
                    }
                }
            },
            root: function () {
                var root = this;
                while (root.parent) {
                    root = root.parent;
                }
                return root;
            },
            attachTo: function (domElement, pos) {
                var container = doc.createElement('div');
                renderSVG(container, '<svg xmlns=\'' + SVG_NS + '\' version=\'1.1\'>' + this.render() + '</svg>');
                var element = container.firstChild.firstChild;
                if (element) {
                    if (defined(pos)) {
                        domElement.insertBefore(element, domElement.childNodes[pos] || null);
                    } else {
                        domElement.appendChild(element);
                    }
                    this.setElement(element);
                }
            },
            setElement: function (element) {
                var nodes = this.childNodes, childElement, i;
                if (this.element) {
                    this.element._kendoNode = null;
                }
                this.element = element;
                this.element._kendoNode = this;
                for (i = 0; i < nodes.length; i++) {
                    childElement = element.childNodes[i];
                    nodes[i].setElement(childElement);
                }
            },
            clear: function () {
                this.clearDefinitions();
                if (this.element) {
                    this.element.innerHTML = '';
                }
                var children = this.childNodes;
                for (var i = 0; i < children.length; i++) {
                    children[i].destroy();
                }
                this.childNodes = [];
            },
            removeSelf: function () {
                if (this.element) {
                    var parentNode = this.element.parentNode;
                    if (parentNode) {
                        parentNode.removeChild(this.element);
                    }
                    this.element = null;
                }
                BaseNode.fn.removeSelf.call(this);
            },
            template: renderTemplate('#= d.renderChildren() #'),
            render: function () {
                return this.template(this);
            },
            renderChildren: function () {
                var nodes = this.childNodes, output = '', i;
                for (i = 0; i < nodes.length; i++) {
                    output += nodes[i].render();
                }
                return output;
            },
            optionsChange: function (e) {
                var field = e.field;
                var value = e.value;
                if (field === 'visible') {
                    this.css('display', value ? '' : NONE);
                } else if (DefinitionMap[field] && isDefinition(field, value)) {
                    this.updateDefinition(field, value);
                } else if (field === 'opacity') {
                    this.attr('opacity', value);
                }
                BaseNode.fn.optionsChange.call(this, e);
            },
            attr: function (name, value) {
                if (this.element) {
                    this.element.setAttribute(name, value);
                }
            },
            allAttr: function (attrs) {
                for (var i = 0; i < attrs.length; i++) {
                    this.attr(attrs[i][0], attrs[i][1]);
                }
            },
            css: function (name, value) {
                if (this.element) {
                    this.element.style[name] = value;
                }
            },
            allCss: function (styles) {
                for (var i = 0; i < styles.length; i++) {
                    this.css(styles[i][0], styles[i][1]);
                }
            },
            removeAttr: function (name) {
                if (this.element) {
                    this.element.removeAttribute(name);
                }
            },
            mapTransform: function (transform) {
                var attrs = [];
                if (transform) {
                    attrs.push([
                        TRANSFORM,
                        'matrix(' + transform.matrix().toString(6) + ')'
                    ]);
                }
                return attrs;
            },
            renderTransform: function () {
                return renderAllAttr(this.mapTransform(this.srcElement.transform()));
            },
            transformChange: function (value) {
                if (value) {
                    this.allAttr(this.mapTransform(value));
                } else {
                    this.removeAttr(TRANSFORM);
                }
            },
            mapStyle: function () {
                var options = this.srcElement.options;
                var style = [[
                        'cursor',
                        options.cursor
                    ]];
                if (options.visible === false) {
                    style.push([
                        'display',
                        NONE
                    ]);
                }
                return style;
            },
            renderStyle: function () {
                return renderAttr('style', util.renderStyle(this.mapStyle(true)));
            },
            renderOpacity: function () {
                return renderAttr('opacity', this.srcElement.options.opacity);
            },
            createDefinitions: function () {
                var srcElement = this.srcElement;
                var definitions = this.definitions;
                var definition, field, options, hasDefinitions;
                if (srcElement) {
                    options = srcElement.options;
                    for (field in DefinitionMap) {
                        definition = options.get(field);
                        if (definition && isDefinition(field, definition)) {
                            definitions[field] = definition;
                            hasDefinitions = true;
                        }
                    }
                    if (hasDefinitions) {
                        this.definitionChange({
                            action: 'add',
                            definitions: definitions
                        });
                    }
                }
            },
            definitionChange: function (e) {
                if (this.parent) {
                    this.parent.definitionChange(e);
                }
            },
            updateDefinition: function (type, value) {
                var definitions = this.definitions;
                var current = definitions[type];
                var attr = DefinitionMap[type];
                var definition = {};
                if (current) {
                    definition[type] = current;
                    this.definitionChange({
                        action: 'remove',
                        definitions: definition
                    });
                    delete definitions[type];
                }
                if (!value) {
                    if (current) {
                        this.removeAttr(attr);
                    }
                } else {
                    definition[type] = value;
                    this.definitionChange({
                        action: 'add',
                        definitions: definition
                    });
                    definitions[type] = value;
                    this.attr(attr, refUrl(value.id));
                }
            },
            clearDefinitions: function () {
                var definitions = this.definitions;
                var field;
                for (field in definitions) {
                    this.definitionChange({
                        action: 'remove',
                        definitions: definitions
                    });
                    this.definitions = {};
                    break;
                }
            },
            renderDefinitions: function () {
                return renderAllAttr(this.mapDefinitions());
            },
            mapDefinitions: function () {
                var definitions = this.definitions;
                var attrs = [];
                var field;
                for (field in definitions) {
                    attrs.push([
                        DefinitionMap[field],
                        refUrl(definitions[field].id)
                    ]);
                }
                return attrs;
            }
        });
        var RootNode = Node.extend({
            init: function (options) {
                Node.fn.init.call(this);
                this.options = options;
                this.defs = new DefinitionNode();
            },
            attachTo: function (domElement) {
                this.element = domElement;
                this.defs.attachTo(domElement.firstElementChild);
            },
            clear: function () {
                BaseNode.fn.clear.call(this);
            },
            template: renderTemplate('#=d.defs.render()##= d.renderChildren() #'),
            definitionChange: function (e) {
                this.defs.definitionChange(e);
            }
        });
        var DefinitionNode = Node.extend({
            init: function () {
                Node.fn.init.call(this);
                this.definitionMap = {};
            },
            attachTo: function (domElement) {
                this.element = domElement;
            },
            template: renderTemplate('<defs>#= d.renderChildren()#</defs>'),
            definitionChange: function (e) {
                var definitions = e.definitions;
                var action = e.action;
                if (action == 'add') {
                    this.addDefinitions(definitions);
                } else if (action == 'remove') {
                    this.removeDefinitions(definitions);
                }
            },
            createDefinition: function (type, item) {
                var nodeType;
                if (type == 'clip') {
                    nodeType = ClipNode;
                } else if (type == 'fill') {
                    if (item instanceof d.LinearGradient) {
                        nodeType = LinearGradientNode;
                    } else if (item instanceof d.RadialGradient) {
                        nodeType = RadialGradientNode;
                    }
                }
                return new nodeType(item);
            },
            addDefinitions: function (definitions) {
                for (var field in definitions) {
                    this.addDefinition(field, definitions[field]);
                }
            },
            addDefinition: function (type, srcElement) {
                var definitionMap = this.definitionMap;
                var id = srcElement.id;
                var element = this.element;
                var node, mapItem;
                mapItem = definitionMap[id];
                if (!mapItem) {
                    node = this.createDefinition(type, srcElement);
                    definitionMap[id] = {
                        element: node,
                        count: 1
                    };
                    this.append(node);
                    if (element) {
                        node.attachTo(this.element);
                    }
                } else {
                    mapItem.count++;
                }
            },
            removeDefinitions: function (definitions) {
                for (var field in definitions) {
                    this.removeDefinition(definitions[field]);
                }
            },
            removeDefinition: function (srcElement) {
                var definitionMap = this.definitionMap;
                var id = srcElement.id;
                var mapItem;
                mapItem = definitionMap[id];
                if (mapItem) {
                    mapItem.count--;
                    if (mapItem.count === 0) {
                        this.remove(inArray(mapItem.element, this.childNodes), 1);
                        delete definitionMap[id];
                    }
                }
            }
        });
        var ClipNode = Node.extend({
            init: function (srcElement) {
                Node.fn.init.call(this);
                this.srcElement = srcElement;
                this.id = srcElement.id;
                this.load([srcElement]);
            },
            template: renderTemplate('<clipPath id=\'#=d.id#\'>#= d.renderChildren()#</clipPath>')
        });
        var GroupNode = Node.extend({
            template: renderTemplate('<g#= d.renderTransform() + d.renderStyle() + d.renderOpacity() + d.renderDefinitions()#>#= d.renderChildren() #</g>'),
            optionsChange: function (e) {
                if (e.field == TRANSFORM) {
                    this.transformChange(e.value);
                }
                Node.fn.optionsChange.call(this, e);
            }
        });
        var PathNode = Node.extend({
            geometryChange: function () {
                this.attr('d', this.renderData());
                this.invalidate();
            },
            optionsChange: function (e) {
                switch (e.field) {
                case 'fill':
                    if (e.value) {
                        this.allAttr(this.mapFill(e.value));
                    } else {
                        this.removeAttr('fill');
                    }
                    break;
                case 'fill.color':
                    this.allAttr(this.mapFill({ color: e.value }));
                    break;
                case 'stroke':
                    if (e.value) {
                        this.allAttr(this.mapStroke(e.value));
                    } else {
                        this.removeAttr('stroke');
                    }
                    break;
                case TRANSFORM:
                    this.transformChange(e.value);
                    break;
                default:
                    var name = this.attributeMap[e.field];
                    if (name) {
                        this.attr(name, e.value);
                    }
                    break;
                }
                Node.fn.optionsChange.call(this, e);
            },
            attributeMap: {
                'fill.opacity': 'fill-opacity',
                'stroke.color': 'stroke',
                'stroke.width': 'stroke-width',
                'stroke.opacity': 'stroke-opacity'
            },
            content: function () {
                if (this.element) {
                    this.element.textContent = this.srcElement.content();
                }
            },
            renderData: function () {
                return this.printPath(this.srcElement);
            },
            printPath: function (path) {
                var segments = path.segments, length = segments.length;
                if (length > 0) {
                    var parts = [], output, segmentType, currentType, i;
                    for (i = 1; i < length; i++) {
                        segmentType = this.segmentType(segments[i - 1], segments[i]);
                        if (segmentType !== currentType) {
                            currentType = segmentType;
                            parts.push(segmentType);
                        }
                        if (segmentType === 'L') {
                            parts.push(this.printPoints(segments[i].anchor()));
                        } else {
                            parts.push(this.printPoints(segments[i - 1].controlOut(), segments[i].controlIn(), segments[i].anchor()));
                        }
                    }
                    output = 'M' + this.printPoints(segments[0].anchor()) + SPACE + parts.join(SPACE);
                    if (path.options.closed) {
                        output += 'Z';
                    }
                    return output;
                }
            },
            printPoints: function () {
                var points = arguments, length = points.length, i, result = [];
                for (i = 0; i < length; i++) {
                    result.push(points[i].toString(3));
                }
                return result.join(SPACE);
            },
            segmentType: function (segmentStart, segmentEnd) {
                return segmentStart.controlOut() && segmentEnd.controlIn() ? 'C' : 'L';
            },
            mapStroke: function (stroke) {
                var attrs = [];
                if (stroke && !isTransparent(stroke.color)) {
                    attrs.push([
                        'stroke',
                        stroke.color
                    ]);
                    attrs.push([
                        'stroke-width',
                        stroke.width
                    ]);
                    attrs.push([
                        'stroke-linecap',
                        this.renderLinecap(stroke)
                    ]);
                    attrs.push([
                        'stroke-linejoin',
                        stroke.lineJoin
                    ]);
                    if (defined(stroke.opacity)) {
                        attrs.push([
                            'stroke-opacity',
                            stroke.opacity
                        ]);
                    }
                    if (defined(stroke.dashType)) {
                        attrs.push([
                            'stroke-dasharray',
                            this.renderDashType(stroke)
                        ]);
                    }
                } else {
                    attrs.push([
                        'stroke',
                        NONE
                    ]);
                }
                return attrs;
            },
            renderStroke: function () {
                return renderAllAttr(this.mapStroke(this.srcElement.options.stroke));
            },
            renderDashType: function (stroke) {
                var width = stroke.width || 1, dashType = stroke.dashType;
                if (dashType && dashType != SOLID) {
                    var dashArray = DASH_ARRAYS[dashType.toLowerCase()], result = [], i;
                    for (i = 0; i < dashArray.length; i++) {
                        result.push(dashArray[i] * width);
                    }
                    return result.join(' ');
                }
            },
            renderLinecap: function (stroke) {
                var dashType = stroke.dashType, lineCap = stroke.lineCap;
                return dashType && dashType != SOLID ? BUTT : lineCap;
            },
            mapFill: function (fill) {
                var attrs = [];
                if (!(fill && fill.nodeType == GRADIENT)) {
                    if (fill && !isTransparent(fill.color)) {
                        attrs.push([
                            'fill',
                            fill.color
                        ]);
                        if (defined(fill.opacity)) {
                            attrs.push([
                                'fill-opacity',
                                fill.opacity
                            ]);
                        }
                    } else {
                        attrs.push([
                            'fill',
                            NONE
                        ]);
                    }
                }
                return attrs;
            },
            renderFill: function () {
                return renderAllAttr(this.mapFill(this.srcElement.options.fill));
            },
            template: renderTemplate('<path #= d.renderStyle() # #= d.renderOpacity() # ' + '#= kendo.util.renderAttr(\'d\', d.renderData()) # ' + '#= d.renderStroke() # ' + '#= d.renderFill() # ' + '#= d.renderDefinitions() # ' + '#= d.renderTransform() #></path>')
        });
        var ArcNode = PathNode.extend({
            renderData: function () {
                return this.printPath(this.srcElement.toPath());
            }
        });
        var MultiPathNode = PathNode.extend({
            renderData: function () {
                var paths = this.srcElement.paths;
                if (paths.length > 0) {
                    var result = [], i;
                    for (i = 0; i < paths.length; i++) {
                        result.push(this.printPath(paths[i]));
                    }
                    return result.join(' ');
                }
            }
        });
        var CircleNode = PathNode.extend({
            geometryChange: function () {
                var center = this.center();
                this.attr('cx', center.x);
                this.attr('cy', center.y);
                this.attr('r', this.radius());
                this.invalidate();
            },
            center: function () {
                return this.srcElement.geometry().center;
            },
            radius: function () {
                return this.srcElement.geometry().radius;
            },
            template: renderTemplate('<circle #= d.renderStyle() # #= d.renderOpacity() # ' + 'cx=\'#= d.center().x #\' cy=\'#= d.center().y #\' ' + 'r=\'#= d.radius() #\' ' + '#= d.renderStroke() # ' + '#= d.renderFill() # ' + '#= d.renderDefinitions() # ' + '#= d.renderTransform() # ></circle>')
        });
        var TextNode = PathNode.extend({
            geometryChange: function () {
                var pos = this.pos();
                this.attr('x', pos.x);
                this.attr('y', pos.y);
                this.invalidate();
            },
            optionsChange: function (e) {
                if (e.field === 'font') {
                    this.attr('style', util.renderStyle(this.mapStyle()));
                    this.geometryChange();
                } else if (e.field === 'content') {
                    PathNode.fn.content.call(this, this.srcElement.content());
                }
                PathNode.fn.optionsChange.call(this, e);
            },
            mapStyle: function (encode) {
                var style = PathNode.fn.mapStyle.call(this, encode);
                var font = this.srcElement.options.font;
                if (encode) {
                    font = kendo.htmlEncode(font);
                }
                style.push([
                    'font',
                    font
                ]);
                return style;
            },
            pos: function () {
                var pos = this.srcElement.position();
                var size = this.srcElement.measure();
                return pos.clone().setY(pos.y + size.baseline);
            },
            renderContent: function () {
                var content = this.srcElement.content();
                content = decodeEntities(content);
                content = kendo.htmlEncode(content);
                return content;
            },
            template: renderTemplate('<text #= d.renderStyle() # #= d.renderOpacity() # ' + 'x=\'#= this.pos().x #\' y=\'#= this.pos().y #\' ' + '#= d.renderStroke() # ' + '#= d.renderTransform() # ' + '#= d.renderDefinitions() # ' + '#= d.renderFill() #>#= d.renderContent() #</text>')
        });
        var ImageNode = PathNode.extend({
            geometryChange: function () {
                this.allAttr(this.mapPosition());
                this.invalidate();
            },
            optionsChange: function (e) {
                if (e.field === 'src') {
                    this.allAttr(this.mapSource());
                }
                PathNode.fn.optionsChange.call(this, e);
            },
            mapPosition: function () {
                var rect = this.srcElement.rect();
                var tl = rect.topLeft();
                return [
                    [
                        'x',
                        tl.x
                    ],
                    [
                        'y',
                        tl.y
                    ],
                    [
                        'width',
                        rect.width() + 'px'
                    ],
                    [
                        'height',
                        rect.height() + 'px'
                    ]
                ];
            },
            renderPosition: function () {
                return renderAllAttr(this.mapPosition());
            },
            mapSource: function (encode) {
                var src = this.srcElement.src();
                if (encode) {
                    src = kendo.htmlEncode(src);
                }
                return [[
                        'xlink:href',
                        src
                    ]];
            },
            renderSource: function () {
                return renderAllAttr(this.mapSource(true));
            },
            template: renderTemplate('<image preserveAspectRatio=\'none\' #= d.renderStyle() # #= d.renderTransform()# #= d.renderOpacity() # ' + '#= d.renderPosition() # #= d.renderSource() # #= d.renderDefinitions()#>' + '</image>')
        });
        var GradientStopNode = Node.extend({
            template: renderTemplate('<stop #=d.renderOffset()# #=d.renderStyle()# />'),
            renderOffset: function () {
                return renderAttr('offset', this.srcElement.offset());
            },
            mapStyle: function () {
                var srcElement = this.srcElement;
                return [
                    [
                        'stop-color',
                        srcElement.color()
                    ],
                    [
                        'stop-opacity',
                        srcElement.opacity()
                    ]
                ];
            },
            optionsChange: function (e) {
                if (e.field == 'offset') {
                    this.attr(e.field, e.value);
                } else if (e.field == 'color' || e.field == 'opacity') {
                    this.css('stop-' + e.field, e.value);
                }
            }
        });
        var GradientNode = Node.extend({
            init: function (srcElement) {
                Node.fn.init.call(this, srcElement);
                this.id = srcElement.id;
                this.loadStops();
            },
            loadStops: function () {
                var srcElement = this.srcElement;
                var stops = srcElement.stops;
                var element = this.element;
                var stopNode;
                var idx;
                for (idx = 0; idx < stops.length; idx++) {
                    stopNode = new GradientStopNode(stops[idx]);
                    this.append(stopNode);
                    if (element) {
                        stopNode.attachTo(element);
                    }
                }
            },
            optionsChange: function (e) {
                if (e.field == 'gradient.stops') {
                    BaseNode.fn.clear.call(this);
                    this.loadStops();
                } else if (e.field == GRADIENT) {
                    this.allAttr(this.mapCoordinates());
                }
            },
            renderCoordinates: function () {
                return renderAllAttr(this.mapCoordinates());
            },
            mapSpace: function () {
                return [
                    'gradientUnits',
                    this.srcElement.userSpace() ? 'userSpaceOnUse' : 'objectBoundingBox'
                ];
            }
        });
        var LinearGradientNode = GradientNode.extend({
            template: renderTemplate('<linearGradient id=\'#=d.id#\' #=d.renderCoordinates()#>' + '#= d.renderChildren()#' + '</linearGradient>'),
            mapCoordinates: function () {
                var srcElement = this.srcElement;
                var start = srcElement.start();
                var end = srcElement.end();
                var attrs = [
                    [
                        'x1',
                        start.x
                    ],
                    [
                        'y1',
                        start.y
                    ],
                    [
                        'x2',
                        end.x
                    ],
                    [
                        'y2',
                        end.y
                    ],
                    this.mapSpace()
                ];
                return attrs;
            }
        });
        var RadialGradientNode = GradientNode.extend({
            template: renderTemplate('<radialGradient id=\'#=d.id#\' #=d.renderCoordinates()#>' + '#= d.renderChildren()#' + '</radialGradient>'),
            mapCoordinates: function () {
                var srcElement = this.srcElement;
                var center = srcElement.center();
                var radius = srcElement.radius();
                var attrs = [
                    [
                        'cx',
                        center.x
                    ],
                    [
                        'cy',
                        center.y
                    ],
                    [
                        'r',
                        radius
                    ],
                    this.mapSpace()
                ];
                return attrs;
            }
        });
        var RectNode = PathNode.extend({
            geometryChange: function () {
                var geometry = this.srcElement.geometry();
                this.attr('x', geometry.origin.x);
                this.attr('y', geometry.origin.y);
                this.attr('width', geometry.size.width);
                this.attr('height', geometry.size.height);
                this.invalidate();
            },
            size: function () {
                return this.srcElement.geometry().size;
            },
            origin: function () {
                return this.srcElement.geometry().origin;
            },
            template: renderTemplate('<rect #= d.renderStyle() # #= d.renderOpacity() # ' + 'x=\'#= d.origin().x #\' y=\'#= d.origin().y #\' ' + 'width=\'#= d.size().width #\' height=\'#= d.size().height #\'' + '#= d.renderStroke() # ' + '#= d.renderFill() # ' + '#= d.renderDefinitions() # ' + '#= d.renderTransform() # />')
        });
        var nodeMap = {
            Group: GroupNode,
            Text: TextNode,
            Path: PathNode,
            MultiPath: MultiPathNode,
            Circle: CircleNode,
            Arc: ArcNode,
            Image: ImageNode,
            Rect: RectNode
        };
        var renderSVG = function (container, svg) {
            container.innerHTML = svg;
        };
        (function () {
            var testFragment = '<svg xmlns=\'' + SVG_NS + '\'></svg>', testContainer = doc.createElement('div'), hasParser = typeof DOMParser != UNDEFINED;
            testContainer.innerHTML = testFragment;
            if (hasParser && testContainer.firstChild.namespaceURI != SVG_NS) {
                renderSVG = function (container, svg) {
                    var parser = new DOMParser(), chartDoc = parser.parseFromString(svg, 'text/xml'), importedDoc = doc.adoptNode(chartDoc.documentElement);
                    container.innerHTML = '';
                    container.appendChild(importedDoc);
                };
            }
        }());
        function alignToScreen(element) {
            var ctm;
            try {
                ctm = element.getScreenCTM ? element.getScreenCTM() : null;
            } catch (e) {
            }
            if (ctm) {
                var left = -ctm.e % 1, top = -ctm.f % 1, style = element.style;
                if (left !== 0 || top !== 0) {
                    style.left = left + 'px';
                    style.top = top + 'px';
                }
            }
        }
        function baseUrl() {
            var base = document.getElementsByTagName('base')[0], url = '', href = document.location.href, hashIndex = href.indexOf('#');
            if (base && !kendo.support.browser.msie) {
                if (hashIndex !== -1) {
                    href = href.substring(0, hashIndex);
                }
                url = href;
            }
            return url;
        }
        function refUrl(id) {
            return 'url(' + baseUrl() + '#' + id + ')';
        }
        function exportGroup(group) {
            var root = new RootNode();
            var bbox = group.clippedBBox();
            if (bbox) {
                var origin = bbox.getOrigin();
                var exportRoot = new d.Group();
                exportRoot.transform(g.transform().translate(-origin.x, -origin.y));
                exportRoot.children.push(group);
                group = exportRoot;
            }
            root.load([group]);
            var svg = '<?xml version=\'1.0\' ?>' + '<svg xmlns=\'' + SVG_NS + '\' ' + 'xmlns:xlink=\'http://www.w3.org/1999/xlink\' ' + 'version=\'1.1\'>' + root.render() + '</svg>';
            root.destroy();
            return svg;
        }
        function exportSVG(group, options) {
            var svg = exportGroup(group);
            if (!options || !options.raw) {
                svg = 'data:image/svg+xml;base64,' + util.encodeBase64(svg);
            }
            return $.Deferred().resolve(svg).promise();
        }
        function isDefinition(type, value) {
            return type == 'clip' || type == 'fill' && (!value || value.nodeType == GRADIENT);
        }
        function decodeEntities(text) {
            if (!text || !text.indexOf || text.indexOf('&') < 0) {
                return text;
            } else {
                var element = decodeEntities._element;
                element.innerHTML = text;
                return element.textContent || element.innerText;
            }
        }
        decodeEntities._element = document.createElement('span');
        var DefinitionMap = {
            clip: 'clip-path',
            fill: 'fill'
        };
        kendo.support.svg = function () {
            return doc.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
        }();
        if (kendo.support.svg) {
            d.SurfaceFactory.current.register('svg', Surface, 10);
        }
        deepExtend(d, {
            exportSVG: exportSVG,
            svg: {
                ArcNode: ArcNode,
                CircleNode: CircleNode,
                ClipNode: ClipNode,
                DefinitionNode: DefinitionNode,
                GradientStopNode: GradientStopNode,
                GroupNode: GroupNode,
                ImageNode: ImageNode,
                LinearGradientNode: LinearGradientNode,
                MultiPathNode: MultiPathNode,
                Node: Node,
                PathNode: PathNode,
                RadialGradientNode: RadialGradientNode,
                RectNode: RectNode,
                RootNode: RootNode,
                Surface: Surface,
                TextNode: TextNode,
                _exportGroup: exportGroup
            }
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/canvas', [
        'drawing/search',
        'kendo.color'
    ], f);
}(function () {
    (function ($) {
        var doc = document, kendo = window.kendo, deepExtend = kendo.deepExtend, util = kendo.util, defined = util.defined, isTransparent = util.isTransparent, renderTemplate = util.renderTemplate, valueOrDefault = util.valueOrDefault, g = kendo.geometry, d = kendo.drawing, BaseNode = d.BaseNode, proxy = $.proxy;
        var BUTT = 'butt', DASH_ARRAYS = d.DASH_ARRAYS, FRAME_DELAY = 1000 / 60, SOLID = 'solid', NS = '.kendo';
        var Surface = d.Surface.extend({
            init: function (element, options) {
                d.Surface.fn.init.call(this, element, options);
                this.element[0].innerHTML = this._template(this);
                var canvas = this.element[0].firstElementChild;
                canvas.width = $(element).width();
                canvas.height = $(element).height();
                this._rootElement = canvas;
                this._root = new RootNode(canvas);
            },
            destroy: function () {
                d.Surface.fn.destroy.call(this);
                if (this._root) {
                    this._root.destroy();
                    this._root = null;
                }
                if (this._searchTree) {
                    this._searchTree.clear();
                    delete this._searchTree;
                }
                this.element.off(NS);
            },
            type: 'canvas',
            draw: function (element) {
                d.Surface.fn.draw.call(this, element);
                this._root.load([element], undefined, this.options.cors);
                if (this._searchTree) {
                    this._searchTree.add([element]);
                }
            },
            clear: function () {
                d.Surface.fn.clear.call(this);
                this._root.clear();
                if (this._searchTree) {
                    this._searchTree.clear();
                }
            },
            eventTarget: function (e) {
                if (this._searchTree) {
                    var point = this._surfacePoint(e);
                    var shape = this._searchTree.pointShape(point);
                    return shape;
                }
            },
            image: function () {
                var root = this._root;
                var rootElement = this._rootElement;
                var loadingStates = [];
                root.traverse(function (childNode) {
                    if (childNode.loading) {
                        loadingStates.push(childNode.loading);
                    }
                });
                var defer = $.Deferred();
                $.when.apply($, loadingStates).done(function () {
                    root._invalidate();
                    try {
                        var data = rootElement.toDataURL();
                        defer.resolve(data);
                    } catch (e) {
                        defer.reject(e);
                    }
                }).fail(function (e) {
                    defer.reject(e);
                });
                return defer.promise();
            },
            suspendTracking: function () {
                d.Surface.fn.suspendTracking.call(this);
                if (this._searchTree) {
                    this._searchTree.clear();
                    delete this._searchTree;
                }
            },
            resumeTracking: function () {
                d.Surface.fn.resumeTracking.call(this);
                if (!this._searchTree) {
                    this._searchTree = new d.ShapesQuadTree();
                    var childNodes = this._root.childNodes;
                    var rootElements = [];
                    for (var idx = 0; idx < childNodes.length; idx++) {
                        rootElements.push(childNodes[idx].srcElement);
                    }
                    this._searchTree.add(rootElements);
                }
            },
            _resize: function () {
                this._rootElement.width = this._size.width;
                this._rootElement.height = this._size.height;
                this._root.invalidate();
            },
            _template: renderTemplate('<canvas style=\'width: 100%; height: 100%;\'></canvas>'),
            _enableTracking: function () {
                this._searchTree = new d.ShapesQuadTree();
                this._mouseTrackHandler = proxy(this._trackMouse, this);
                this.element.on('click' + NS, this._mouseTrackHandler);
                this.element.on('mousemove' + NS, this._mouseTrackHandler);
                d.Surface.fn._enableTracking.call(this);
            },
            _trackMouse: function (e) {
                if (this._suspendedTracking) {
                    return;
                }
                var shape = this.eventTarget(e);
                if (e.type != 'click') {
                    var currentShape = this._currentShape;
                    if (currentShape && currentShape !== shape) {
                        this.trigger('mouseleave', {
                            element: currentShape,
                            originalEvent: e,
                            type: 'mouseleave'
                        });
                    }
                    if (shape && currentShape !== shape) {
                        this.trigger('mouseenter', {
                            element: shape,
                            originalEvent: e,
                            type: 'mouseenter'
                        });
                    }
                    this.trigger('mousemove', {
                        element: shape,
                        originalEvent: e,
                        type: 'mousemove'
                    });
                    this._currentShape = shape;
                } else if (shape) {
                    this.trigger('click', {
                        element: shape,
                        originalEvent: e,
                        type: 'click'
                    });
                }
            }
        });
        var Node = BaseNode.extend({
            init: function (srcElement) {
                BaseNode.fn.init.call(this, srcElement);
                if (srcElement) {
                    this.initClip();
                }
            },
            initClip: function () {
                var clip = this.srcElement.clip();
                if (clip) {
                    this.clip = clip;
                    clip.addObserver(this);
                }
            },
            clear: function () {
                if (this.srcElement) {
                    this.srcElement.removeObserver(this);
                }
                this.clearClip();
                BaseNode.fn.clear.call(this);
            },
            clearClip: function () {
                if (this.clip) {
                    this.clip.removeObserver(this);
                    delete this.clip;
                }
            },
            setClip: function (ctx) {
                if (this.clip) {
                    ctx.beginPath();
                    PathNode.fn.renderPoints(ctx, this.clip);
                    ctx.clip();
                }
            },
            optionsChange: function (e) {
                if (e.field == 'clip') {
                    this.clearClip();
                    this.initClip();
                }
                BaseNode.fn.optionsChange.call(this, e);
            },
            setTransform: function (ctx) {
                if (this.srcElement) {
                    var transform = this.srcElement.transform();
                    if (transform) {
                        ctx.transform.apply(ctx, transform.matrix().toArray(6));
                    }
                }
            },
            loadElements: function (elements, pos, cors) {
                var node = this, childNode, srcElement, children, i;
                for (i = 0; i < elements.length; i++) {
                    srcElement = elements[i];
                    children = srcElement.children;
                    childNode = new nodeMap[srcElement.nodeType](srcElement, cors);
                    if (children && children.length > 0) {
                        childNode.load(children, pos, cors);
                    }
                    if (defined(pos)) {
                        node.insertAt(childNode, pos);
                    } else {
                        node.append(childNode);
                    }
                }
            },
            load: function (elements, pos, cors) {
                this.loadElements(elements, pos, cors);
                this.invalidate();
            },
            setOpacity: function (ctx) {
                if (this.srcElement) {
                    var opacity = this.srcElement.opacity();
                    if (defined(opacity)) {
                        this.globalAlpha(ctx, opacity);
                    }
                }
            },
            globalAlpha: function (ctx, value) {
                if (value && ctx.globalAlpha) {
                    value *= ctx.globalAlpha;
                }
                ctx.globalAlpha = value;
            },
            visible: function () {
                var src = this.srcElement;
                return !src || src && src.options.visible !== false;
            }
        });
        var GroupNode = Node.extend({
            renderTo: function (ctx) {
                if (!this.visible()) {
                    return;
                }
                ctx.save();
                this.setTransform(ctx);
                this.setClip(ctx);
                this.setOpacity(ctx);
                var childNodes = this.childNodes;
                for (var i = 0; i < childNodes.length; i++) {
                    var child = childNodes[i];
                    if (child.visible()) {
                        child.renderTo(ctx);
                    }
                }
                ctx.restore();
            }
        });
        d.mixins.Traversable.extend(GroupNode.fn, 'childNodes');
        var RootNode = GroupNode.extend({
            init: function (canvas) {
                GroupNode.fn.init.call(this);
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                var invalidateHandler = proxy(this._invalidate, this);
                this.invalidate = kendo.throttle(function () {
                    kendo.animationFrame(invalidateHandler);
                }, FRAME_DELAY);
            },
            destroy: function () {
                GroupNode.fn.destroy.call(this);
                this.canvas = null;
                this.ctx = null;
            },
            load: function (elements, pos, cors) {
                this.loadElements(elements, pos, cors);
                this._invalidate();
            },
            _invalidate: function () {
                if (!this.ctx) {
                    return;
                }
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.renderTo(this.ctx);
            }
        });
        d.mixins.Traversable.extend(RootNode.fn, 'childNodes');
        var PathNode = Node.extend({
            renderTo: function (ctx) {
                ctx.save();
                this.setTransform(ctx);
                this.setClip(ctx);
                this.setOpacity(ctx);
                ctx.beginPath();
                this.renderPoints(ctx, this.srcElement);
                this.setLineDash(ctx);
                this.setLineCap(ctx);
                this.setLineJoin(ctx);
                this.setFill(ctx);
                this.setStroke(ctx);
                ctx.restore();
            },
            setFill: function (ctx) {
                var fill = this.srcElement.options.fill;
                var hasFill = false;
                if (fill) {
                    if (fill.nodeType == 'gradient') {
                        this.setGradientFill(ctx, fill);
                        hasFill = true;
                    } else if (!isTransparent(fill.color)) {
                        ctx.fillStyle = fill.color;
                        ctx.save();
                        this.globalAlpha(ctx, fill.opacity);
                        ctx.fill();
                        ctx.restore();
                        hasFill = true;
                    }
                }
                return hasFill;
            },
            setGradientFill: function (ctx, fill) {
                var bbox = this.srcElement.rawBBox();
                var gradient;
                if (fill instanceof d.LinearGradient) {
                    var start = fill.start();
                    var end = fill.end();
                    gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
                } else if (fill instanceof d.RadialGradient) {
                    var center = fill.center();
                    gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, fill.radius());
                }
                addGradientStops(gradient, fill.stops);
                ctx.save();
                if (!fill.userSpace()) {
                    ctx.transform(bbox.width(), 0, 0, bbox.height(), bbox.origin.x, bbox.origin.y);
                }
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.restore();
            },
            setStroke: function (ctx) {
                var stroke = this.srcElement.options.stroke;
                if (stroke && !isTransparent(stroke.color) && stroke.width > 0) {
                    ctx.strokeStyle = stroke.color;
                    ctx.lineWidth = valueOrDefault(stroke.width, 1);
                    ctx.save();
                    this.globalAlpha(ctx, stroke.opacity);
                    ctx.stroke();
                    ctx.restore();
                    return true;
                }
            },
            dashType: function () {
                var stroke = this.srcElement.options.stroke;
                if (stroke && stroke.dashType) {
                    return stroke.dashType.toLowerCase();
                }
            },
            setLineDash: function (ctx) {
                var dashType = this.dashType();
                if (dashType && dashType != SOLID) {
                    var dashArray = DASH_ARRAYS[dashType];
                    if (ctx.setLineDash) {
                        ctx.setLineDash(dashArray);
                    } else {
                        ctx.mozDash = dashArray;
                        ctx.webkitLineDash = dashArray;
                    }
                }
            },
            setLineCap: function (ctx) {
                var dashType = this.dashType();
                var stroke = this.srcElement.options.stroke;
                if (dashType && dashType !== SOLID) {
                    ctx.lineCap = BUTT;
                } else if (stroke && stroke.lineCap) {
                    ctx.lineCap = stroke.lineCap;
                }
            },
            setLineJoin: function (ctx) {
                var stroke = this.srcElement.options.stroke;
                if (stroke && stroke.lineJoin) {
                    ctx.lineJoin = stroke.lineJoin;
                }
            },
            renderPoints: function (ctx, path) {
                var segments = path.segments;
                if (segments.length === 0) {
                    return;
                }
                var seg = segments[0];
                var anchor = seg.anchor();
                ctx.moveTo(anchor.x, anchor.y);
                for (var i = 1; i < segments.length; i++) {
                    seg = segments[i];
                    anchor = seg.anchor();
                    var prevSeg = segments[i - 1];
                    var prevOut = prevSeg.controlOut();
                    var controlIn = seg.controlIn();
                    if (prevOut && controlIn) {
                        ctx.bezierCurveTo(prevOut.x, prevOut.y, controlIn.x, controlIn.y, anchor.x, anchor.y);
                    } else {
                        ctx.lineTo(anchor.x, anchor.y);
                    }
                }
                if (path.options.closed) {
                    ctx.closePath();
                }
            }
        });
        var MultiPathNode = PathNode.extend({
            renderPoints: function (ctx) {
                var paths = this.srcElement.paths;
                for (var i = 0; i < paths.length; i++) {
                    PathNode.fn.renderPoints(ctx, paths[i]);
                }
            }
        });
        var CircleNode = PathNode.extend({
            renderPoints: function (ctx) {
                var geometry = this.srcElement.geometry();
                var c = geometry.center;
                var r = geometry.radius;
                ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
            }
        });
        var ArcNode = PathNode.extend({
            renderPoints: function (ctx) {
                var path = this.srcElement.toPath();
                PathNode.fn.renderPoints.call(this, ctx, path);
            }
        });
        var TextNode = PathNode.extend({
            renderTo: function (ctx) {
                var text = this.srcElement;
                var pos = text.position();
                var size = text.measure();
                ctx.save();
                this.setTransform(ctx);
                this.setClip(ctx);
                this.setOpacity(ctx);
                ctx.beginPath();
                ctx.font = text.options.font;
                if (this.setFill(ctx)) {
                    ctx.fillText(text.content(), pos.x, pos.y + size.baseline);
                }
                if (this.setStroke(ctx)) {
                    this.setLineDash(ctx);
                    ctx.strokeText(text.content(), pos.x, pos.y + size.baseline);
                }
                ctx.restore();
            }
        });
        var ImageNode = PathNode.extend({
            init: function (srcElement, cors) {
                PathNode.fn.init.call(this, srcElement);
                this.onLoad = proxy(this.onLoad, this);
                this.onError = proxy(this.onError, this);
                this.loading = $.Deferred();
                var img = this.img = new Image();
                if (cors && !/^data:/i.test(srcElement.src())) {
                    img.crossOrigin = cors;
                }
                img.src = srcElement.src();
                if (img.complete) {
                    this.onLoad();
                } else {
                    img.onload = this.onLoad;
                    img.onerror = this.onError;
                }
            },
            renderTo: function (ctx) {
                if (this.loading.state() === 'resolved') {
                    ctx.save();
                    this.setTransform(ctx);
                    this.setClip(ctx);
                    this.drawImage(ctx);
                    ctx.restore();
                }
            },
            optionsChange: function (e) {
                if (e.field === 'src') {
                    this.loading = $.Deferred();
                    this.img.src = this.srcElement.src();
                } else {
                    PathNode.fn.optionsChange.call(this, e);
                }
            },
            onLoad: function () {
                this.loading.resolve();
                this.invalidate();
            },
            onError: function () {
                this.loading.reject(new Error('Unable to load image \'' + this.img.src + '\'. Check for connectivity and verify CORS headers.'));
            },
            drawImage: function (ctx) {
                var rect = this.srcElement.rect();
                var tl = rect.topLeft();
                ctx.drawImage(this.img, tl.x, tl.y, rect.width(), rect.height());
            }
        });
        var RectNode = PathNode.extend({
            renderPoints: function (ctx) {
                var geometry = this.srcElement.geometry();
                var origin = geometry.origin;
                var size = geometry.size;
                ctx.rect(origin.x, origin.y, size.width, size.height);
            }
        });
        function exportImage(group, options) {
            var defaults = {
                width: '800px',
                height: '600px',
                cors: 'Anonymous'
            };
            var bbox = group.clippedBBox();
            if (bbox) {
                var origin = bbox.getOrigin();
                var exportRoot = new d.Group();
                exportRoot.transform(g.transform().translate(-origin.x, -origin.y));
                exportRoot.children.push(group);
                group = exportRoot;
                var size = bbox.getSize();
                defaults.width = size.width + 'px';
                defaults.height = size.height + 'px';
            }
            options = deepExtend(defaults, options);
            var container = $('<div />').css({
                display: 'none',
                width: options.width,
                height: options.height
            }).appendTo(document.body);
            var surface = new Surface(container, options);
            surface.suspendTracking();
            surface.draw(group);
            var promise = surface.image();
            promise.always(function () {
                surface.destroy();
                container.remove();
            });
            return promise;
        }
        var nodeMap = {
            Group: GroupNode,
            Text: TextNode,
            Path: PathNode,
            MultiPath: MultiPathNode,
            Circle: CircleNode,
            Arc: ArcNode,
            Image: ImageNode,
            Rect: RectNode
        };
        function addGradientStops(gradient, stops) {
            var color, stop, idx;
            for (idx = 0; idx < stops.length; idx++) {
                stop = stops[idx];
                color = kendo.parseColor(stop.color());
                color.a *= stop.opacity();
                gradient.addColorStop(stop.offset(), color.toCssRgba());
            }
        }
        kendo.support.canvas = function () {
            return !!doc.createElement('canvas').getContext;
        }();
        if (kendo.support.canvas) {
            d.SurfaceFactory.current.register('canvas', Surface, 20);
        }
        deepExtend(kendo.drawing, {
            exportImage: exportImage,
            canvas: {
                ArcNode: ArcNode,
                CircleNode: CircleNode,
                GroupNode: GroupNode,
                ImageNode: ImageNode,
                MultiPathNode: MultiPathNode,
                Node: Node,
                PathNode: PathNode,
                RectNode: RectNode,
                RootNode: RootNode,
                Surface: Surface,
                TextNode: TextNode
            }
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/vml', [
        'drawing/shapes',
        'kendo.color'
    ], f);
}(function () {
    (function ($) {
        var doc = document, math = Math, atan2 = math.atan2, ceil = math.ceil, sqrt = math.sqrt, kendo = window.kendo, deepExtend = kendo.deepExtend, noop = $.noop, d = kendo.drawing, BaseNode = d.BaseNode, g = kendo.geometry, toMatrix = g.toMatrix, Color = kendo.Color, util = kendo.util, isTransparent = util.isTransparent, defined = util.defined, deg = util.deg, round = util.round, valueOrDefault = util.valueOrDefault;
        var NONE = 'none', NS = '.kendo', COORDINATE_MULTIPLE = 100, COORDINATE_SIZE = COORDINATE_MULTIPLE * COORDINATE_MULTIPLE, GRADIENT = 'gradient', TRANSFORM_PRECISION = 4;
        var Surface = d.Surface.extend({
            init: function (element, options) {
                d.Surface.fn.init.call(this, element, options);
                enableVML();
                this.element.empty();
                this._root = new RootNode();
                this._root.attachTo(this.element[0]);
                this.element.on('click' + NS, this._click);
                this.element.on('mouseover' + NS, this._mouseenter);
                this.element.on('mouseout' + NS, this._mouseleave);
                this.element.on('mousemove' + NS, this._mousemove);
            },
            type: 'vml',
            destroy: function () {
                if (this._root) {
                    this._root.destroy();
                    this._root = null;
                    this.element.off(NS);
                }
                d.Surface.fn.destroy.call(this);
            },
            draw: function (element) {
                d.Surface.fn.draw.call(this, element);
                this._root.load([element], undefined, null);
            },
            clear: function () {
                d.Surface.fn.clear.call(this);
                this._root.clear();
            }
        });
        var Node = BaseNode.extend({
            init: function (srcElement) {
                BaseNode.fn.init.call(this, srcElement);
                this.createElement();
                this.attachReference();
            },
            observe: noop,
            destroy: function () {
                if (this.element) {
                    this.element._kendoNode = null;
                    this.element = null;
                }
                BaseNode.fn.destroy.call(this);
            },
            clear: function () {
                if (this.element) {
                    this.element.innerHTML = '';
                }
                var children = this.childNodes;
                for (var i = 0; i < children.length; i++) {
                    children[i].destroy();
                }
                this.childNodes = [];
            },
            removeSelf: function () {
                if (this.element) {
                    this.element.parentNode.removeChild(this.element);
                    this.element = null;
                }
                BaseNode.fn.removeSelf.call(this);
            },
            createElement: function () {
                this.element = doc.createElement('div');
            },
            attachReference: function () {
                this.element._kendoNode = this;
            },
            load: function (elements, pos, transform, opacity) {
                opacity = valueOrDefault(opacity, 1);
                if (this.srcElement) {
                    opacity *= valueOrDefault(this.srcElement.options.opacity, 1);
                }
                for (var i = 0; i < elements.length; i++) {
                    var srcElement = elements[i];
                    var children = srcElement.children;
                    var combinedTransform = srcElement.currentTransform(transform);
                    var currentOpacity = opacity * valueOrDefault(srcElement.options.opacity, 1);
                    var childNode = new nodeMap[srcElement.nodeType](srcElement, combinedTransform, currentOpacity);
                    if (children && children.length > 0) {
                        childNode.load(children, pos, combinedTransform, opacity);
                    }
                    if (defined(pos)) {
                        this.insertAt(childNode, pos);
                    } else {
                        this.append(childNode);
                    }
                    childNode.attachTo(this.element, pos);
                }
            },
            attachTo: function (domElement, pos) {
                if (defined(pos)) {
                    domElement.insertBefore(this.element, domElement.children[pos] || null);
                } else {
                    domElement.appendChild(this.element);
                }
            },
            optionsChange: function (e) {
                if (e.field == 'visible') {
                    this.css('display', e.value !== false ? '' : NONE);
                }
            },
            setStyle: function () {
                this.allCss(this.mapStyle());
            },
            mapStyle: function () {
                var style = [];
                if (this.srcElement && this.srcElement.options.visible === false) {
                    style.push([
                        'display',
                        NONE
                    ]);
                }
                return style;
            },
            mapOpacityTo: function (attrs, multiplier) {
                var opacity = valueOrDefault(this.opacity, 1);
                opacity *= valueOrDefault(multiplier, 1);
                attrs.push([
                    'opacity',
                    opacity
                ]);
            },
            attr: function (name, value) {
                if (this.element) {
                    this.element[name] = value;
                }
            },
            allAttr: function (attrs) {
                for (var i = 0; i < attrs.length; i++) {
                    this.attr(attrs[i][0], attrs[i][1]);
                }
            },
            css: function (name, value) {
                if (this.element) {
                    this.element.style[name] = value;
                }
            },
            allCss: function (styles) {
                for (var i = 0; i < styles.length; i++) {
                    this.css(styles[i][0], styles[i][1]);
                }
            }
        });
        var RootNode = Node.extend({
            createElement: function () {
                Node.fn.createElement.call(this);
                this.allCss([
                    [
                        'width',
                        '100%'
                    ],
                    [
                        'height',
                        '100%'
                    ],
                    [
                        'position',
                        'relative'
                    ],
                    [
                        'visibility',
                        'visible'
                    ]
                ]);
            },
            attachReference: noop
        });
        var ClipObserver = kendo.Class.extend({
            init: function (srcElement, observer) {
                this.srcElement = srcElement;
                this.observer = observer;
                srcElement.addObserver(this);
            },
            geometryChange: function () {
                this.observer.optionsChange({
                    field: 'clip',
                    value: this.srcElement
                });
            },
            clear: function () {
                this.srcElement.removeObserver(this);
            }
        });
        var ObserverNode = Node.extend({
            init: function (srcElement) {
                Node.fn.init.call(this, srcElement);
                if (srcElement) {
                    this.initClip();
                }
            },
            observe: function () {
                BaseNode.fn.observe.call(this);
            },
            mapStyle: function () {
                var style = Node.fn.mapStyle.call(this);
                if (this.srcElement && this.srcElement.clip()) {
                    style.push([
                        'clip',
                        this.clipRect()
                    ]);
                }
                return style;
            },
            optionsChange: function (e) {
                if (e.field == 'clip') {
                    this.clearClip();
                    this.initClip();
                    this.setClip();
                }
                Node.fn.optionsChange.call(this, e);
            },
            clear: function () {
                this.clearClip();
                Node.fn.clear.call(this);
            },
            initClip: function () {
                if (this.srcElement.clip()) {
                    this.clip = new ClipObserver(this.srcElement.clip(), this);
                    this.clip.observer = this;
                }
            },
            clearClip: function () {
                if (this.clip) {
                    this.clip.clear();
                    this.clip = null;
                    this.css('clip', this.clipRect());
                }
            },
            setClip: function () {
                if (this.clip) {
                    this.css('clip', this.clipRect());
                }
            },
            clipRect: function () {
                var clipRect = EMPTY_CLIP;
                var clip = this.srcElement.clip();
                if (clip) {
                    var bbox = this.clipBBox(clip);
                    var topLeft = bbox.topLeft();
                    var bottomRight = bbox.bottomRight();
                    clipRect = kendo.format('rect({0}px {1}px {2}px {3}px)', topLeft.y, bottomRight.x, bottomRight.y, topLeft.x);
                }
                return clipRect;
            },
            clipBBox: function (clip) {
                var topLeft = this.srcElement.rawBBox().topLeft();
                var clipBBox = clip.rawBBox();
                clipBBox.origin.translate(-topLeft.x, -topLeft.y);
                return clipBBox;
            }
        });
        var GroupNode = ObserverNode.extend({
            createElement: function () {
                Node.fn.createElement.call(this);
                this.setStyle();
            },
            attachTo: function (domElement, pos) {
                this.css('display', NONE);
                Node.fn.attachTo.call(this, domElement, pos);
                if (this.srcElement.options.visible !== false) {
                    this.css('display', '');
                }
            },
            _attachTo: function (domElement) {
                var frag = document.createDocumentFragment();
                frag.appendChild(this.element);
                domElement.appendChild(frag);
            },
            mapStyle: function () {
                var style = ObserverNode.fn.mapStyle.call(this);
                style.push([
                    'position',
                    'absolute'
                ]);
                style.push([
                    'white-space',
                    'nowrap'
                ]);
                return style;
            },
            optionsChange: function (e) {
                if (e.field === 'transform') {
                    this.refreshTransform();
                }
                if (e.field === 'opacity') {
                    this.refreshOpacity();
                }
                ObserverNode.fn.optionsChange.call(this, e);
            },
            refreshTransform: function (transform) {
                var currentTransform = this.srcElement.currentTransform(transform), children = this.childNodes, length = children.length, i;
                this.setClip();
                for (i = 0; i < length; i++) {
                    children[i].refreshTransform(currentTransform);
                }
            },
            currentOpacity: function () {
                var opacity = valueOrDefault(this.srcElement.options.opacity, 1);
                if (this.parent && this.parent.currentOpacity) {
                    opacity *= this.parent.currentOpacity();
                }
                return opacity;
            },
            refreshOpacity: function () {
                var children = this.childNodes, length = children.length, i;
                var opacity = this.currentOpacity();
                for (i = 0; i < length; i++) {
                    children[i].refreshOpacity(opacity);
                }
            },
            initClip: function () {
                ObserverNode.fn.initClip.call(this);
                if (this.clip) {
                    var bbox = this.clip.srcElement.bbox(this.srcElement.currentTransform());
                    if (bbox) {
                        this.css('width', bbox.width() + bbox.origin.x);
                        this.css('height', bbox.height() + bbox.origin.y);
                    }
                }
            },
            clipBBox: function (clip) {
                return clip.bbox(this.srcElement.currentTransform());
            },
            clearClip: function () {
                ObserverNode.fn.clearClip.call(this);
            }
        });
        var StrokeNode = Node.extend({
            init: function (srcElement, opacity) {
                this.opacity = opacity;
                Node.fn.init.call(this, srcElement);
            },
            createElement: function () {
                this.element = createElementVML('stroke');
                this.setOpacity();
            },
            optionsChange: function (e) {
                if (e.field.indexOf('stroke') === 0) {
                    this.setStroke();
                }
            },
            refreshOpacity: function (opacity) {
                this.opacity = opacity;
                this.setStroke();
            },
            setStroke: function () {
                this.allAttr(this.mapStroke());
            },
            setOpacity: function () {
                this.setStroke();
            },
            mapStroke: function () {
                var stroke = this.srcElement.options.stroke;
                var attrs = [];
                if (stroke && !isTransparent(stroke.color) && stroke.width !== 0) {
                    attrs.push([
                        'on',
                        'true'
                    ]);
                    attrs.push([
                        'color',
                        stroke.color
                    ]);
                    attrs.push([
                        'weight',
                        (stroke.width || 1) + 'px'
                    ]);
                    this.mapOpacityTo(attrs, stroke.opacity);
                    if (defined(stroke.dashType)) {
                        attrs.push([
                            'dashstyle',
                            stroke.dashType
                        ]);
                    }
                    if (defined(stroke.lineJoin)) {
                        attrs.push([
                            'joinstyle',
                            stroke.lineJoin
                        ]);
                    }
                    if (defined(stroke.lineCap)) {
                        var lineCap = stroke.lineCap.toLowerCase();
                        if (lineCap === 'butt') {
                            lineCap = lineCap === 'butt' ? 'flat' : lineCap;
                        }
                        attrs.push([
                            'endcap',
                            lineCap
                        ]);
                    }
                } else {
                    attrs.push([
                        'on',
                        'false'
                    ]);
                }
                return attrs;
            }
        });
        var FillNode = Node.extend({
            init: function (srcElement, transform, opacity) {
                this.opacity = opacity;
                Node.fn.init.call(this, srcElement);
            },
            createElement: function () {
                this.element = createElementVML('fill');
                this.setFill();
            },
            optionsChange: function (e) {
                if (fillField(e.field)) {
                    this.setFill();
                }
            },
            refreshOpacity: function (opacity) {
                this.opacity = opacity;
                this.setOpacity();
            },
            setFill: function () {
                this.allAttr(this.mapFill());
            },
            setOpacity: function () {
                this.setFill();
            },
            attr: function (name, value) {
                var element = this.element;
                if (element) {
                    var fields = name.split('.');
                    while (fields.length > 1) {
                        element = element[fields.shift()];
                    }
                    element[fields[0]] = value;
                }
            },
            mapFill: function () {
                var fill = this.srcElement.fill();
                var attrs = [[
                        'on',
                        'false'
                    ]];
                if (fill) {
                    if (fill.nodeType == GRADIENT) {
                        attrs = this.mapGradient(fill);
                    } else if (!isTransparent(fill.color)) {
                        attrs = this.mapFillColor(fill);
                    }
                }
                return attrs;
            },
            mapFillColor: function (fill) {
                var attrs = [
                    [
                        'on',
                        'true'
                    ],
                    [
                        'color',
                        fill.color
                    ]
                ];
                this.mapOpacityTo(attrs, fill.opacity);
                return attrs;
            },
            mapGradient: function (fill) {
                var options = this.srcElement.options;
                var fallbackFill = options.fallbackFill || fill.fallbackFill && fill.fallbackFill();
                var attrs;
                if (fill instanceof d.LinearGradient) {
                    attrs = this.mapLinearGradient(fill);
                } else if (fill instanceof d.RadialGradient && fill.supportVML) {
                    attrs = this.mapRadialGradient(fill);
                } else if (fallbackFill) {
                    attrs = this.mapFillColor(fallbackFill);
                } else {
                    attrs = [[
                            'on',
                            'false'
                        ]];
                }
                return attrs;
            },
            mapLinearGradient: function (fill) {
                var start = fill.start();
                var end = fill.end();
                var angle = util.deg(atan2(end.y - start.y, end.x - start.x));
                var attrs = [
                    [
                        'on',
                        'true'
                    ],
                    [
                        'type',
                        GRADIENT
                    ],
                    [
                        'focus',
                        0
                    ],
                    [
                        'method',
                        'none'
                    ],
                    [
                        'angle',
                        270 - angle
                    ]
                ];
                this.addColors(attrs);
                return attrs;
            },
            mapRadialGradient: function (fill) {
                var bbox = this.srcElement.rawBBox();
                var center = fill.center();
                var focusx = (center.x - bbox.origin.x) / bbox.width();
                var focusy = (center.y - bbox.origin.y) / bbox.height();
                var attrs = [
                    [
                        'on',
                        'true'
                    ],
                    [
                        'type',
                        'gradienttitle'
                    ],
                    [
                        'focus',
                        '100%'
                    ],
                    [
                        'focusposition',
                        focusx + ' ' + focusy
                    ],
                    [
                        'method',
                        'none'
                    ]
                ];
                this.addColors(attrs);
                return attrs;
            },
            addColors: function (attrs) {
                var options = this.srcElement.options;
                var opacity = valueOrDefault(this.opacity, 1);
                var stopColors = [];
                var stops = options.fill.stops;
                var baseColor = options.baseColor;
                var colorsField = this.element.colors ? 'colors.value' : 'colors';
                var color = stopColor(baseColor, stops[0], opacity);
                var color2 = stopColor(baseColor, stops[stops.length - 1], opacity);
                var stop;
                for (var idx = 0; idx < stops.length; idx++) {
                    stop = stops[idx];
                    stopColors.push(math.round(stop.offset() * 100) + '% ' + stopColor(baseColor, stop, opacity));
                }
                attrs.push([
                    colorsField,
                    stopColors.join(',')
                ], [
                    'color',
                    color
                ], [
                    'color2',
                    color2
                ]);
            }
        });
        var TransformNode = Node.extend({
            init: function (srcElement, transform) {
                this.transform = transform;
                Node.fn.init.call(this, srcElement);
            },
            createElement: function () {
                this.element = createElementVML('skew');
                this.setTransform();
            },
            optionsChange: function (e) {
                if (e.field === 'transform') {
                    this.refresh(this.srcElement.currentTransform());
                }
            },
            refresh: function (transform) {
                this.transform = transform;
                this.setTransform();
            },
            transformOrigin: function () {
                return '-0.5,-0.5';
            },
            setTransform: function () {
                this.allAttr(this.mapTransform());
            },
            mapTransform: function () {
                var transform = this.transform;
                var attrs = [], matrix = toMatrix(transform);
                if (matrix) {
                    matrix.round(TRANSFORM_PRECISION);
                    attrs.push([
                        'on',
                        'true'
                    ], [
                        'matrix',
                        [
                            matrix.a,
                            matrix.c,
                            matrix.b,
                            matrix.d,
                            0,
                            0
                        ].join(',')
                    ], [
                        'offset',
                        matrix.e + 'px,' + matrix.f + 'px'
                    ], [
                        'origin',
                        this.transformOrigin()
                    ]);
                } else {
                    attrs.push([
                        'on',
                        'false'
                    ]);
                }
                return attrs;
            }
        });
        var ShapeNode = ObserverNode.extend({
            init: function (srcElement, transform, opacity) {
                this.fill = this.createFillNode(srcElement, transform, opacity);
                this.stroke = new StrokeNode(srcElement, opacity);
                this.transform = this.createTransformNode(srcElement, transform);
                ObserverNode.fn.init.call(this, srcElement);
            },
            attachTo: function (domElement, pos) {
                this.fill.attachTo(this.element);
                this.stroke.attachTo(this.element);
                this.transform.attachTo(this.element);
                Node.fn.attachTo.call(this, domElement, pos);
            },
            createFillNode: function (srcElement, transform, opacity) {
                return new FillNode(srcElement, transform, opacity);
            },
            createTransformNode: function (srcElement, transform) {
                return new TransformNode(srcElement, transform);
            },
            createElement: function () {
                this.element = createElementVML('shape');
                this.setCoordsize();
                this.setStyle();
            },
            optionsChange: function (e) {
                if (fillField(e.field)) {
                    this.fill.optionsChange(e);
                } else if (e.field.indexOf('stroke') === 0) {
                    this.stroke.optionsChange(e);
                } else if (e.field === 'transform') {
                    this.transform.optionsChange(e);
                } else if (e.field === 'opacity') {
                    this.fill.setOpacity();
                    this.stroke.setOpacity();
                }
                ObserverNode.fn.optionsChange.call(this, e);
            },
            refreshTransform: function (transform) {
                this.transform.refresh(this.srcElement.currentTransform(transform));
            },
            refreshOpacity: function (opacity) {
                opacity *= valueOrDefault(this.srcElement.options.opacity, 1);
                this.fill.refreshOpacity(opacity);
                this.stroke.refreshOpacity(opacity);
            },
            mapStyle: function (width, height) {
                var styles = ObserverNode.fn.mapStyle.call(this);
                if (!width || !height) {
                    width = height = COORDINATE_MULTIPLE;
                }
                styles.push([
                    'position',
                    'absolute'
                ], [
                    'width',
                    width + 'px'
                ], [
                    'height',
                    height + 'px'
                ]);
                var cursor = this.srcElement.options.cursor;
                if (cursor) {
                    styles.push([
                        'cursor',
                        cursor
                    ]);
                }
                return styles;
            },
            setCoordsize: function () {
                this.allAttr([
                    [
                        'coordorigin',
                        '0 0'
                    ],
                    [
                        'coordsize',
                        COORDINATE_SIZE + ' ' + COORDINATE_SIZE
                    ]
                ]);
            }
        });
        var PathDataNode = Node.extend({
            createElement: function () {
                this.element = createElementVML('path');
                this.setPathData();
            },
            geometryChange: function () {
                this.setPathData();
            },
            setPathData: function () {
                this.attr('v', this.renderData());
            },
            renderData: function () {
                return printPath(this.srcElement);
            }
        });
        var PathNode = ShapeNode.extend({
            init: function (srcElement, transform, opacity) {
                this.pathData = this.createDataNode(srcElement);
                ShapeNode.fn.init.call(this, srcElement, transform, opacity);
            },
            attachTo: function (domElement, pos) {
                this.pathData.attachTo(this.element);
                ShapeNode.fn.attachTo.call(this, domElement, pos);
            },
            createDataNode: function (srcElement) {
                return new PathDataNode(srcElement);
            },
            geometryChange: function () {
                this.pathData.geometryChange();
                ShapeNode.fn.geometryChange.call(this);
            }
        });
        var MultiPathDataNode = PathDataNode.extend({
            renderData: function () {
                var paths = this.srcElement.paths;
                if (paths.length > 0) {
                    var result = [], i, open;
                    for (i = 0; i < paths.length; i++) {
                        open = i < paths.length - 1;
                        result.push(printPath(paths[i], open));
                    }
                    return result.join(' ');
                }
            }
        });
        var MultiPathNode = PathNode.extend({
            createDataNode: function (srcElement) {
                return new MultiPathDataNode(srcElement);
            }
        });
        var CircleTransformNode = TransformNode.extend({
            transformOrigin: function () {
                var boundingBox = this.srcElement.geometry().bbox(), center = boundingBox.center(), originX = -ceil(center.x) / ceil(boundingBox.width()), originY = -ceil(center.y) / ceil(boundingBox.height());
                return originX + ',' + originY;
            }
        });
        var CircleNode = ShapeNode.extend({
            createElement: function () {
                this.element = createElementVML('oval');
                this.setStyle();
            },
            createTransformNode: function (srcElement, transform) {
                return new CircleTransformNode(srcElement, transform);
            },
            geometryChange: function () {
                ShapeNode.fn.geometryChange.call(this);
                this.setStyle();
                this.refreshTransform();
            },
            mapStyle: function () {
                var geometry = this.srcElement.geometry();
                var radius = geometry.radius;
                var center = geometry.center;
                var diameter = ceil(radius * 2);
                var styles = ShapeNode.fn.mapStyle.call(this, diameter, diameter);
                styles.push([
                    'left',
                    ceil(center.x - radius) + 'px'
                ], [
                    'top',
                    ceil(center.y - radius) + 'px'
                ]);
                return styles;
            }
        });
        var ArcDataNode = PathDataNode.extend({
            renderData: function () {
                return printPath(this.srcElement.toPath());
            }
        });
        var ArcNode = PathNode.extend({
            createDataNode: function (srcElement) {
                return new ArcDataNode(srcElement);
            }
        });
        var TextPathDataNode = PathDataNode.extend({
            createElement: function () {
                PathDataNode.fn.createElement.call(this);
                this.attr('textpathok', true);
            },
            renderData: function () {
                var rect = this.srcElement.rect();
                var center = rect.center();
                return 'm ' + printPoints([new g.Point(rect.topLeft().x, center.y)]) + ' l ' + printPoints([new g.Point(rect.bottomRight().x, center.y)]);
            }
        });
        var TextPathNode = Node.extend({
            createElement: function () {
                this.element = createElementVML('textpath');
                this.attr('on', true);
                this.attr('fitpath', false);
                this.setStyle();
                this.setString();
            },
            optionsChange: function (e) {
                if (e.field === 'content') {
                    this.setString();
                } else {
                    this.setStyle();
                }
                Node.fn.optionsChange.call(this, e);
            },
            mapStyle: function () {
                return [[
                        'font',
                        this.srcElement.options.font
                    ]];
            },
            setString: function () {
                this.attr('string', this.srcElement.content());
            }
        });
        var TextNode = PathNode.extend({
            init: function (srcElement, transform, opacity) {
                this.path = new TextPathNode(srcElement);
                PathNode.fn.init.call(this, srcElement, transform, opacity);
            },
            createDataNode: function (srcElement) {
                return new TextPathDataNode(srcElement);
            },
            attachTo: function (domElement, pos) {
                this.path.attachTo(this.element);
                PathNode.fn.attachTo.call(this, domElement, pos);
            },
            optionsChange: function (e) {
                if (e.field === 'font' || e.field === 'content') {
                    this.path.optionsChange(e);
                    this.pathData.geometryChange(e);
                }
                PathNode.fn.optionsChange.call(this, e);
            }
        });
        var ImagePathDataNode = PathDataNode.extend({
            renderData: function () {
                var rect = this.srcElement.rect();
                var path = new d.Path().moveTo(rect.topLeft()).lineTo(rect.topRight()).lineTo(rect.bottomRight()).lineTo(rect.bottomLeft()).close();
                return printPath(path);
            }
        });
        var ImageFillNode = TransformNode.extend({
            init: function (srcElement, transform, opacity) {
                this.opacity = opacity;
                TransformNode.fn.init.call(this, srcElement, transform);
            },
            createElement: function () {
                this.element = createElementVML('fill');
                this.attr('type', 'frame');
                this.attr('rotate', true);
                this.setOpacity();
                this.setSrc();
                this.setTransform();
            },
            optionsChange: function (e) {
                if (e.field === 'src') {
                    this.setSrc();
                }
                TransformNode.fn.optionsChange.call(this, e);
            },
            geometryChange: function () {
                this.refresh();
            },
            refreshOpacity: function (opacity) {
                this.opacity = opacity;
                this.setOpacity();
            },
            setOpacity: function () {
                var attrs = [];
                this.mapOpacityTo(attrs, this.srcElement.options.opacity);
                this.allAttr(attrs);
            },
            setSrc: function () {
                this.attr('src', this.srcElement.src());
            },
            mapTransform: function () {
                var img = this.srcElement;
                var rawbbox = img.rawBBox();
                var rawcenter = rawbbox.center();
                var fillOrigin = COORDINATE_MULTIPLE / 2;
                var fillSize = COORDINATE_MULTIPLE;
                var x;
                var y;
                var width = rawbbox.width() / fillSize;
                var height = rawbbox.height() / fillSize;
                var angle = 0;
                var transform = this.transform;
                if (transform) {
                    var matrix = toMatrix(transform);
                    var sx = sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
                    var sy = sqrt(matrix.c * matrix.c + matrix.d * matrix.d);
                    width *= sx;
                    height *= sy;
                    var ax = deg(atan2(matrix.b, matrix.d));
                    var ay = deg(atan2(-matrix.c, matrix.a));
                    angle = (ax + ay) / 2;
                    if (angle !== 0) {
                        var center = img.bbox().center();
                        x = (center.x - fillOrigin) / fillSize;
                        y = (center.y - fillOrigin) / fillSize;
                    } else {
                        x = (rawcenter.x * sx + matrix.e - fillOrigin) / fillSize;
                        y = (rawcenter.y * sy + matrix.f - fillOrigin) / fillSize;
                    }
                } else {
                    x = (rawcenter.x - fillOrigin) / fillSize;
                    y = (rawcenter.y - fillOrigin) / fillSize;
                }
                width = round(width, TRANSFORM_PRECISION);
                height = round(height, TRANSFORM_PRECISION);
                x = round(x, TRANSFORM_PRECISION);
                y = round(y, TRANSFORM_PRECISION);
                angle = round(angle, TRANSFORM_PRECISION);
                return [
                    [
                        'size',
                        width + ',' + height
                    ],
                    [
                        'position',
                        x + ',' + y
                    ],
                    [
                        'angle',
                        angle
                    ]
                ];
            }
        });
        var ImageNode = PathNode.extend({
            createFillNode: function (srcElement, transform, opacity) {
                return new ImageFillNode(srcElement, transform, opacity);
            },
            createDataNode: function (srcElement) {
                return new ImagePathDataNode(srcElement);
            },
            optionsChange: function (e) {
                if (e.field === 'src' || e.field === 'transform') {
                    this.fill.optionsChange(e);
                }
                PathNode.fn.optionsChange.call(this, e);
            },
            geometryChange: function () {
                this.fill.geometryChange();
                PathNode.fn.geometryChange.call(this);
            },
            refreshTransform: function (transform) {
                PathNode.fn.refreshTransform.call(this, transform);
                this.fill.refresh(this.srcElement.currentTransform(transform));
            }
        });
        var RectDataNode = PathDataNode.extend({
            renderData: function () {
                var rect = this.srcElement.geometry();
                var parts = [
                    'm',
                    printPoints([rect.topLeft()]),
                    'l',
                    printPoints([
                        rect.topRight(),
                        rect.bottomRight(),
                        rect.bottomLeft()
                    ]),
                    'x e'
                ];
                return parts.join(' ');
            }
        });
        var RectNode = PathNode.extend({
            createDataNode: function (srcElement) {
                return new RectDataNode(srcElement);
            }
        });
        var nodeMap = {
            Group: GroupNode,
            Text: TextNode,
            Path: PathNode,
            MultiPath: MultiPathNode,
            Circle: CircleNode,
            Arc: ArcNode,
            Image: ImageNode,
            Rect: RectNode
        };
        function enableVML() {
            if (doc.namespaces && !doc.namespaces.kvml) {
                doc.namespaces.add('kvml', 'urn:schemas-microsoft-com:vml');
                var stylesheet = doc.styleSheets.length > 30 ? doc.styleSheets[0] : doc.createStyleSheet();
                stylesheet.addRule('.kvml', 'behavior:url(#default#VML)');
            }
        }
        function createElementVML(type) {
            var element = doc.createElement('kvml:' + type);
            element.className = 'kvml';
            return element;
        }
        function printPoints(points) {
            var length = points.length;
            var result = [];
            for (var i = 0; i < length; i++) {
                result.push(points[i].scaleCopy(COORDINATE_MULTIPLE).toString(0, ','));
            }
            return result.join(' ');
        }
        function printPath(path, open) {
            var segments = path.segments, length = segments.length;
            if (length > 0) {
                var parts = [], output, type, currentType, i;
                for (i = 1; i < length; i++) {
                    type = segmentType(segments[i - 1], segments[i]);
                    if (type !== currentType) {
                        currentType = type;
                        parts.push(type);
                    }
                    if (type === 'l') {
                        parts.push(printPoints([segments[i].anchor()]));
                    } else {
                        parts.push(printPoints([
                            segments[i - 1].controlOut(),
                            segments[i].controlIn(),
                            segments[i].anchor()
                        ]));
                    }
                }
                output = 'm ' + printPoints([segments[0].anchor()]) + ' ' + parts.join(' ');
                if (path.options.closed) {
                    output += ' x';
                }
                if (open !== true) {
                    output += ' e';
                }
                return output;
            }
        }
        function segmentType(segmentStart, segmentEnd) {
            return segmentStart.controlOut() && segmentEnd.controlIn() ? 'c' : 'l';
        }
        function fillField(field) {
            return field.indexOf('fill') === 0 || field.indexOf(GRADIENT) === 0;
        }
        function stopColor(baseColor, stop, baseOpacity) {
            var opacity = baseOpacity * valueOrDefault(stop.opacity(), 1);
            var color;
            if (baseColor) {
                color = blendColors(baseColor, stop.color(), opacity);
            } else {
                color = blendColors(stop.color(), '#fff', 1 - opacity);
            }
            return color;
        }
        function blendColors(base, overlay, alpha) {
            var baseColor = new Color(base), overlayColor = new Color(overlay), r = blendChannel(baseColor.r, overlayColor.r, alpha), g = blendChannel(baseColor.g, overlayColor.g, alpha), b = blendChannel(baseColor.b, overlayColor.b, alpha);
            return new Color(r, g, b).toHex();
        }
        function blendChannel(a, b, alpha) {
            return math.round(alpha * b + (1 - alpha) * a);
        }
        kendo.support.vml = function () {
            var browser = kendo.support.browser;
            return browser.msie && browser.version < 9;
        }();
        var EMPTY_CLIP = 'inherit';
        if (kendo.support.browser.msie && kendo.support.browser.version < 8) {
            EMPTY_CLIP = 'rect(auto auto auto auto)';
        }
        if (kendo.support.vml) {
            d.SurfaceFactory.current.register('vml', Surface, 30);
        }
        deepExtend(d, {
            vml: {
                ArcDataNode: ArcDataNode,
                ArcNode: ArcNode,
                CircleTransformNode: CircleTransformNode,
                CircleNode: CircleNode,
                FillNode: FillNode,
                GroupNode: GroupNode,
                ImageNode: ImageNode,
                ImageFillNode: ImageFillNode,
                ImagePathDataNode: ImagePathDataNode,
                MultiPathDataNode: MultiPathDataNode,
                MultiPathNode: MultiPathNode,
                Node: Node,
                PathDataNode: PathDataNode,
                PathNode: PathNode,
                RectDataNode: RectDataNode,
                RectNode: RectNode,
                RootNode: RootNode,
                StrokeNode: StrokeNode,
                Surface: Surface,
                TextNode: TextNode,
                TextPathNode: TextPathNode,
                TextPathDataNode: TextPathDataNode,
                TransformNode: TransformNode
            }
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/html', [
        'kendo.color',
        'drawing/shapes',
        'util/main',
        'util/text-metrics'
    ], f);
}(function () {
    (function ($, parseFloat, Math) {
        'use strict';
        var drawing = kendo.drawing;
        var geo = kendo.geometry;
        var slice = Array.prototype.slice;
        var browser = kendo.support.browser;
        var romanNumeral = kendo.util.arabicToRoman;
        var mergeSort = kendo.util.mergeSort;
        var KENDO_PSEUDO_ELEMENT = 'KENDO-PSEUDO-ELEMENT';
        var IMAGE_CACHE = {};
        var nodeInfo = {};
        nodeInfo._root = nodeInfo;
        var TextRect = drawing.Text.extend({
            nodeType: 'Text',
            init: function (str, rect, options) {
                drawing.Text.fn.init.call(this, str, rect.getOrigin(), options);
                this._pdfRect = rect;
            },
            rect: function () {
                return this._pdfRect;
            },
            rawBBox: function () {
                return this._pdfRect;
            }
        });
        function getXY(thing) {
            if (typeof thing == 'number') {
                return {
                    x: thing,
                    y: thing
                };
            }
            if (Array.isArray(thing)) {
                return {
                    x: thing[0],
                    y: thing[1]
                };
            }
            return {
                x: thing.x,
                y: thing.y
            };
        }
        function drawDOM(element, options) {
            if (!options) {
                options = {};
            }
            var defer = $.Deferred();
            element = $(element)[0];
            if (!element) {
                return defer.reject('No element to export');
            }
            if (typeof window.getComputedStyle != 'function') {
                throw new Error('window.getComputedStyle is missing.  You are using an unsupported browser, or running in IE8 compatibility mode.  Drawing HTML is supported in Chrome, Firefox, Safari and IE9+.');
            }
            if (kendo.pdf) {
                kendo.pdf.defineFont(getFontFaces(element.ownerDocument));
            }
            var scale = getXY(options.scale || 1);
            function doOne(element) {
                var group = new drawing.Group();
                var pos = element.getBoundingClientRect();
                setTransform(group, [
                    scale.x,
                    0,
                    0,
                    scale.y,
                    -pos.left * scale.x,
                    -pos.top * scale.y
                ]);
                nodeInfo._clipbox = false;
                nodeInfo._matrix = geo.Matrix.unit();
                nodeInfo._stackingContext = {
                    element: element,
                    group: group
                };
                if (options.avoidLinks === true) {
                    nodeInfo._avoidLinks = 'a';
                } else {
                    nodeInfo._avoidLinks = options.avoidLinks;
                }
                $(element).addClass('k-pdf-export');
                renderElement(element, group);
                $(element).removeClass('k-pdf-export');
                return group;
            }
            cacheImages(element, function () {
                var forceBreak = options && options.forcePageBreak;
                var hasPaperSize = options && options.paperSize && options.paperSize != 'auto';
                var paperOptions = kendo.pdf.getPaperOptions(function (key, def) {
                    if (key == 'paperSize') {
                        return hasPaperSize ? options[key] : 'A4';
                    }
                    return key in options ? options[key] : def;
                });
                var pageWidth = hasPaperSize && paperOptions.paperSize[0];
                var pageHeight = hasPaperSize && paperOptions.paperSize[1];
                var margin = options.margin && paperOptions.margin;
                var hasMargin = !!margin;
                if (forceBreak || pageHeight) {
                    if (!margin) {
                        margin = {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                        };
                    }
                    if (pageWidth) {
                        pageWidth /= scale.x;
                    }
                    if (pageHeight) {
                        pageHeight /= scale.y;
                    }
                    margin.left /= scale.x;
                    margin.right /= scale.x;
                    margin.top /= scale.y;
                    margin.bottom /= scale.y;
                    var group = new drawing.Group({
                        pdf: {
                            multiPage: true,
                            paperSize: hasPaperSize ? paperOptions.paperSize : 'auto',
                            _ignoreMargin: hasMargin
                        }
                    });
                    handlePageBreaks(function (x) {
                        if (options.progress) {
                            var canceled = false, pageNum = 0;
                            (function next() {
                                if (pageNum < x.pages.length) {
                                    var page = doOne(x.pages[pageNum]);
                                    group.append(page);
                                    options.progress({
                                        page: page,
                                        pageNum: ++pageNum,
                                        totalPages: x.pages.length,
                                        cancel: function () {
                                            canceled = true;
                                        }
                                    });
                                    if (!canceled) {
                                        setTimeout(next);
                                    } else {
                                        x.container.parentNode.removeChild(x.container);
                                    }
                                } else {
                                    x.container.parentNode.removeChild(x.container);
                                    defer.resolve(group);
                                }
                            }());
                        } else {
                            x.pages.forEach(function (page) {
                                group.append(doOne(page));
                            });
                            x.container.parentNode.removeChild(x.container);
                            defer.resolve(group);
                        }
                    }, element, forceBreak, pageWidth ? pageWidth - margin.left - margin.right : null, pageHeight ? pageHeight - margin.top - margin.bottom : null, margin, options);
                } else {
                    defer.resolve(doOne(element));
                }
            });
            function makeTemplate(template) {
                if (template != null) {
                    if (typeof template == 'string') {
                        template = kendo.template(template.replace(/^\s+|\s+$/g, ''));
                    }
                    if (typeof template == 'function') {
                        return function (data) {
                            var el = template(data);
                            if (el) {
                                if (typeof el == 'string') {
                                    el = el.replace(/^\s+|\s+$/g, '');
                                }
                                return $(el)[0];
                            }
                        };
                    }
                    return function () {
                        return $(template).clone()[0];
                    };
                }
            }
            function cloneNodes(el) {
                var clone = el.cloneNode(false);
                if (el.nodeType == 1) {
                    var $el = $(el), $clone = $(clone), i;
                    var data = $el.data();
                    for (i in data) {
                        $clone.data(i, data[i]);
                    }
                    if (/^canvas$/i.test(el.tagName)) {
                        clone.getContext('2d').drawImage(el, 0, 0);
                    } else if (/^input$/i.test(el.tagName)) {
                        el.removeAttribute('name');
                    } else {
                        for (i = el.firstChild; i; i = i.nextSibling) {
                            clone.appendChild(cloneNodes(i));
                        }
                    }
                }
                return clone;
            }
            function handlePageBreaks(callback, element, forceBreak, pageWidth, pageHeight, margin, options) {
                var template = makeTemplate(options.template);
                var doc = element.ownerDocument;
                var pages = [];
                var copy = options._destructive ? element : cloneNodes(element);
                var container = doc.createElement('KENDO-PDF-DOCUMENT');
                var adjust = 0;
                $(copy).find('tfoot').each(function () {
                    this.parentNode.appendChild(this);
                });
                $(copy).find('ol').each(function () {
                    $(this).children().each(function (index) {
                        this.setAttribute('kendo-split-index', index);
                    });
                });
                $(container).css({
                    display: 'block',
                    position: 'absolute',
                    boxSizing: 'content-box',
                    left: '-10000px',
                    top: '-10000px'
                });
                if (pageWidth) {
                    $(container).css({
                        width: pageWidth,
                        paddingLeft: margin.left,
                        paddingRight: margin.right
                    });
                    $(copy).css({ overflow: 'hidden' });
                }
                element.parentNode.insertBefore(container, element);
                container.appendChild(copy);
                if (options.beforePageBreak) {
                    setTimeout(function () {
                        options.beforePageBreak(container, doPageBreak);
                    }, 15);
                } else {
                    setTimeout(doPageBreak, 15);
                }
                function doPageBreak() {
                    if (forceBreak != '-' || pageHeight) {
                        splitElement(copy);
                    }
                    var page = makePage();
                    copy.parentNode.insertBefore(page, copy);
                    page.appendChild(copy);
                    if (template) {
                        var count = pages.length;
                        pages.forEach(function (page, i) {
                            var el = template({
                                element: page,
                                pageNum: i + 1,
                                totalPages: pages.length
                            });
                            if (el) {
                                page.appendChild(el);
                                cacheImages(el, function () {
                                    if (--count === 0) {
                                        next();
                                    }
                                });
                            }
                        });
                    } else {
                        next();
                    }
                    function next() {
                        whenImagesAreActuallyLoaded(pages, function () {
                            callback({
                                pages: pages,
                                container: container
                            });
                        });
                    }
                }
                function keepTogether(jqel) {
                    if (options.keepTogether && jqel.is(options.keepTogether) && jqel.height() <= pageHeight - adjust) {
                        return true;
                    }
                    var tag = jqel[0].tagName;
                    if (/^h[1-6]$/i.test(tag) && jqel.height() >= pageHeight - adjust) {
                        return false;
                    }
                    return jqel.data('kendoChart') || /^(?:img|tr|thead|th|tfoot|iframe|svg|object|canvas|input|textarea|select|video|h[1-6])$/i.test(tag);
                }
                function splitElement(element) {
                    var style = getComputedStyle(element);
                    var bottomPadding = parseFloat(getPropertyValue(style, 'padding-bottom'));
                    var bottomBorder = parseFloat(getPropertyValue(style, 'border-bottom-width'));
                    var saveAdjust = adjust;
                    adjust += bottomPadding + bottomBorder;
                    var isFirst = true;
                    for (var el = element.firstChild; el; el = el.nextSibling) {
                        if (el.nodeType == 1) {
                            isFirst = false;
                            var jqel = $(el);
                            if (jqel.is(forceBreak)) {
                                breakAtElement(el);
                                continue;
                            }
                            if (!pageHeight) {
                                splitElement(el);
                                continue;
                            }
                            if (!/^(?:static|relative)$/.test(getPropertyValue(getComputedStyle(el), 'position'))) {
                                continue;
                            }
                            var fall = fallsOnMargin(el);
                            if (fall == 1) {
                                breakAtElement(el);
                            } else if (fall) {
                                if (keepTogether(jqel)) {
                                    breakAtElement(el);
                                } else {
                                    splitElement(el);
                                }
                            } else {
                                splitElement(el);
                            }
                        } else if (el.nodeType == 3 && pageHeight) {
                            splitText(el, isFirst);
                            isFirst = false;
                        }
                    }
                    adjust = saveAdjust;
                }
                function firstInParent(el) {
                    var p = el.parentNode, first = p.firstChild;
                    if (el === first) {
                        return true;
                    }
                    if (el === p.children[0]) {
                        if (first.nodeType == 7 || first.nodeType == 8) {
                            return true;
                        }
                        if (first.nodeType == 3) {
                            return !/\S/.test(first.data);
                        }
                    }
                    return false;
                }
                function breakAtElement(el) {
                    if (el.nodeType == 1 && el !== copy && firstInParent(el)) {
                        return breakAtElement(el.parentNode);
                    }
                    var table, colgroup, thead, grid, gridHead;
                    table = $(el).closest('table');
                    colgroup = table.find('colgroup:first');
                    if (options.repeatHeaders) {
                        thead = table.find('thead:first');
                        grid = $(el).closest('.k-grid[data-role="grid"]');
                        if (grid[0] && grid[0].querySelector('.k-auto-scrollable')) {
                            gridHead = grid.find('.k-grid-header:first');
                        }
                    }
                    var page = makePage();
                    var range = doc.createRange();
                    range.setStartBefore(copy);
                    range.setEndBefore(el);
                    page.appendChild(range.extractContents());
                    copy.parentNode.insertBefore(page, copy);
                    if (table[0]) {
                        table = $(el).closest('table');
                        if (options.repeatHeaders && thead[0]) {
                            thead.clone().prependTo(table);
                        }
                        if (colgroup[0]) {
                            colgroup.clone().prependTo(table);
                        }
                    }
                    if (options.repeatHeaders && gridHead && gridHead[0]) {
                        grid = $(el).closest('.k-grid[data-role="grid"]');
                        if (gridHead[0]) {
                            gridHead.clone().prependTo(grid);
                        }
                    }
                }
                function makePage() {
                    var page = doc.createElement('KENDO-PDF-PAGE');
                    $(page).css({
                        display: 'block',
                        boxSizing: 'content-box',
                        width: pageWidth || 'auto',
                        padding: margin.top + 'px ' + margin.right + 'px ' + margin.bottom + 'px ' + margin.left + 'px',
                        position: 'relative',
                        height: pageHeight || 'auto',
                        overflow: pageHeight || pageWidth ? 'hidden' : 'visible',
                        clear: 'both'
                    });
                    if (options && options.pageClassName) {
                        page.className = options.pageClassName;
                    }
                    pages.push(page);
                    return page;
                }
                function fallsOnMargin(thing) {
                    var box = thing.getBoundingClientRect();
                    if (box.width === 0 || box.height === 0) {
                        return 0;
                    }
                    var top = copy.getBoundingClientRect().top;
                    var available = pageHeight - adjust;
                    return box.height > available ? 3 : box.top - top > available ? 1 : box.bottom - top > available ? 2 : 0;
                }
                function splitText(node, isFirst) {
                    if (!/\S/.test(node.data)) {
                        return;
                    }
                    var len = node.data.length;
                    var range = doc.createRange();
                    range.selectNodeContents(node);
                    var fall = fallsOnMargin(range);
                    if (!fall) {
                        return;
                    }
                    var nextnode = node;
                    if (fall == 1) {
                        if (isFirst) {
                            breakAtElement(node.parentNode);
                        } else {
                            breakAtElement(node);
                        }
                    } else {
                        (function findEOP(min, pos, max) {
                            range.setEnd(node, pos);
                            if (min == pos || pos == max) {
                                return pos;
                            }
                            if (fallsOnMargin(range)) {
                                return findEOP(min, min + pos >> 1, pos);
                            } else {
                                return findEOP(pos, pos + max >> 1, max);
                            }
                        }(0, len >> 1, len));
                        if (!/\S/.test(range.toString()) && isFirst) {
                            breakAtElement(node.parentNode);
                        } else {
                            nextnode = node.splitText(range.endOffset);
                            var page = makePage();
                            range.setStartBefore(copy);
                            page.appendChild(range.extractContents());
                            copy.parentNode.insertBefore(page, copy);
                        }
                    }
                    splitText(nextnode);
                }
            }
            return defer.promise();
        }
        drawing.drawDOM = drawDOM;
        drawDOM.getFontFaces = getFontFaces;
        var parseBackgroundImage = function () {
            var tok_linear_gradient = /^((-webkit-|-moz-|-o-|-ms-)?linear-gradient\s*)\(/;
            var tok_percent = /^([-0-9.]+%)/;
            var tok_length = /^([-0-9.]+px)/;
            var tok_keyword = /^(left|right|top|bottom|to|center)\W/;
            var tok_angle = /^([-0-9.]+(deg|grad|rad|turn))/;
            var tok_whitespace = /^(\s+)/;
            var tok_popen = /^(\()/;
            var tok_pclose = /^(\))/;
            var tok_comma = /^(,)/;
            var tok_url = /^(url)\(/;
            var tok_content = /^(.*?)\)/;
            var cache1 = {}, cache2 = {};
            function parse(input) {
                var orig = input;
                if (hasOwnProperty(cache1, orig)) {
                    return cache1[orig];
                }
                function skip_ws() {
                    var m = tok_whitespace.exec(input);
                    if (m) {
                        input = input.substr(m[1].length);
                    }
                }
                function read(token) {
                    skip_ws();
                    var m = token.exec(input);
                    if (m) {
                        input = input.substr(m[1].length);
                        return m[1];
                    }
                }
                function read_stop() {
                    var color = kendo.parseColor(input, true);
                    var length, percent;
                    if (color) {
                        input = input.substr(color.match[0].length);
                        color = color.toRGB();
                        if (!(length = read(tok_length))) {
                            percent = read(tok_percent);
                        }
                        return {
                            color: color,
                            length: length,
                            percent: percent
                        };
                    }
                }
                function read_linear_gradient(propName) {
                    var angle;
                    var to1, to2;
                    var stops = [];
                    var reverse = false;
                    if (read(tok_popen)) {
                        angle = read(tok_angle);
                        if (angle) {
                            angle = parseAngle(angle);
                            read(tok_comma);
                        } else {
                            to1 = read(tok_keyword);
                            if (to1 == 'to') {
                                to1 = read(tok_keyword);
                            } else if (to1 && /^-/.test(propName)) {
                                reverse = true;
                            }
                            to2 = read(tok_keyword);
                            read(tok_comma);
                        }
                        if (/-moz-/.test(propName) && angle == null && to1 == null) {
                            var x = read(tok_percent), y = read(tok_percent);
                            reverse = true;
                            if (x == '0%') {
                                to1 = 'left';
                            } else if (x == '100%') {
                                to1 = 'right';
                            }
                            if (y == '0%') {
                                to2 = 'top';
                            } else if (y == '100%') {
                                to2 = 'bottom';
                            }
                            read(tok_comma);
                        }
                        while (input && !read(tok_pclose)) {
                            var stop = read_stop();
                            if (!stop) {
                                break;
                            }
                            stops.push(stop);
                            read(tok_comma);
                        }
                        return {
                            type: 'linear',
                            angle: angle,
                            to: to1 && to2 ? to1 + ' ' + to2 : to1 ? to1 : to2 ? to2 : null,
                            stops: stops,
                            reverse: reverse
                        };
                    }
                }
                function read_url() {
                    if (read(tok_popen)) {
                        var url = read(tok_content);
                        url = url.replace(/^['"]+|["']+$/g, '');
                        read(tok_pclose);
                        return {
                            type: 'url',
                            url: url
                        };
                    }
                }
                var tok;
                if (tok = read(tok_linear_gradient)) {
                    tok = read_linear_gradient(tok);
                } else if (tok = read(tok_url)) {
                    tok = read_url();
                }
                return cache1[orig] = tok || { type: 'none' };
            }
            return function (input) {
                if (hasOwnProperty(cache2, input)) {
                    return cache2[input];
                }
                return cache2[input] = splitProperty(input).map(parse);
            };
        }();
        var splitProperty = function () {
            var cache = {};
            return function (input, separator) {
                if (!separator) {
                    separator = /^\s*,\s*/;
                }
                var cacheKey = input + separator;
                if (hasOwnProperty(cache, cacheKey)) {
                    return cache[cacheKey];
                }
                var ret = [];
                var last = 0, pos = 0;
                var in_paren = 0;
                var in_string = false;
                var m;
                function looking_at(rx) {
                    return m = rx.exec(input.substr(pos));
                }
                function trim(str) {
                    return str.replace(/^\s+|\s+$/g, '');
                }
                while (pos < input.length) {
                    if (!in_string && looking_at(/^[\(\[\{]/)) {
                        in_paren++;
                        pos++;
                    } else if (!in_string && looking_at(/^[\)\]\}]/)) {
                        in_paren--;
                        pos++;
                    } else if (!in_string && looking_at(/^[\"\']/)) {
                        in_string = m[0];
                        pos++;
                    } else if (in_string == '\'' && looking_at(/^\\\'/)) {
                        pos += 2;
                    } else if (in_string == '"' && looking_at(/^\\\"/)) {
                        pos += 2;
                    } else if (in_string == '\'' && looking_at(/^\'/)) {
                        in_string = false;
                        pos++;
                    } else if (in_string == '"' && looking_at(/^\"/)) {
                        in_string = false;
                        pos++;
                    } else if (looking_at(separator)) {
                        if (!in_string && !in_paren && pos > last) {
                            ret.push(trim(input.substring(last, pos)));
                            last = pos + m[0].length;
                        }
                        pos += m[0].length;
                    } else {
                        pos++;
                    }
                }
                if (last < pos) {
                    ret.push(trim(input.substring(last, pos)));
                }
                return cache[cacheKey] = ret;
            };
        }();
        var getFontURL = function (cache) {
            return function (el) {
                var url = cache[el];
                if (!url) {
                    var m;
                    if (m = /url\((['"]?)([^'")]*?)\1\)\s+format\((['"]?)truetype\3\)/.exec(el)) {
                        url = cache[el] = m[2];
                    } else if (m = /url\((['"]?)([^'")]*?\.ttf)\1\)/.exec(el)) {
                        url = cache[el] = m[2];
                    }
                }
                return url;
            };
        }(Object.create(null));
        var getFontHeight = function (cache) {
            return function (font) {
                var height = cache[font];
                if (height == null) {
                    height = cache[font] = kendo.util.measureText('Mapq', { font: font }).height;
                }
                return height;
            };
        }(Object.create(null));
        function getFontFaces(doc) {
            if (doc == null) {
                doc = document;
            }
            var result = {};
            for (var i = 0; i < doc.styleSheets.length; ++i) {
                doStylesheet(doc.styleSheets[i]);
            }
            return result;
            function doStylesheet(ss) {
                if (ss) {
                    var rules = null;
                    try {
                        rules = ss.cssRules;
                    } catch (ex) {
                    }
                    if (rules) {
                        addRules(ss, rules);
                    }
                }
            }
            function findFonts(rule) {
                var src = getPropertyValue(rule.style, 'src');
                if (src) {
                    return splitProperty(src).reduce(function (a, el) {
                        var font = getFontURL(el);
                        if (font) {
                            a.push(font);
                        }
                        return a;
                    }, []);
                } else {
                    var font = getFontURL(rule.cssText);
                    return font ? [font] : [];
                }
            }
            function addRules(styleSheet, rules) {
                for (var i = 0; i < rules.length; ++i) {
                    var r = rules[i];
                    switch (r.type) {
                    case 3:
                        doStylesheet(r.styleSheet);
                        break;
                    case 5:
                        var style = r.style;
                        var family = splitProperty(getPropertyValue(style, 'font-family'));
                        var bold = /^([56789]00|bold)$/i.test(getPropertyValue(style, 'font-weight'));
                        var italic = 'italic' == getPropertyValue(style, 'font-style');
                        var src = findFonts(r);
                        if (src.length > 0) {
                            addRule(styleSheet, family, bold, italic, src[0]);
                        }
                    }
                }
            }
            function addRule(styleSheet, names, bold, italic, url) {
                if (!/^data:/i.test(url)) {
                    if (!(/^[^\/:]+:\/\//.test(url) || /^\//.test(url))) {
                        url = String(styleSheet.href).replace(/[^\/]*$/, '') + url;
                    }
                }
                names.forEach(function (name) {
                    name = name.replace(/^(['"]?)(.*?)\1$/, '$2');
                    if (bold) {
                        name += '|bold';
                    }
                    if (italic) {
                        name += '|italic';
                    }
                    result[name] = url;
                });
            }
        }
        function hasOwnProperty(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        }
        function getCounter(name) {
            name = '_counter_' + name;
            return nodeInfo[name];
        }
        function getAllCounters(name) {
            var values = [], p = nodeInfo;
            name = '_counter_' + name;
            while (p) {
                if (hasOwnProperty(p, name)) {
                    values.push(p[name]);
                }
                p = Object.getPrototypeOf(p);
            }
            return values.reverse();
        }
        function incCounter(name, inc) {
            var p = nodeInfo;
            name = '_counter_' + name;
            while (p && !hasOwnProperty(p, name)) {
                p = Object.getPrototypeOf(p);
            }
            if (!p) {
                p = nodeInfo._root;
            }
            p[name] = (p[name] || 0) + (inc == null ? 1 : inc);
        }
        function resetCounter(name, val) {
            name = '_counter_' + name;
            nodeInfo[name] = val == null ? 0 : val;
        }
        function doCounters(a, f, def) {
            for (var i = 0; i < a.length;) {
                var name = a[i++];
                var val = parseFloat(a[i]);
                if (isNaN(val)) {
                    f(name, def);
                } else {
                    f(name, val);
                    ++i;
                }
            }
        }
        function parseColor(str, css) {
            var color = kendo.parseColor(str);
            if (color) {
                color = color.toRGB();
                if (css) {
                    color = color.toCssRgba();
                } else if (color.a === 0) {
                    color = null;
                }
            }
            return color;
        }
        function whenImagesAreActuallyLoaded(elements, callback) {
            var pending = 0;
            elements.forEach(function (el) {
                var images = el.querySelectorAll('img');
                for (var i = 0; i < images.length; ++i) {
                    var img = images[i];
                    if (!img.complete) {
                        pending++;
                        img.onload = img.onerror = next;
                    }
                }
            });
            if (!pending) {
                next();
            }
            function next() {
                if (--pending <= 0) {
                    callback();
                }
            }
        }
        function cacheImages(element, callback) {
            var urls = [];
            function add(url) {
                if (!IMAGE_CACHE[url]) {
                    IMAGE_CACHE[url] = true;
                    urls.push(url);
                }
            }
            (function dive(element) {
                if (/^img$/i.test(element.tagName)) {
                    add(element.src);
                }
                parseBackgroundImage(getPropertyValue(getComputedStyle(element), 'background-image')).forEach(function (bg) {
                    if (bg.type == 'url') {
                        add(bg.url);
                    }
                });
                if (element.children) {
                    slice.call(element.children).forEach(dive);
                }
            }(element));
            var count = urls.length;
            function next() {
                if (--count <= 0) {
                    callback();
                }
            }
            if (count === 0) {
                next();
            }
            urls.forEach(function (url) {
                var img = IMAGE_CACHE[url] = new Image();
                if (!/^data:/i.test(url)) {
                    img.crossOrigin = 'Anonymous';
                }
                img.src = url;
                if (img.complete) {
                    next();
                } else {
                    img.onload = next;
                    img.onerror = function () {
                        IMAGE_CACHE[url] = null;
                        next();
                    };
                }
            });
        }
        function alphaNumeral(n) {
            var result = '';
            do {
                var r = n % 26;
                result = String.fromCharCode(97 + r) + result;
                n = Math.floor(n / 26);
            } while (n > 0);
            return result;
        }
        function pushNodeInfo(element, style, group) {
            nodeInfo = Object.create(nodeInfo);
            nodeInfo[element.tagName.toLowerCase()] = {
                element: element,
                style: style
            };
            var decoration = getPropertyValue(style, 'text-decoration');
            if (decoration && decoration != 'none') {
                var color = getPropertyValue(style, 'color');
                decoration.split(/\s+/g).forEach(function (name) {
                    if (!nodeInfo[name]) {
                        nodeInfo[name] = color;
                    }
                });
            }
            if (createsStackingContext(style)) {
                nodeInfo._stackingContext = {
                    element: element,
                    group: group
                };
            }
        }
        function popNodeInfo() {
            nodeInfo = Object.getPrototypeOf(nodeInfo);
        }
        function updateClipbox(path) {
            if (nodeInfo._clipbox != null) {
                var box = path.bbox(nodeInfo._matrix);
                if (nodeInfo._clipbox) {
                    nodeInfo._clipbox = geo.Rect.intersect(nodeInfo._clipbox, box);
                } else {
                    nodeInfo._clipbox = box;
                }
            }
        }
        function emptyClipbox() {
            var cb = nodeInfo._clipbox;
            if (cb == null) {
                return true;
            }
            if (cb) {
                return cb.width() === 0 || cb.height() === 0;
            }
        }
        function createsStackingContext(style) {
            function prop(name) {
                return getPropertyValue(style, name);
            }
            if (prop('transform') != 'none' || prop('position') != 'static' && prop('z-index') != 'auto' || prop('opacity') < 1) {
                return true;
            }
        }
        function getComputedStyle(element, pseudoElt) {
            return window.getComputedStyle(element, pseudoElt || null);
        }
        function getPropertyValue(style, prop) {
            var val = style.getPropertyValue(prop);
            if (val == null || val === '') {
                if (browser.webkit) {
                    val = style.getPropertyValue('-webkit-' + prop);
                } else if (browser.mozilla) {
                    val = style.getPropertyValue('-moz-' + prop);
                } else if (browser.opera) {
                    val = style.getPropertyValue('-o-' + prop);
                } else if (browser.msie) {
                    val = style.getPropertyValue('-ms-' + prop);
                }
            }
            return val;
        }
        function pleaseSetPropertyValue(style, prop, value, important) {
            style.setProperty(prop, value, important);
            if (browser.webkit) {
                style.setProperty('-webkit-' + prop, value, important);
            } else if (browser.mozilla) {
                style.setProperty('-moz-' + prop, value, important);
            } else if (browser.opera) {
                style.setProperty('-o-' + prop, value, important);
            } else if (browser.msie) {
                style.setProperty('-ms-' + prop, value, important);
                prop = 'ms' + prop.replace(/(^|-)([a-z])/g, function (s, p1, p2) {
                    return p1 + p2.toUpperCase();
                });
                style[prop] = value;
            }
        }
        function getBorder(style, side) {
            side = 'border-' + side;
            return {
                width: parseFloat(getPropertyValue(style, side + '-width')),
                style: getPropertyValue(style, side + '-style'),
                color: parseColor(getPropertyValue(style, side + '-color'), true)
            };
        }
        function saveStyle(element, func) {
            var prev = element.style.cssText;
            var result = func();
            element.style.cssText = prev;
            return result;
        }
        function getBorderRadius(style, side) {
            var r = getPropertyValue(style, 'border-' + side + '-radius').split(/\s+/g).map(parseFloat);
            if (r.length == 1) {
                r.push(r[0]);
            }
            return sanitizeRadius({
                x: r[0],
                y: r[1]
            });
        }
        function getContentBox(element) {
            var box = element.getBoundingClientRect();
            box = innerBox(box, 'border-*-width', element);
            box = innerBox(box, 'padding-*', element);
            return box;
        }
        function innerBox(box, prop, element) {
            var style, wt, wr, wb, wl;
            if (typeof prop == 'string') {
                style = getComputedStyle(element);
                wt = parseFloat(getPropertyValue(style, prop.replace('*', 'top')));
                wr = parseFloat(getPropertyValue(style, prop.replace('*', 'right')));
                wb = parseFloat(getPropertyValue(style, prop.replace('*', 'bottom')));
                wl = parseFloat(getPropertyValue(style, prop.replace('*', 'left')));
            } else if (typeof prop == 'number') {
                wt = wr = wb = wl = prop;
            }
            return {
                top: box.top + wt,
                right: box.right - wr,
                bottom: box.bottom - wb,
                left: box.left + wl,
                width: box.right - box.left - wr - wl,
                height: box.bottom - box.top - wb - wt
            };
        }
        function getTransform(style) {
            var transform = getPropertyValue(style, 'transform');
            if (transform == 'none') {
                return null;
            }
            var matrix = /^\s*matrix\(\s*(.*?)\s*\)\s*$/.exec(transform);
            if (matrix) {
                var origin = getPropertyValue(style, 'transform-origin');
                matrix = matrix[1].split(/\s*,\s*/g).map(parseFloat);
                origin = origin.split(/\s+/g).map(parseFloat);
                return {
                    matrix: matrix,
                    origin: origin
                };
            }
        }
        function radiansToDegrees(radians) {
            return 180 * radians / Math.PI % 360;
        }
        function parseAngle(angle) {
            var num = parseFloat(angle);
            if (/grad$/.test(angle)) {
                return Math.PI * num / 200;
            } else if (/rad$/.test(angle)) {
                return num;
            } else if (/turn$/.test(angle)) {
                return Math.PI * num * 2;
            } else if (/deg$/.test(angle)) {
                return Math.PI * num / 180;
            }
        }
        function setTransform(shape, m) {
            m = new geo.Matrix(m[0], m[1], m[2], m[3], m[4], m[5]);
            shape.transform(m);
            return m;
        }
        function setClipping(shape, clipPath) {
            shape.clip(clipPath);
        }
        function addArcToPath(path, x, y, options) {
            var points = new geo.Arc([
                    x,
                    y
                ], options).curvePoints(), i = 1;
            while (i < points.length) {
                path.curveTo(points[i++], points[i++], points[i++]);
            }
        }
        function sanitizeRadius(r) {
            if (r.x <= 0 || r.y <= 0) {
                r.x = r.y = 0;
            }
            return r;
        }
        function adjustBorderRadiusForBox(box, rTL, rTR, rBR, rBL) {
            var tl_x = Math.max(0, rTL.x), tl_y = Math.max(0, rTL.y);
            var tr_x = Math.max(0, rTR.x), tr_y = Math.max(0, rTR.y);
            var br_x = Math.max(0, rBR.x), br_y = Math.max(0, rBR.y);
            var bl_x = Math.max(0, rBL.x), bl_y = Math.max(0, rBL.y);
            var f = Math.min(box.width / (tl_x + tr_x), box.height / (tr_y + br_y), box.width / (br_x + bl_x), box.height / (bl_y + tl_y));
            if (f < 1) {
                tl_x *= f;
                tl_y *= f;
                tr_x *= f;
                tr_y *= f;
                br_x *= f;
                br_y *= f;
                bl_x *= f;
                bl_y *= f;
            }
            return {
                tl: {
                    x: tl_x,
                    y: tl_y
                },
                tr: {
                    x: tr_x,
                    y: tr_y
                },
                br: {
                    x: br_x,
                    y: br_y
                },
                bl: {
                    x: bl_x,
                    y: bl_y
                }
            };
        }
        function elementRoundBox(element, box, type) {
            var style = getComputedStyle(element);
            var rTL = getBorderRadius(style, 'top-left');
            var rTR = getBorderRadius(style, 'top-right');
            var rBL = getBorderRadius(style, 'bottom-left');
            var rBR = getBorderRadius(style, 'bottom-right');
            if (type == 'padding' || type == 'content') {
                var bt = getBorder(style, 'top');
                var br = getBorder(style, 'right');
                var bb = getBorder(style, 'bottom');
                var bl = getBorder(style, 'left');
                rTL.x -= bl.width;
                rTL.y -= bt.width;
                rTR.x -= br.width;
                rTR.y -= bt.width;
                rBR.x -= br.width;
                rBR.y -= bb.width;
                rBL.x -= bl.width;
                rBL.y -= bb.width;
                if (type == 'content') {
                    var pt = parseFloat(getPropertyValue(style, 'padding-top'));
                    var pr = parseFloat(getPropertyValue(style, 'padding-right'));
                    var pb = parseFloat(getPropertyValue(style, 'padding-bottom'));
                    var pl = parseFloat(getPropertyValue(style, 'padding-left'));
                    rTL.x -= pl;
                    rTL.y -= pt;
                    rTR.x -= pr;
                    rTR.y -= pt;
                    rBR.x -= pr;
                    rBR.y -= pb;
                    rBL.x -= pl;
                    rBL.y -= pb;
                }
            }
            if (typeof type == 'number') {
                rTL.x -= type;
                rTL.y -= type;
                rTR.x -= type;
                rTR.y -= type;
                rBR.x -= type;
                rBR.y -= type;
                rBL.x -= type;
                rBL.y -= type;
            }
            return roundBox(box, rTL, rTR, rBR, rBL);
        }
        function roundBox(box, rTL0, rTR0, rBR0, rBL0) {
            var tmp = adjustBorderRadiusForBox(box, rTL0, rTR0, rBR0, rBL0);
            var rTL = tmp.tl;
            var rTR = tmp.tr;
            var rBR = tmp.br;
            var rBL = tmp.bl;
            var path = new drawing.Path({
                fill: null,
                stroke: null
            });
            path.moveTo(box.left, box.top + rTL.y);
            if (rTL.x) {
                addArcToPath(path, box.left + rTL.x, box.top + rTL.y, {
                    startAngle: -180,
                    endAngle: -90,
                    radiusX: rTL.x,
                    radiusY: rTL.y
                });
            }
            path.lineTo(box.right - rTR.x, box.top);
            if (rTR.x) {
                addArcToPath(path, box.right - rTR.x, box.top + rTR.y, {
                    startAngle: -90,
                    endAngle: 0,
                    radiusX: rTR.x,
                    radiusY: rTR.y
                });
            }
            path.lineTo(box.right, box.bottom - rBR.y);
            if (rBR.x) {
                addArcToPath(path, box.right - rBR.x, box.bottom - rBR.y, {
                    startAngle: 0,
                    endAngle: 90,
                    radiusX: rBR.x,
                    radiusY: rBR.y
                });
            }
            path.lineTo(box.left + rBL.x, box.bottom);
            if (rBL.x) {
                addArcToPath(path, box.left + rBL.x, box.bottom - rBL.y, {
                    startAngle: 90,
                    endAngle: 180,
                    radiusX: rBL.x,
                    radiusY: rBL.y
                });
            }
            return path.close();
        }
        function formatCounter(val, style) {
            var str = parseFloat(val) + '';
            switch (style) {
            case 'decimal-leading-zero':
                if (str.length < 2) {
                    str = '0' + str;
                }
                return str;
            case 'lower-roman':
                return romanNumeral(val).toLowerCase();
            case 'upper-roman':
                return romanNumeral(val).toUpperCase();
            case 'lower-latin':
            case 'lower-alpha':
                return alphaNumeral(val - 1);
            case 'upper-latin':
            case 'upper-alpha':
                return alphaNumeral(val - 1).toUpperCase();
            default:
                return str;
            }
        }
        function evalPseudoElementContent(element, content) {
            function displayCounter(name, style, separator) {
                if (!separator) {
                    return formatCounter(getCounter(name) || 0, style);
                }
                separator = separator.replace(/^\s*(["'])(.*)\1\s*$/, '$2');
                return getAllCounters(name).map(function (val) {
                    return formatCounter(val, style);
                }).join(separator);
            }
            var a = splitProperty(content, /^\s+/);
            var result = [], m;
            a.forEach(function (el) {
                var tmp;
                if (m = /^\s*(["'])(.*)\1\s*$/.exec(el)) {
                    result.push(m[2].replace(/\\([0-9a-f]{4})/gi, function (s, p) {
                        return String.fromCharCode(parseInt(p, 16));
                    }));
                } else if (m = /^\s*counter\((.*?)\)\s*$/.exec(el)) {
                    tmp = splitProperty(m[1]);
                    result.push(displayCounter(tmp[0], tmp[1]));
                } else if (m = /^\s*counters\((.*?)\)\s*$/.exec(el)) {
                    tmp = splitProperty(m[1]);
                    result.push(displayCounter(tmp[0], tmp[2], tmp[1]));
                } else if (m = /^\s*attr\((.*?)\)\s*$/.exec(el)) {
                    result.push(element.getAttribute(m[1]) || '');
                } else {
                    result.push(el);
                }
            });
            return result.join('');
        }
        function getCssText(style) {
            if (style.cssText) {
                return style.cssText;
            }
            var result = [];
            for (var i = 0; i < style.length; ++i) {
                result.push(style[i] + ': ' + getPropertyValue(style, style[i]));
            }
            return result.join(';\n');
        }
        function _renderWithPseudoElements(element, group) {
            if (element.tagName == KENDO_PSEUDO_ELEMENT) {
                _renderElement(element, group);
                return;
            }
            var fake = [];
            function pseudo(kind, place) {
                var style = getComputedStyle(element, kind);
                if (style.content && style.content != 'normal' && style.content != 'none' && style.width != '0px') {
                    var psel = element.ownerDocument.createElement(KENDO_PSEUDO_ELEMENT);
                    psel.style.cssText = getCssText(style);
                    psel.textContent = evalPseudoElementContent(element, style.content);
                    element.insertBefore(psel, place);
                    fake.push(psel);
                }
            }
            pseudo(':before', element.firstChild);
            pseudo(':after', null);
            var saveClass = element.className;
            element.className += ' kendo-pdf-hide-pseudo-elements';
            _renderElement(element, group);
            element.className = saveClass;
            fake.forEach(function (el) {
                element.removeChild(el);
            });
        }
        function _renderElement(element, group) {
            var style = getComputedStyle(element);
            var top = getBorder(style, 'top');
            var right = getBorder(style, 'right');
            var bottom = getBorder(style, 'bottom');
            var left = getBorder(style, 'left');
            var rTL0 = getBorderRadius(style, 'top-left');
            var rTR0 = getBorderRadius(style, 'top-right');
            var rBL0 = getBorderRadius(style, 'bottom-left');
            var rBR0 = getBorderRadius(style, 'bottom-right');
            var dir = getPropertyValue(style, 'direction');
            var backgroundColor = getPropertyValue(style, 'background-color');
            backgroundColor = parseColor(backgroundColor);
            var backgroundImage = parseBackgroundImage(getPropertyValue(style, 'background-image'));
            var backgroundRepeat = splitProperty(getPropertyValue(style, 'background-repeat'));
            var backgroundPosition = splitProperty(getPropertyValue(style, 'background-position'));
            var backgroundOrigin = splitProperty(getPropertyValue(style, 'background-origin'));
            var backgroundSize = splitProperty(getPropertyValue(style, 'background-size'));
            if (browser.msie && browser.version < 10) {
                backgroundPosition = splitProperty(element.currentStyle.backgroundPosition);
            }
            var innerbox = innerBox(element.getBoundingClientRect(), 'border-*-width', element);
            (function () {
                var clip = getPropertyValue(style, 'clip');
                var m = /^\s*rect\((.*)\)\s*$/.exec(clip);
                if (m) {
                    var a = m[1].split(/[ ,]+/g);
                    var top = a[0] == 'auto' ? innerbox.top : parseFloat(a[0]) + innerbox.top;
                    var right = a[1] == 'auto' ? innerbox.right : parseFloat(a[1]) + innerbox.left;
                    var bottom = a[2] == 'auto' ? innerbox.bottom : parseFloat(a[2]) + innerbox.top;
                    var left = a[3] == 'auto' ? innerbox.left : parseFloat(a[3]) + innerbox.left;
                    var tmp = new drawing.Group();
                    var clipPath = new drawing.Path().moveTo(left, top).lineTo(right, top).lineTo(right, bottom).lineTo(left, bottom).close();
                    setClipping(tmp, clipPath);
                    group.append(tmp);
                    group = tmp;
                    updateClipbox(clipPath);
                }
            }());
            var boxes, i, cells;
            var display = getPropertyValue(style, 'display');
            if (display == 'table-row') {
                boxes = [];
                for (i = 0, cells = element.children; i < cells.length; ++i) {
                    boxes.push(cells[i].getBoundingClientRect());
                }
            } else {
                boxes = element.getClientRects();
                if (boxes.length == 1) {
                    boxes = [element.getBoundingClientRect()];
                }
            }
            boxes = adjustBoxes(boxes);
            for (i = 0; i < boxes.length; ++i) {
                drawOneBox(boxes[i], i === 0, i == boxes.length - 1);
            }
            if (boxes.length > 0 && display == 'list-item') {
                drawBullet(boxes[0]);
            }
            (function () {
                function clipit() {
                    var clipPath = elementRoundBox(element, innerbox, 'padding');
                    var tmp = new drawing.Group();
                    setClipping(tmp, clipPath);
                    group.append(tmp);
                    group = tmp;
                    updateClipbox(clipPath);
                }
                if (isFormField(element)) {
                    clipit();
                } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, 'overflow'))) {
                    clipit();
                } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, 'overflow-x'))) {
                    clipit();
                } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, 'overflow-y'))) {
                    clipit();
                }
            }());
            if (!maybeRenderWidget(element, group)) {
                renderContents(element, group);
            }
            return group;
            function adjustBoxes(boxes) {
                if (/^td$/i.test(element.tagName)) {
                    var table = nodeInfo.table;
                    if (table && getPropertyValue(table.style, 'border-collapse') == 'collapse') {
                        var tableBorderLeft = getBorder(table.style, 'left').width;
                        var tableBorderTop = getBorder(table.style, 'top').width;
                        if (tableBorderLeft === 0 && tableBorderTop === 0) {
                            return boxes;
                        }
                        var tableBox = table.element.getBoundingClientRect();
                        var firstCell = table.element.rows[0].cells[0];
                        var firstCellBox = firstCell.getBoundingClientRect();
                        if (firstCellBox.top == tableBox.top || firstCellBox.left == tableBox.left) {
                            return slice.call(boxes).map(function (box) {
                                return {
                                    left: box.left + tableBorderLeft,
                                    top: box.top + tableBorderTop,
                                    right: box.right + tableBorderLeft,
                                    bottom: box.bottom + tableBorderTop,
                                    height: box.height,
                                    width: box.width
                                };
                            });
                        }
                    }
                }
                return boxes;
            }
            function drawEdge(color, len, Wtop, Wleft, Wright, rl, rr, transform) {
                if (Wtop <= 0) {
                    return;
                }
                var path, edge = new drawing.Group();
                setTransform(edge, transform);
                group.append(edge);
                sanitizeRadius(rl);
                sanitizeRadius(rr);
                path = new drawing.Path({
                    fill: { color: color },
                    stroke: null
                });
                edge.append(path);
                path.moveTo(rl.x ? Math.max(rl.x, Wleft) : 0, 0).lineTo(len - (rr.x ? Math.max(rr.x, Wright) : 0), 0).lineTo(len - Math.max(rr.x, Wright), Wtop).lineTo(Math.max(rl.x, Wleft), Wtop).close();
                if (rl.x) {
                    drawRoundCorner(Wleft, rl, [
                        -1,
                        0,
                        0,
                        1,
                        rl.x,
                        0
                    ]);
                }
                if (rr.x) {
                    drawRoundCorner(Wright, rr, [
                        1,
                        0,
                        0,
                        1,
                        len - rr.x,
                        0
                    ]);
                }
                function drawRoundCorner(Wright, r, transform) {
                    var angle = Math.PI / 2 * Wright / (Wright + Wtop);
                    var ri = {
                        x: r.x - Wright,
                        y: r.y - Wtop
                    };
                    var path = new drawing.Path({
                        fill: { color: color },
                        stroke: null
                    }).moveTo(0, 0);
                    setTransform(path, transform);
                    addArcToPath(path, 0, r.y, {
                        startAngle: -90,
                        endAngle: -radiansToDegrees(angle),
                        radiusX: r.x,
                        radiusY: r.y
                    });
                    if (ri.x > 0 && ri.y > 0) {
                        path.lineTo(ri.x * Math.cos(angle), r.y - ri.y * Math.sin(angle));
                        addArcToPath(path, 0, r.y, {
                            startAngle: -radiansToDegrees(angle),
                            endAngle: -90,
                            radiusX: ri.x,
                            radiusY: ri.y,
                            anticlockwise: true
                        });
                    } else if (ri.x > 0) {
                        path.lineTo(ri.x, Wtop).lineTo(0, Wtop);
                    } else {
                        path.lineTo(ri.x, Wtop).lineTo(ri.x, 0);
                    }
                    edge.append(path.close());
                }
            }
            function drawBackground(box) {
                var background = new drawing.Group();
                setClipping(background, roundBox(box, rTL0, rTR0, rBR0, rBL0));
                group.append(background);
                if (element.tagName == 'A' && element.href && !/^#?$/.test($(element).attr('href'))) {
                    if (!nodeInfo._avoidLinks || !$(element).is(nodeInfo._avoidLinks)) {
                        background._pdfLink = {
                            url: element.href,
                            top: box.top,
                            right: box.right,
                            bottom: box.bottom,
                            left: box.left
                        };
                    }
                }
                if (backgroundColor) {
                    var path = new drawing.Path({
                        fill: { color: backgroundColor.toCssRgba() },
                        stroke: null
                    });
                    path.moveTo(box.left, box.top).lineTo(box.right, box.top).lineTo(box.right, box.bottom).lineTo(box.left, box.bottom).close();
                    background.append(path);
                }
                for (var i = backgroundImage.length; --i >= 0;) {
                    drawOneBackground(background, box, backgroundImage[i], backgroundRepeat[i % backgroundRepeat.length], backgroundPosition[i % backgroundPosition.length], backgroundOrigin[i % backgroundOrigin.length], backgroundSize[i % backgroundSize.length]);
                }
            }
            function drawOneBackground(group, box, background, backgroundRepeat, backgroundPosition, backgroundOrigin, backgroundSize) {
                if (!background || background == 'none') {
                    return;
                }
                if (background.type == 'url') {
                    if (/^url\(\"data:image\/svg/i.test(background.url)) {
                        return;
                    }
                    var img = IMAGE_CACHE[background.url];
                    if (img && img.width > 0 && img.height > 0) {
                        drawBackgroundImage(group, box, img.width, img.height, function (group, rect) {
                            group.append(new drawing.Image(background.url, rect));
                        });
                    }
                } else if (background.type == 'linear') {
                    drawBackgroundImage(group, box, box.width, box.height, gradientRenderer(background));
                } else {
                    return;
                }
                function drawBackgroundImage(group, box, img_width, img_height, renderBG) {
                    var aspect_ratio = img_width / img_height, f;
                    var orgBox = box;
                    if (backgroundOrigin == 'content-box') {
                        orgBox = innerBox(orgBox, 'border-*-width', element);
                        orgBox = innerBox(orgBox, 'padding-*', element);
                    } else if (backgroundOrigin == 'padding-box') {
                        orgBox = innerBox(orgBox, 'border-*-width', element);
                    }
                    if (!/^\s*auto(\s+auto)?\s*$/.test(backgroundSize)) {
                        if (backgroundSize == 'contain') {
                            f = Math.min(orgBox.width / img_width, orgBox.height / img_height);
                            img_width *= f;
                            img_height *= f;
                        } else if (backgroundSize == 'cover') {
                            f = Math.max(orgBox.width / img_width, orgBox.height / img_height);
                            img_width *= f;
                            img_height *= f;
                        } else {
                            var size = backgroundSize.split(/\s+/g);
                            if (/%$/.test(size[0])) {
                                img_width = orgBox.width * parseFloat(size[0]) / 100;
                            } else {
                                img_width = parseFloat(size[0]);
                            }
                            if (size.length == 1 || size[1] == 'auto') {
                                img_height = img_width / aspect_ratio;
                            } else if (/%$/.test(size[1])) {
                                img_height = orgBox.height * parseFloat(size[1]) / 100;
                            } else {
                                img_height = parseFloat(size[1]);
                            }
                        }
                    }
                    var pos = (backgroundPosition + '').split(/\s+/);
                    if (pos.length == 1) {
                        pos[1] = '50%';
                    }
                    if (/%$/.test(pos[0])) {
                        pos[0] = parseFloat(pos[0]) / 100 * (orgBox.width - img_width);
                    } else {
                        pos[0] = parseFloat(pos[0]);
                    }
                    if (/%$/.test(pos[1])) {
                        pos[1] = parseFloat(pos[1]) / 100 * (orgBox.height - img_height);
                    } else {
                        pos[1] = parseFloat(pos[1]);
                    }
                    var rect = new geo.Rect([
                        orgBox.left + pos[0],
                        orgBox.top + pos[1]
                    ], [
                        img_width,
                        img_height
                    ]);
                    function rewX() {
                        while (rect.origin.x > box.left) {
                            rect.origin.x -= img_width;
                        }
                    }
                    function rewY() {
                        while (rect.origin.y > box.top) {
                            rect.origin.y -= img_height;
                        }
                    }
                    function repeatX() {
                        while (rect.origin.x < box.right) {
                            renderBG(group, rect.clone());
                            rect.origin.x += img_width;
                        }
                    }
                    if (backgroundRepeat == 'no-repeat') {
                        renderBG(group, rect);
                    } else if (backgroundRepeat == 'repeat-x') {
                        rewX();
                        repeatX();
                    } else if (backgroundRepeat == 'repeat-y') {
                        rewY();
                        while (rect.origin.y < box.bottom) {
                            renderBG(group, rect.clone());
                            rect.origin.y += img_height;
                        }
                    } else if (backgroundRepeat == 'repeat') {
                        rewX();
                        rewY();
                        var origin = rect.origin.clone();
                        while (rect.origin.y < box.bottom) {
                            rect.origin.x = origin.x;
                            repeatX();
                            rect.origin.y += img_height;
                        }
                    }
                }
            }
            function drawBullet() {
                var listStyleType = getPropertyValue(style, 'list-style-type');
                if (listStyleType == 'none') {
                    return;
                }
                var listStylePosition = getPropertyValue(style, 'list-style-position');
                function _drawBullet(f) {
                    saveStyle(element, function () {
                        element.style.position = 'relative';
                        var bullet = element.ownerDocument.createElement(KENDO_PSEUDO_ELEMENT);
                        bullet.style.position = 'absolute';
                        bullet.style.boxSizing = 'border-box';
                        if (listStylePosition == 'outside') {
                            bullet.style.width = '6em';
                            bullet.style.left = '-6.8em';
                            bullet.style.textAlign = 'right';
                        } else {
                            bullet.style.left = '0px';
                        }
                        f(bullet);
                        element.insertBefore(bullet, element.firstChild);
                        renderElement(bullet, group);
                        element.removeChild(bullet);
                    });
                }
                function elementIndex(f) {
                    var a = element.parentNode.children;
                    var k = element.getAttribute('kendo-split-index');
                    if (k != null) {
                        return f(k | 0, a.length);
                    }
                    for (var i = 0; i < a.length; ++i) {
                        if (a[i] === element) {
                            return f(i, a.length);
                        }
                    }
                }
                switch (listStyleType) {
                case 'circle':
                case 'disc':
                case 'square':
                    _drawBullet(function (bullet) {
                        bullet.style.fontSize = '60%';
                        bullet.style.lineHeight = '200%';
                        bullet.style.paddingRight = '0.5em';
                        bullet.style.fontFamily = 'DejaVu Serif';
                        bullet.innerHTML = {
                            'disc': '\u25CF',
                            'circle': '\u25EF',
                            'square': '\u25A0'
                        }[listStyleType];
                    });
                    break;
                case 'decimal':
                case 'decimal-leading-zero':
                    _drawBullet(function (bullet) {
                        elementIndex(function (idx) {
                            ++idx;
                            if (listStyleType == 'decimal-leading-zero' && (idx + '').length < 2) {
                                idx = '0' + idx;
                            }
                            bullet.innerHTML = idx + '.';
                        });
                    });
                    break;
                case 'lower-roman':
                case 'upper-roman':
                    _drawBullet(function (bullet) {
                        elementIndex(function (idx) {
                            idx = romanNumeral(idx + 1);
                            if (listStyleType == 'upper-roman') {
                                idx = idx.toUpperCase();
                            }
                            bullet.innerHTML = idx + '.';
                        });
                    });
                    break;
                case 'lower-latin':
                case 'lower-alpha':
                case 'upper-latin':
                case 'upper-alpha':
                    _drawBullet(function (bullet) {
                        elementIndex(function (idx) {
                            idx = alphaNumeral(idx);
                            if (/^upper/i.test(listStyleType)) {
                                idx = idx.toUpperCase();
                            }
                            bullet.innerHTML = idx + '.';
                        });
                    });
                    break;
                }
            }
            function drawOneBox(box, isFirst, isLast) {
                if (box.width === 0 || box.height === 0) {
                    return;
                }
                drawBackground(box);
                var shouldDrawLeft = left.width > 0 && (isFirst && dir == 'ltr' || isLast && dir == 'rtl');
                var shouldDrawRight = right.width > 0 && (isLast && dir == 'ltr' || isFirst && dir == 'rtl');
                if (top.width === 0 && left.width === 0 && right.width === 0 && bottom.width === 0) {
                    return;
                }
                if (true) {
                    if (top.color == right.color && top.color == bottom.color && top.color == left.color) {
                        if (top.width == right.width && top.width == bottom.width && top.width == left.width) {
                            if (shouldDrawLeft && shouldDrawRight) {
                                box = innerBox(box, top.width / 2);
                                var path = elementRoundBox(element, box, top.width / 2);
                                path.options.stroke = {
                                    color: top.color,
                                    width: top.width
                                };
                                group.append(path);
                                return;
                            }
                        }
                    }
                    if (rTL0.x === 0 && rTR0.x === 0 && rBR0.x === 0 && rBL0.x === 0) {
                        if (top.width < 2 && left.width < 2 && right.width < 2 && bottom.width < 2) {
                            if (top.width > 0) {
                                group.append(new drawing.Path({
                                    stroke: {
                                        width: top.width,
                                        color: top.color
                                    }
                                }).moveTo(box.left, box.top + top.width / 2).lineTo(box.right, box.top + top.width / 2));
                            }
                            if (bottom.width > 0) {
                                group.append(new drawing.Path({
                                    stroke: {
                                        width: bottom.width,
                                        color: bottom.color
                                    }
                                }).moveTo(box.left, box.bottom - bottom.width / 2).lineTo(box.right, box.bottom - bottom.width / 2));
                            }
                            if (shouldDrawLeft) {
                                group.append(new drawing.Path({
                                    stroke: {
                                        width: left.width,
                                        color: left.color
                                    }
                                }).moveTo(box.left + left.width / 2, box.top).lineTo(box.left + left.width / 2, box.bottom));
                            }
                            if (shouldDrawRight) {
                                group.append(new drawing.Path({
                                    stroke: {
                                        width: right.width,
                                        color: right.color
                                    }
                                }).moveTo(box.right - right.width / 2, box.top).lineTo(box.right - right.width / 2, box.bottom));
                            }
                            return;
                        }
                    }
                }
                var tmp = adjustBorderRadiusForBox(box, rTL0, rTR0, rBR0, rBL0);
                var rTL = tmp.tl;
                var rTR = tmp.tr;
                var rBR = tmp.br;
                var rBL = tmp.bl;
                drawEdge(top.color, box.width, top.width, left.width, right.width, rTL, rTR, [
                    1,
                    0,
                    0,
                    1,
                    box.left,
                    box.top
                ]);
                drawEdge(bottom.color, box.width, bottom.width, right.width, left.width, rBR, rBL, [
                    -1,
                    0,
                    0,
                    -1,
                    box.right,
                    box.bottom
                ]);
                function inv(p) {
                    return {
                        x: p.y,
                        y: p.x
                    };
                }
                drawEdge(left.color, box.height, left.width, bottom.width, top.width, inv(rBL), inv(rTL), [
                    0,
                    -1,
                    1,
                    0,
                    box.left,
                    box.bottom
                ]);
                drawEdge(right.color, box.height, right.width, top.width, bottom.width, inv(rTR), inv(rBR), [
                    0,
                    1,
                    -1,
                    0,
                    box.right,
                    box.top
                ]);
            }
        }
        function gradientRenderer(gradient) {
            return function (group, rect) {
                var width = rect.width(), height = rect.height();
                switch (gradient.type) {
                case 'linear':
                    var angle = gradient.angle != null ? gradient.angle : Math.PI;
                    switch (gradient.to) {
                    case 'top':
                        angle = 0;
                        break;
                    case 'left':
                        angle = -Math.PI / 2;
                        break;
                    case 'bottom':
                        angle = Math.PI;
                        break;
                    case 'right':
                        angle = Math.PI / 2;
                        break;
                    case 'top left':
                    case 'left top':
                        angle = -Math.atan2(height, width);
                        break;
                    case 'top right':
                    case 'right top':
                        angle = Math.atan2(height, width);
                        break;
                    case 'bottom left':
                    case 'left bottom':
                        angle = Math.PI + Math.atan2(height, width);
                        break;
                    case 'bottom right':
                    case 'right bottom':
                        angle = Math.PI - Math.atan2(height, width);
                        break;
                    }
                    if (gradient.reverse) {
                        angle -= Math.PI;
                    }
                    angle %= 2 * Math.PI;
                    if (angle < 0) {
                        angle += 2 * Math.PI;
                    }
                    var pxlen = Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));
                    var scaledAngle = Math.atan(width * Math.tan(angle) / height);
                    var sin = Math.sin(scaledAngle), cos = Math.cos(scaledAngle);
                    var len = Math.abs(sin) + Math.abs(cos);
                    var x = len / 2 * sin;
                    var y = len / 2 * cos;
                    if (angle > Math.PI / 2 && angle <= 3 * Math.PI / 2) {
                        x = -x;
                        y = -y;
                    }
                    var implicit = [], right = 0;
                    var stops = gradient.stops.map(function (s, i) {
                        var offset = s.percent;
                        if (offset) {
                            offset = parseFloat(offset) / 100;
                        } else if (s.length) {
                            offset = parseFloat(s.length) / pxlen;
                        } else if (i === 0) {
                            offset = 0;
                        } else if (i == gradient.stops.length - 1) {
                            offset = 1;
                        }
                        var stop = {
                            color: s.color.toCssRgba(),
                            offset: offset
                        };
                        if (offset != null) {
                            right = offset;
                            implicit.forEach(function (s, i) {
                                var stop = s.stop;
                                stop.offset = s.left + (right - s.left) * (i + 1) / (implicit.length + 1);
                            });
                            implicit = [];
                        } else {
                            implicit.push({
                                left: right,
                                stop: stop
                            });
                        }
                        return stop;
                    });
                    var start = [
                        0.5 - x,
                        0.5 + y
                    ];
                    var end = [
                        0.5 + x,
                        0.5 - y
                    ];
                    group.append(drawing.Path.fromRect(rect).stroke(null).fill(new drawing.LinearGradient({
                        start: start,
                        end: end,
                        stops: stops,
                        userSpace: false
                    })));
                    break;
                case 'radial':
                    if (window.console && window.console.log) {
                        window.console.log('Radial gradients are not yet supported in HTML renderer');
                    }
                    break;
                }
            };
        }
        function maybeRenderWidget(element, group) {
            if (element.getAttribute(kendo.attr('role'))) {
                var widget = kendo.widgetInstance($(element));
                if (widget && (widget.exportDOMVisual || widget.exportVisual)) {
                    var visual;
                    if (widget.exportDOMVisual) {
                        visual = widget.exportDOMVisual();
                    } else {
                        visual = widget.exportVisual();
                    }
                    if (!visual) {
                        return false;
                    }
                    var wrap = new drawing.Group();
                    wrap.children.push(visual);
                    var bbox = element.getBoundingClientRect();
                    wrap.transform(geo.transform().translate(bbox.left, bbox.top));
                    group.append(wrap);
                    return true;
                }
            }
        }
        function renderImage(element, url, group) {
            var box = getContentBox(element);
            var rect = new geo.Rect([
                box.left,
                box.top
            ], [
                box.width,
                box.height
            ]);
            var image = new drawing.Image(url, rect);
            setClipping(image, elementRoundBox(element, box, 'content'));
            group.append(image);
        }
        function zIndexSort(a, b) {
            var sa = getComputedStyle(a);
            var sb = getComputedStyle(b);
            var za = parseFloat(getPropertyValue(sa, 'z-index'));
            var zb = parseFloat(getPropertyValue(sb, 'z-index'));
            var pa = getPropertyValue(sa, 'position');
            var pb = getPropertyValue(sb, 'position');
            if (isNaN(za) && isNaN(zb)) {
                if (/static|absolute/.test(pa) && /static|absolute/.test(pb)) {
                    return 0;
                }
                if (pa == 'static') {
                    return -1;
                }
                if (pb == 'static') {
                    return 1;
                }
                return 0;
            }
            if (isNaN(za)) {
                return zb === 0 ? 0 : zb > 0 ? -1 : 1;
            }
            if (isNaN(zb)) {
                return za === 0 ? 0 : za > 0 ? 1 : -1;
            }
            return parseFloat(za) - parseFloat(zb);
        }
        function isFormField(element) {
            return /^(?:textarea|select|input)$/i.test(element.tagName);
        }
        function getSelectedOption(element) {
            if (element.selectedOptions && element.selectedOptions.length > 0) {
                return element.selectedOptions[0];
            }
            return element.options[element.selectedIndex];
        }
        function renderCheckbox(element, group) {
            var style = getComputedStyle(element);
            var color = getPropertyValue(style, 'color');
            var box = element.getBoundingClientRect();
            if (element.type == 'checkbox') {
                group.append(drawing.Path.fromRect(new geo.Rect([
                    box.left + 1,
                    box.top + 1
                ], [
                    box.width - 2,
                    box.height - 2
                ])).stroke(color, 1));
                if (element.checked) {
                    group.append(new drawing.Path().stroke(color, 1.2).moveTo(box.left + 0.22 * box.width, box.top + 0.55 * box.height).lineTo(box.left + 0.45 * box.width, box.top + 0.75 * box.height).lineTo(box.left + 0.78 * box.width, box.top + 0.22 * box.width));
                }
            } else {
                group.append(new drawing.Circle(new geo.Circle([
                    (box.left + box.right) / 2,
                    (box.top + box.bottom) / 2
                ], Math.min(box.width - 2, box.height - 2) / 2)).stroke(color, 1));
                if (element.checked) {
                    group.append(new drawing.Circle(new geo.Circle([
                        (box.left + box.right) / 2,
                        (box.top + box.bottom) / 2
                    ], Math.min(box.width - 8, box.height - 8) / 2)).fill(color).stroke(null));
                }
            }
        }
        function renderFormField(element, group) {
            var tag = element.tagName.toLowerCase();
            if (tag == 'input' && (element.type == 'checkbox' || element.type == 'radio')) {
                return renderCheckbox(element, group);
            }
            var p = element.parentNode;
            var doc = element.ownerDocument;
            var el = doc.createElement(KENDO_PSEUDO_ELEMENT);
            var option;
            el.style.cssText = getCssText(getComputedStyle(element));
            if (tag == 'input') {
                el.style.whiteSpace = 'pre';
            }
            if (tag == 'select' || tag == 'textarea') {
                el.style.overflow = 'auto';
            }
            if (tag == 'select') {
                if (element.multiple) {
                    for (var i = 0; i < element.options.length; ++i) {
                        option = doc.createElement(KENDO_PSEUDO_ELEMENT);
                        option.style.cssText = getCssText(getComputedStyle(element.options[i]));
                        option.style.display = 'block';
                        option.textContent = element.options[i].textContent;
                        el.appendChild(option);
                    }
                } else {
                    option = getSelectedOption(element);
                    if (option) {
                        el.textContent = option.textContent;
                    }
                }
            } else {
                el.textContent = element.value;
            }
            p.insertBefore(el, element);
            el.scrollLeft = element.scrollLeft;
            el.scrollTop = element.scrollTop;
            element.style.display = 'none';
            renderContents(el, group);
            element.style.display = '';
            p.removeChild(el);
        }
        function renderContents(element, group) {
            if (nodeInfo._stackingContext.element === element) {
                nodeInfo._stackingContext.group = group;
            }
            switch (element.tagName.toLowerCase()) {
            case 'img':
                renderImage(element, element.src, group);
                break;
            case 'canvas':
                try {
                    renderImage(element, element.toDataURL('image/png'), group);
                } catch (ex) {
                }
                break;
            case 'textarea':
            case 'input':
            case 'select':
                renderFormField(element, group);
                break;
            default:
                var blocks = [], floats = [], inline = [], positioned = [];
                for (var i = element.firstChild; i; i = i.nextSibling) {
                    switch (i.nodeType) {
                    case 3:
                        if (/\S/.test(i.data)) {
                            renderText(element, i, group);
                        }
                        break;
                    case 1:
                        var style = getComputedStyle(i);
                        var display = getPropertyValue(style, 'display');
                        var floating = getPropertyValue(style, 'float');
                        var position = getPropertyValue(style, 'position');
                        if (position != 'static') {
                            positioned.push(i);
                        } else if (display != 'inline') {
                            if (floating != 'none') {
                                floats.push(i);
                            } else {
                                blocks.push(i);
                            }
                        } else {
                            inline.push(i);
                        }
                        break;
                    }
                }
                mergeSort(blocks, zIndexSort).forEach(function (el) {
                    renderElement(el, group);
                });
                mergeSort(floats, zIndexSort).forEach(function (el) {
                    renderElement(el, group);
                });
                mergeSort(inline, zIndexSort).forEach(function (el) {
                    renderElement(el, group);
                });
                mergeSort(positioned, zIndexSort).forEach(function (el) {
                    renderElement(el, group);
                });
            }
        }
        function renderText(element, node, group) {
            if (emptyClipbox()) {
                return;
            }
            var style = getComputedStyle(element);
            if (parseFloat(getPropertyValue(style, 'text-indent')) < -500) {
                return;
            }
            var text = node.data;
            var start = 0;
            var end = text.search(/\S\s*$/) + 1;
            if (!end) {
                return;
            }
            var fontSize = getPropertyValue(style, 'font-size');
            var lineHeight = getPropertyValue(style, 'line-height');
            var font = [
                getPropertyValue(style, 'font-style'),
                getPropertyValue(style, 'font-variant'),
                getPropertyValue(style, 'font-weight'),
                fontSize,
                getPropertyValue(style, 'font-family')
            ].join(' ');
            fontSize = parseFloat(fontSize);
            lineHeight = parseFloat(lineHeight);
            if (fontSize === 0) {
                return;
            }
            var color = getPropertyValue(style, 'color');
            var range = element.ownerDocument.createRange();
            var align = getPropertyValue(style, 'text-align');
            var isJustified = align == 'justify';
            var whiteSpace = getPropertyValue(style, 'white-space');
            var textOverflow, saveTextOverflow;
            if (browser.msie) {
                textOverflow = style.textOverflow;
                if (textOverflow == 'ellipsis') {
                    saveTextOverflow = element.style.textOverflow;
                    element.style.textOverflow = 'clip';
                }
            }
            var estimateLineLength = element.getBoundingClientRect().width / fontSize * 5;
            if (estimateLineLength === 0) {
                estimateLineLength = 500;
            }
            var prevLineBottom = null;
            while (!doChunk()) {
            }
            if (browser.msie && textOverflow == 'ellipsis') {
                element.style.textOverflow = saveTextOverflow;
            }
            return;
            function actuallyGetRangeBoundingRect(range) {
                if (browser.msie || browser.chrome) {
                    var rectangles = range.getClientRects(), box = {
                            top: +Infinity,
                            right: -Infinity,
                            bottom: -Infinity,
                            left: +Infinity
                        };
                    for (var i = 0; i < rectangles.length; ++i) {
                        var b = rectangles[i];
                        if (b.width <= 1 || b.bottom === prevLineBottom) {
                            continue;
                        }
                        box.left = Math.min(b.left, box.left);
                        box.top = Math.min(b.top, box.top);
                        box.right = Math.max(b.right, box.right);
                        box.bottom = Math.max(b.bottom, box.bottom);
                    }
                    box.width = box.right - box.left;
                    box.height = box.bottom - box.top;
                    return box;
                }
                return range.getBoundingClientRect();
            }
            function doChunk() {
                var origStart = start;
                var box, pos = text.substr(start).search(/\S/);
                start += pos;
                if (pos < 0 || start >= end) {
                    return true;
                }
                range.setStart(node, start);
                range.setEnd(node, start + 1);
                box = actuallyGetRangeBoundingRect(range);
                var found = false;
                if (isJustified) {
                    pos = text.substr(start).search(/\s/);
                    if (pos >= 0) {
                        range.setEnd(node, start + pos);
                        var r = actuallyGetRangeBoundingRect(range);
                        if (r.bottom == box.bottom) {
                            box = r;
                            found = true;
                            start += pos;
                        }
                    }
                }
                if (!found) {
                    pos = function findEOL(min, eol, max) {
                        range.setEnd(node, eol);
                        var r = actuallyGetRangeBoundingRect(range);
                        if (r.bottom != box.bottom && min < eol) {
                            return findEOL(min, min + eol >> 1, eol);
                        } else if (r.right != box.right) {
                            box = r;
                            if (eol < max) {
                                return findEOL(eol, eol + max >> 1, max);
                            } else {
                                return eol;
                            }
                        } else {
                            return eol;
                        }
                    }(start, Math.min(end, start + estimateLineLength), end);
                    if (pos == start) {
                        return true;
                    }
                    start = pos;
                    pos = range.toString().search(/\s+$/);
                    if (pos === 0) {
                        return;
                    }
                    if (pos > 0) {
                        range.setEnd(node, range.startOffset + pos);
                        box = actuallyGetRangeBoundingRect(range);
                    }
                }
                if (browser.msie) {
                    box = range.getClientRects()[0];
                }
                var str = range.toString();
                if (!/^(?:pre|pre-wrap)$/i.test(whiteSpace)) {
                    str = str.replace(/\s+/g, ' ');
                } else if (/\t/.test(str)) {
                    var cc = 0;
                    for (pos = origStart; pos < range.startOffset; ++pos) {
                        var code = text.charCodeAt(pos);
                        if (code == 9) {
                            cc += 8 - cc % 8;
                        } else if (code == 10 || code == 13) {
                            cc = 0;
                        } else {
                            cc++;
                        }
                    }
                    while ((pos = str.search('\t')) >= 0) {
                        var indent = '        '.substr(0, 8 - (cc + pos) % 8);
                        str = str.substr(0, pos) + indent + str.substr(pos + 1);
                    }
                }
                if (!found) {
                    prevLineBottom = box.bottom;
                }
                drawText(str, box);
            }
            function drawText(str, box) {
                if (browser.msie && !isNaN(lineHeight)) {
                    var height = getFontHeight(font);
                    var top = (box.top + box.bottom - height) / 2;
                    box = {
                        top: top,
                        right: box.right,
                        bottom: top + height,
                        left: box.left,
                        height: height,
                        width: box.right - box.left
                    };
                }
                var text = new TextRect(str, new geo.Rect([
                    box.left,
                    box.top
                ], [
                    box.width,
                    box.height
                ]), {
                    font: font,
                    fill: { color: color }
                });
                group.append(text);
                decorate(box);
            }
            function decorate(box) {
                line(nodeInfo['underline'], box.bottom);
                line(nodeInfo['line-through'], box.bottom - box.height / 2.7);
                line(nodeInfo['overline'], box.top);
                function line(color, ypos) {
                    if (color) {
                        var width = fontSize / 12;
                        var path = new drawing.Path({
                            stroke: {
                                width: width,
                                color: color
                            }
                        });
                        ypos -= width;
                        path.moveTo(box.left, ypos).lineTo(box.right, ypos);
                        group.append(path);
                    }
                }
            }
        }
        function groupInStackingContext(element, group, zIndex) {
            var main;
            if (zIndex != 'auto') {
                main = nodeInfo._stackingContext.group;
                zIndex = parseFloat(zIndex);
            } else {
                main = group;
                zIndex = 0;
            }
            var a = main.children;
            for (var i = 0; i < a.length; ++i) {
                if (a[i]._dom_zIndex != null && a[i]._dom_zIndex > zIndex) {
                    break;
                }
            }
            var tmp = new drawing.Group();
            main.insertAt(tmp, i);
            tmp._dom_zIndex = zIndex;
            if (main !== group) {
                if (nodeInfo._clipbox) {
                    var m = nodeInfo._matrix.invert();
                    var r = nodeInfo._clipbox.transformCopy(m);
                    setClipping(tmp, drawing.Path.fromRect(r));
                }
            }
            return tmp;
        }
        function renderElement(element, container) {
            var style = getComputedStyle(element);
            var counterReset = getPropertyValue(style, 'counter-reset');
            if (counterReset) {
                doCounters(splitProperty(counterReset, /^\s+/), resetCounter, 0);
            }
            var counterIncrement = getPropertyValue(style, 'counter-increment');
            if (counterIncrement) {
                doCounters(splitProperty(counterIncrement, /^\s+/), incCounter, 1);
            }
            if (/^(style|script|link|meta|iframe|svg|col|colgroup)$/i.test(element.tagName)) {
                return;
            }
            if (nodeInfo._clipbox == null) {
                return;
            }
            var opacity = parseFloat(getPropertyValue(style, 'opacity'));
            var visibility = getPropertyValue(style, 'visibility');
            var display = getPropertyValue(style, 'display');
            if (opacity === 0 || visibility == 'hidden' || display == 'none') {
                return;
            }
            var tr = getTransform(style);
            var group;
            var zIndex = getPropertyValue(style, 'z-index');
            if ((tr || opacity < 1) && zIndex == 'auto') {
                zIndex = 0;
            }
            group = groupInStackingContext(element, container, zIndex);
            if (opacity < 1) {
                group.opacity(opacity * group.opacity());
            }
            pushNodeInfo(element, style, group);
            if (!tr) {
                _renderWithPseudoElements(element, group);
            } else {
                saveStyle(element, function () {
                    pleaseSetPropertyValue(element.style, 'transform', 'none', 'important');
                    pleaseSetPropertyValue(element.style, 'transition', 'none', 'important');
                    if (getPropertyValue(style, 'position') == 'static') {
                        pleaseSetPropertyValue(element.style, 'position', 'relative', 'important');
                    }
                    var bbox = element.getBoundingClientRect();
                    var x = bbox.left + tr.origin[0];
                    var y = bbox.top + tr.origin[1];
                    var m = [
                        1,
                        0,
                        0,
                        1,
                        -x,
                        -y
                    ];
                    m = mmul(m, tr.matrix);
                    m = mmul(m, [
                        1,
                        0,
                        0,
                        1,
                        x,
                        y
                    ]);
                    m = setTransform(group, m);
                    nodeInfo._matrix = nodeInfo._matrix.multiplyCopy(m);
                    _renderWithPseudoElements(element, group);
                });
            }
            popNodeInfo();
        }
        function mmul(a, b) {
            var a1 = a[0], b1 = a[1], c1 = a[2], d1 = a[3], e1 = a[4], f1 = a[5];
            var a2 = b[0], b2 = b[1], c2 = b[2], d2 = b[3], e2 = b[4], f2 = b[5];
            return [
                a1 * a2 + b1 * c2,
                a1 * b2 + b1 * d2,
                c1 * a2 + d1 * c2,
                c1 * b2 + d1 * d2,
                e1 * a2 + f1 * c2 + e2,
                e1 * b2 + f1 * d2 + f2
            ];
        }
    }(window.kendo.jQuery, parseFloat, Math));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('drawing/animation', [
        'drawing/geometry',
        'drawing/core'
    ], f);
}(function () {
    (function ($) {
        var noop = $.noop, kendo = window.kendo, Class = kendo.Class, util = kendo.util, animationFrame = kendo.animationFrame, deepExtend = kendo.deepExtend;
        var Animation = Class.extend({
            init: function (element, options) {
                var anim = this;
                anim.options = deepExtend({}, anim.options, options);
                anim.element = element;
            },
            options: {
                duration: 500,
                easing: 'swing'
            },
            setup: noop,
            step: noop,
            play: function () {
                var anim = this, options = anim.options, easing = $.easing[options.easing], duration = options.duration, delay = options.delay || 0, start = util.now() + delay, finish = start + duration;
                if (duration === 0) {
                    anim.step(1);
                    anim.abort();
                } else {
                    setTimeout(function () {
                        var loop = function () {
                            if (anim._stopped) {
                                return;
                            }
                            var wallTime = util.now();
                            var time = util.limitValue(wallTime - start, 0, duration);
                            var pos = time / duration;
                            var easingPos = easing(pos, time, 0, 1, duration);
                            anim.step(easingPos);
                            if (wallTime < finish) {
                                animationFrame(loop);
                            } else {
                                anim.abort();
                            }
                        };
                        loop();
                    }, delay);
                }
            },
            abort: function () {
                this._stopped = true;
            },
            destroy: function () {
                this.abort();
            }
        });
        var AnimationFactory = function () {
            this._items = [];
        };
        AnimationFactory.prototype = {
            register: function (name, type) {
                this._items.push({
                    name: name,
                    type: type
                });
            },
            create: function (element, options) {
                var items = this._items;
                var match;
                if (options && options.type) {
                    var type = options.type.toLowerCase();
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name.toLowerCase() === type) {
                            match = items[i];
                            break;
                        }
                    }
                }
                if (match) {
                    return new match.type(element, options);
                }
            }
        };
        AnimationFactory.current = new AnimationFactory();
        Animation.create = function (type, element, options) {
            return AnimationFactory.current.create(type, element, options);
        };
        deepExtend(kendo.drawing, {
            Animation: Animation,
            AnimationFactory: AnimationFactory
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('kendo.drawing', [
        'kendo.color',
        'util/main',
        'util/text-metrics',
        'util/base64',
        'mixins/observers',
        'drawing/geometry',
        'drawing/core',
        'drawing/mixins',
        'drawing/shapes',
        'drawing/parser',
        'drawing/search',
        'drawing/svg',
        'drawing/canvas',
        'drawing/vml',
        'drawing/html',
        'drawing/animation'
    ], f);
}(function () {
    var __meta__ = {
        id: 'drawing',
        name: 'Drawing API',
        category: 'framework',
        description: 'The Kendo UI low-level drawing API',
        depends: [
            'core',
            'color',
            'popup'
        ]
    };
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));