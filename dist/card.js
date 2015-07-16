(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function () {
			return classNames;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}

}());

},{}],2:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),(n.payment||(n.payment={})).js=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.qj||(f.qj={})).js=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
  var ret;
  if (arguments.length > 1) {
    return el.value = val;
  } else {
    ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, multEventName, originalCallback, _i, _j, _len, _len1, _ref;
  if (element.length) {
    for (_i = 0, _len = element.length; _i < _len; _i++) {
      el = element[_i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    _ref = eventName.split(" ");
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      multEventName = _ref[_j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };
  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }
  if (element.attachEvent) {
    eventName = "on" + eventName;
    return element.attachEvent(eventName, callback);
  }
  element['on' + eventName] = callback;
};

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.addClass(e, className));
      }
      return _results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, _i, _len;
  if (el.length) {
    hasClass = true;
    for (_i = 0, _len = el.length; _i < _len; _i++) {
      e = el[_i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, _i, _len, _ref, _results;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.removeClass(e, className));
      }
      return _results;
    })();
  }
  if (el.classList) {
    _ref = className.split(' ');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cls = _ref[_i];
      _results.push(el.classList.remove(cls));
    }
    return _results;
  } else {
    return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.toggleClass(e, className, bool));
      }
      return _results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.append(e, toAppend));
      }
      return _results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  var e, ev;
  try {
    ev = new CustomEvent(name, {
      detail: data
    });
  } catch (_error) {
    e = _error;
    ev = document.createEvent('CustomEvent');
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }
  return el.dispatchEvent(ev);
};

module.exports = QJ;


},{}]},{},[1])
(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
(function (global){
var Payment, QJ, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictExpiry, restrictNumeric, setCardType,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

QJ = _dereq_('qj');

defaultFormat = /(\d{1,4})/g;

cards = [
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    luhn: true
  }, {
    type: 'dankort',
    pattern: /^5019/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'dinersclub',
    pattern: /^(36|38|30[0-5])/,
    format: defaultFormat,
    length: [14],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'laser',
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'maestro',
    pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'mastercard',
    pattern: /^5[1-5]/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'unionpay',
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  }, {
    type: 'visaelectron',
    pattern: /^4(026|17500|405|508|844|91[37])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 14, 15, 16],
    cvcLength: [3],
    luhn: true
  }
];

cardFromNumber = function(num) {
  var card, _i, _len;
  num = (num + '').replace(/\D/g, '');
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    if (card.pattern.test(num)) {
      return card;
    }
  }
};

cardFromType = function(type) {
  var card, _i, _len;
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    if (card.type === type) {
      return card;
    }
  }
};

luhnCheck = function(num) {
  var digit, digits, odd, sum, _i, _len;
  odd = true;
  sum = 0;
  digits = (num + '').split('').reverse();
  for (_i = 0, _len = digits.length; _i < _len; _i++) {
    digit = digits[_i];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

hasTextSelected = function(target) {
  var _ref;
  if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
    return true;
  }
  if ((typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
};

reFormatCardNumber = function(e) {
  return setTimeout((function(_this) {
    return function() {
      var target, value;
      target = e.target;
      value = QJ.val(target);
      value = Payment.fns.formatCardNumber(value);
      return QJ.val(target, value);
    };
  })(this));
};

formatCardNumber = function(e) {
  var card, digit, length, re, target, upperLength, value;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  value = QJ.val(target);
  card = cardFromNumber(value + digit);
  length = (value.replace(/\D/g, '') + digit).length;
  upperLength = 16;
  if (card) {
    upperLength = card.length[card.length.length - 1];
  }
  if (length >= upperLength) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (card && card.type === 'amex') {
    re = /^(\d{4}|\d{4}\s\d{6})$/;
  } else {
    re = /(?:^|\s)(\d{4})$/;
  }
  if (re.test(value)) {
    e.preventDefault();
    return QJ.val(target, value + ' ' + digit);
  } else if (re.test(value + digit)) {
    e.preventDefault();
    return QJ.val(target, value + digit + ' ');
  }
};

formatBackCardNumber = function(e) {
  var target, value;
  target = e.target;
  value = QJ.val(target);
  if (e.meta) {
    return;
  }
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (/\d\s$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\d\s$/, ''));
  } else if (/\s\d?$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\s\d?$/, ''));
  }
};

formatExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target) + digit;
  if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
    e.preventDefault();
    return QJ.val(target, "0" + val + " / ");
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    return QJ.val(target, "" + val + " / ");
  }
};

formatForwardExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target);
  if (/^\d\d$/.test(val)) {
    return QJ.val(target, "" + val + " / ");
  }
};

formatForwardSlash = function(e) {
  var slash, target, val;
  slash = String.fromCharCode(e.which);
  if (slash !== '/') {
    return;
  }
  target = e.target;
  val = QJ.val(target);
  if (/^\d$/.test(val) && val !== '0') {
    return QJ.val(target, "0" + val + " / ");
  }
};

formatBackExpiry = function(e) {
  var target, value;
  if (e.metaKey) {
    return;
  }
  target = e.target;
  value = QJ.val(target);
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (/\d(\s|\/)+$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\d(\s|\/)*$/, ''));
  } else if (/\s\/\s?\d?$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\s\/\s?\d?$/, ''));
  }
};

restrictNumeric = function(e) {
  var input;
  if (e.metaKey || e.ctrlKey) {
    return true;
  }
  if (e.which === 32) {
    return e.preventDefault();
  }
  if (e.which === 0) {
    return true;
  }
  if (e.which < 33) {
    return true;
  }
  input = String.fromCharCode(e.which);
  if (!/[\d\s]/.test(input)) {
    return e.preventDefault();
  }
};

restrictCardNumber = function(e) {
  var card, digit, target, value;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  value = (QJ.val(target) + digit).replace(/\D/g, '');
  card = cardFromNumber(value);
  if (card) {
    if (!(value.length <= card.length[card.length.length - 1])) {
      return e.preventDefault();
    }
  } else {
    if (!(value.length <= 16)) {
      return e.preventDefault();
    }
  }
};

restrictExpiry = function(e) {
  var digit, target, value;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  value = QJ.val(target) + digit;
  value = value.replace(/\D/g, '');
  if (value.length > 6) {
    return e.preventDefault();
  }
};

restrictCVC = function(e) {
  var digit, target, val;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  val = QJ.val(target) + digit;
  if (!(val.length <= 4)) {
    return e.preventDefault();
  }
};

setCardType = function(e) {
  var allTypes, card, cardType, target, val;
  target = e.target;
  val = QJ.val(target);
  cardType = Payment.fns.cardType(val) || 'unknown';
  if (!QJ.hasClass(target, cardType)) {
    allTypes = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cards.length; _i < _len; _i++) {
        card = cards[_i];
        _results.push(card.type);
      }
      return _results;
    })();
    QJ.removeClass(target, 'unknown');
    QJ.removeClass(target, allTypes.join(' '));
    QJ.addClass(target, cardType);
    QJ.toggleClass(target, 'identified', cardType !== 'unknown');
    return QJ.trigger(target, 'payment.cardType', cardType);
  }
};

Payment = (function() {
  function Payment() {}

  Payment.fns = {
    cardExpiryVal: function(value) {
      var month, prefix, year, _ref;
      value = value.replace(/\s/g, '');
      _ref = value.split('/', 2), month = _ref[0], year = _ref[1];
      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10);
      year = parseInt(year, 10);
      return {
        month: month,
        year: year
      };
    },
    validateCardNumber: function(num) {
      var card, _ref;
      num = (num + '').replace(/\s+|-/g, '');
      if (!/^\d+$/.test(num)) {
        return false;
      }
      card = cardFromNumber(num);
      if (!card) {
        return false;
      }
      return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
    },
    validateCardExpiry: function(month, year) {
      var currentTime, expiry, prefix, _ref;
      if (typeof month === 'object' && 'month' in month) {
        _ref = month, month = _ref.month, year = _ref.year;
      }
      if (!(month && year)) {
        return false;
      }
      month = QJ.trim(month);
      year = QJ.trim(year);
      if (!/^\d+$/.test(month)) {
        return false;
      }
      if (!/^\d+$/.test(year)) {
        return false;
      }
      if (!(parseInt(month, 10) <= 12)) {
        return false;
      }
      if (year.length === 2) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      expiry = new Date(year, month);
      currentTime = new Date;
      expiry.setMonth(expiry.getMonth() - 1);
      expiry.setMonth(expiry.getMonth() + 1, 1);
      return expiry > currentTime;
    },
    validateCardCVC: function(cvc, type) {
      var _ref, _ref1;
      cvc = QJ.trim(cvc);
      if (!/^\d+$/.test(cvc)) {
        return false;
      }
      if (type && cardFromType(type)) {
        return _ref = cvc.length, __indexOf.call((_ref1 = cardFromType(type)) != null ? _ref1.cvcLength : void 0, _ref) >= 0;
      } else {
        return cvc.length >= 3 && cvc.length <= 4;
      }
    },
    cardType: function(num) {
      var _ref;
      if (!num) {
        return null;
      }
      return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
    },
    formatCardNumber: function(num) {
      var card, groups, upperLength, _ref;
      card = cardFromNumber(num);
      if (!card) {
        return num;
      }
      upperLength = card.length[card.length.length - 1];
      num = num.replace(/\D/g, '');
      num = num.slice(0, +upperLength + 1 || 9e9);
      if (card.format.global) {
        return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
      } else {
        groups = card.format.exec(num);
        if (groups != null) {
          groups.shift();
        }
        return groups != null ? groups.join(' ') : void 0;
      }
    }
  };

  Payment.restrictNumeric = function(el) {
    return QJ.on(el, 'keypress', restrictNumeric);
  };

  Payment.cardExpiryVal = function(el) {
    return Payment.fns.cardExpiryVal(QJ.val(el));
  };

  Payment.formatCardCVC = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCVC);
    return el;
  };

  Payment.formatCardExpiry = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictExpiry);
    QJ.on(el, 'keypress', formatExpiry);
    QJ.on(el, 'keypress', formatForwardSlash);
    QJ.on(el, 'keypress', formatForwardExpiry);
    QJ.on(el, 'keydown', formatBackExpiry);
    return el;
  };

  Payment.formatCardNumber = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCardNumber);
    QJ.on(el, 'keypress', formatCardNumber);
    QJ.on(el, 'keydown', formatBackCardNumber);
    QJ.on(el, 'keyup', setCardType);
    QJ.on(el, 'paste', reFormatCardNumber);
    return el;
  };

  Payment.getCardArray = function() {
    return cards;
  };

  Payment.setCardArray = function(cardArray) {
    cards = cardArray;
    return true;
  };

  Payment.addToCardArray = function(cardObject) {
    return cards.push(cardObject);
  };

  Payment.removeFromCardArray = function(type) {
    var key, value;
    for (key in cards) {
      value = cards[key];
      if (value.type === type) {
        cards.splice(key, 1);
      }
    }
    return true;
  };

  return Payment;

})();

module.exports = Payment;

global.Payment = Payment;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qj":1}]},{},[2])
(2)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
var ClassNames, Payment, React, ReactCard;

React = require('react');

Payment = require('payment');

ClassNames = require('classnames');

ReactCard = React.createClass({
  displayName: "ReactCard",
  getDefaultProps: function() {
    return {
      initialNumber: '•••• •••• •••• ••••',
      initialCvc: '•••',
      initialExpiry: '••/••',
      initialName: 'Full Name',
      messages: {
        validDate: 'valid\nthru',
        monthYear: 'month/year'
      },
      baseWidth: 350
    };
  },
  componentWillMount: function() {
    return this.cardBrowserClass = this._addBrowserClass();
  },
  _addBrowserClass: function() {
    var ua;
    if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0) {
      ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
        return 'jp-card-safari';
      }
    }
    if (/MSIE 10\./i.test(navigator.userAgent)) {
      return 'jp-card-ie-10';
    }
    if (/rv:11.0/i.test(navigator.userAgent)) {
      return 'jp-card-ie-11';
    } else {
      return '';
    }
  },
  _getCardType: function(cardNumber) {
    this.cardType = Payment.fns.cardType(cardNumber);
    if (this.cardType && this.cardType !== 'unknown') {
      return "jp-card-" + this.cardType + " jp-card-identified";
    }
  },
  _isFocusedInput: function(inputName) {
    var currentInputValue;
    currentInputValue = this.props.formInputsNames[inputName];
    return (this.props.focusedInput === currentInputValue) || this.props.inputsValues[currentInputValue];
  },
  _getInputValidationState: function(inputName) {
    var validationState;
    validationState = this.props.inputsValidationClass[this.props.formInputsNames[inputName]];
    if (typeof validationState === 'undefined') {
      return '';
    } else {
      return validationState;
    }
  },
  render: function() {
    var containerStyle, expiryValue, scaleWidth;
    containerStyle = {};
    if (this.props.width) {
      scaleWidth = "scale(" + (this.props.width / this.props.baseWidth) + ")";
      containerStyle = {
        WebkitTransform: scaleWidth,
        MozTransform: scaleWidth,
        msTransform: scaleWidth,
        OTransform: scaleWidth,
        transform: scaleWidth
      };
    }
    expiryValue = this.props.inputsValues[this.props.formInputsNames["expiry"]];
    if (expiryValue) {
      expiryValue = expiryValue.replace(/\s+/g, '');
    } else {
      expiryValue = this.props.initialExpiry;
    }
    return React.createElement("div", {
      "className": "jp-card-container",
      "style": containerStyle
    }, React.createElement("div", {
      "className": ClassNames("jp-card", this.cardBrowserClass, this._getCardType(this.props.inputsValues[this.props.formInputsNames["number"]]), {
        'jp-card-flipped': this.props.cardFlipped
      })
    }, React.createElement("div", {
      "className": "jp-card-front"
    }, React.createElement("div", {
      "className": "jp-card-logo jp-card-visa"
    }, "visa"), React.createElement("div", {
      "className": "jp-card-logo jp-card-mastercard"
    }, "MasterCard"), React.createElement("div", {
      "className": "jp-card-logo jp-card-maestro"
    }, "Maestro"), React.createElement("div", {
      "className": "jp-card-logo jp-card-amex"
    }), React.createElement("div", {
      "className": "jp-card-logo jp-card-discover"
    }, "discover"), React.createElement("div", {
      "className": "jp-card-logo jp-card-dankort"
    }, React.createElement("div", {
      "className": "dk"
    }, React.createElement("div", {
      "className": "d"
    }), React.createElement("div", {
      "className": "k"
    }))), React.createElement("div", {
      "className": "jp-card-lower"
    }, React.createElement("div", {
      "className": "jp-card-shiny"
    }), React.createElement("div", {
      "className": ClassNames("jp-card-cvc", "jp-card-display", {
        "jp-card-focused": this._isFocusedInput("cvc")
      }, this._getInputValidationState("cvc"))
    }, this.props.inputsValues[this.props.formInputsNames["cvc"]] || this.props.initialCvc), React.createElement("div", {
      "className": ClassNames("jp-card-number", "jp-card-display", {
        "jp-card-focused": this._isFocusedInput("number")
      }, this._getInputValidationState("number"))
    }, this.props.inputsValues[this.props.formInputsNames["number"]] || this.props.initialNumber), React.createElement("div", {
      "className": ClassNames("jp-card-name", "jp-card-display", {
        "jp-card-focused": this._isFocusedInput("name")
      }, this._getInputValidationState("name"))
    }, this.props.inputsValues[this.props.formInputsNames["name"]] || this.props.initialName), React.createElement("div", {
      "className": ClassNames("jp-card-expiry", "jp-card-display", {
        "jp-card-focused": this._isFocusedInput("expiry")
      }, this._getInputValidationState("expiry")),
      "data-before": this.props.messages.monthYear,
      "data-after": this.props.messages.validDate
    }, expiryValue))), React.createElement("div", {
      "className": "jp-card-back"
    }, React.createElement("div", {
      "className": "jp-card-bar"
    }), React.createElement("div", {
      "className": ClassNames("jp-card-cvc", "jp-card-display", {
        "jp-card-focused": this._isFocusedInput("cvc")
      }, this._getInputValidationState("cvc"))
    }, this.props.inputsValues[this.props.formInputsNames["cvc"]] || this.props.initialCvc), React.createElement("div", {
      "className": "jp-card-shiny"
    }))));
  }
});

module.exports = ReactCard;


},{"classnames":1,"payment":2,"react":"react"}],4:[function(require,module,exports){
var Payment, React, ReactCard, ReactCardFormContainer;

React = require('react');

Payment = require('payment');

ReactCard = require('./card-component.cjsx');

ReactCardFormContainer = React.createClass({
  displayName: 'ReactCardContainer',
  getDefaultProps: function() {
    return {
      formatting: true,
      formInputsNames: {
        number: 'number',
        expiry: 'expiry',
        cvc: 'cvc',
        name: 'name'
      },
      classes: {
        valid: 'jp-card-valid',
        invalid: 'jp-card-invalid'
      }
    };
  },
  getInitialState: function() {
    return {
      inputsValidationClass: {}
    };
  },
  componentWillMount: function() {
    this.inputsValues = {};
    this.inputsRefs = {};
    return this.cardFlipped = false;
  },
  componentDidMount: function() {
    if (!this.props.container) {
      console.log("Please provide a container react-card");
      return;
    }
    this.cardContainer = document.getElementById(this.props.container);
    if (!this.cardContainer) {
      console.log("couldn't find react-card container by its id. please make sure the correct id is provided");
      return;
    }
    if (this.props.formatting) {
      this.formatInputs();
    }
    return this.renderCardComponent();
  },
  formatInputs: function() {
    var inputsNames;
    inputsNames = this.props.formInputsNames;
    Payment.formatCardNumber(React.findDOMNode(this.refs[this.inputsRefs[inputsNames["number"]]]));
    Payment.formatCardCVC(React.findDOMNode(this.refs[this.inputsRefs[inputsNames["cvc"]]]));
    return Payment.formatCardExpiry(React.findDOMNode(this.refs[this.inputsRefs[inputsNames["expiry"]]]));
  },
  renderCardComponent: function() {
    if (this.cardContainer) {
      return React.render(React.createElement(ReactCard, React.__spread({}, this.props, {
        "cardFlipped": this.cardFlipped,
        "focusedInput": this.focusedInput,
        "inputsValues": this.inputsValues,
        "inputsValidationClass": this.state.inputsValidationClass
      })), this.cardContainer);
    }
  },
  traverseChildrenAndRegisterInputs: function(children) {
    if (typeof children !== 'object' || children === null) {
      return children;
    }
    return React.Children.map(children, (function(_this) {
      return function(child) {
        var inputsValidationClass, newClassName;
        if (typeof child !== 'object' || child === null) {
          return child;
        }
        if (child.props && child.props.name) {
          newClassName = child.props.className;
          inputsValidationClass = _this.state.inputsValidationClass[child.props.name];
          if (child.ref) {
            _this.inputsRefs[child.props.name] = child.ref;
          } else {
            _this.inputsRefs[child.props.name] = "react-card-input-" + child.props.name;
          }
          if (newClassName && inputsValidationClass) {
            newClassName = newClassName + " " + inputsValidationClass;
          } else if (inputsValidationClass) {
            newClassName = inputsValidationClass;
          }
          return React.cloneElement(child, {
            onChange: _this.inputOnChange,
            onFocus: _this.inputOnFocus,
            onBlur: _this.inputOnBlur,
            ref: _this.inputsRefs[child.props.name],
            className: newClassName
          }, child.props && child.props.children);
        } else {
          return React.cloneElement(child, {}, _this.traverseChildrenAndRegisterInputs(child.props && child.props.children));
        }
      };
    })(this));
  },
  inputOnChange: function(event) {
    this.inputsValues[event.target.name] = event.target.value;
    this.validateInput(event.target.name, event.target.value);
    return this.renderCardComponent();
  },
  inputOnFocus: function(event) {
    this.focusedInput = event.target.name;
    if (this.focusedInput === this.props.formInputsNames['cvc']) {
      this.cardFlipped = true;
    }
    return this.renderCardComponent();
  },
  inputOnBlur: function(event) {
    this.focusedInput = '';
    this.cardFlipped = false;
    return this.renderCardComponent();
  },
  validateInput: function(inputName, inputValue) {
    var currentInputsValidationClass, inputsNames, objVal;
    inputsNames = this.props.formInputsNames;
    currentInputsValidationClass = this.state.inputsValidationClass;
    switch (inputName) {
      case inputsNames["expiry"]:
        objVal = Payment.fns.cardExpiryVal(inputValue);
        currentInputsValidationClass[inputsNames["expiry"]] = this.getInputValidationClass(Payment.fns.validateCardExpiry(objVal.month, objVal.year));
        break;
      case inputsNames["cvc"]:
        currentInputsValidationClass[inputsNames["cvc"]] = this.getInputValidationClass(Payment.fns.validateCardCVC(inputValue, this.cardType));
        break;
      case inputsNames["number"]:
        currentInputsValidationClass[inputsNames["number"]] = this.getInputValidationClass(Payment.fns.validateCardNumber(inputValue));
        break;
      case inputsNames["name"]:
        currentInputsValidationClass[inputsNames["name"]] = this.getInputValidationClass(inputValue !== "");
    }
    return this.setState({
      inputsValidationClass: currentInputsValidationClass
    });
  },
  getInputValidationClass: function(inputValid) {
    if (inputValid) {
      return this.props.classes.valid;
    } else {
      return this.props.classes.invalid;
    }
  },
  render: function() {
    return React.createElement("div", null, this.traverseChildrenAndRegisterInputs(this.props.children));
  }
});

module.exports = ReactCardFormContainer;


},{"./card-component.cjsx":3,"payment":2,"react":"react"}]},{},[4]);
