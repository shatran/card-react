(function() {
  var CardReact, ClassNames, Payment, React, ccDots, createReactClass, cvcDots, dot, expiryDots;

  React = require('react');

  createReactClass = require('create-react-class');

  Payment = require('payment');

  ClassNames = require('classnames');

  dot = String.fromCharCode('8226');

  ccDots = dot + dot + dot + dot;

  cvcDots = dot + dot + dot;

  expiryDots = dot + dot + '/' + dot + dot;

  CardReact = createReactClass({
    displayName: "CardReact",
    getDefaultProps: function() {
      return {
        messages: {
          validDate: 'valid\nthru',
          monthYear: 'month/year'
        },
        baseWidth: 350,
        defaultValues: {
          number: ccDots + " " + ccDots + " " + ccDots + " " + ccDots,
          cvc: cvcDots,
          expiry: expiryDots,
          name: 'Full Name'
        }
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
        expiryValue = this.props.defaultValues.expiry;
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
      }, this.props.inputsValues[this.props.formInputsNames["cvc"]] || this.props.defaultValues.cvc), React.createElement("div", {
        "className": ClassNames("jp-card-number", "jp-card-display", {
          "jp-card-focused": this._isFocusedInput("number")
        }, this._getInputValidationState("number"))
      }, this.props.inputsValues[this.props.formInputsNames["number"]] || this.props.defaultValues.number), React.createElement("div", {
        "className": ClassNames("jp-card-name", "jp-card-display", {
          "jp-card-focused": this._isFocusedInput("name")
        }, this._getInputValidationState("name"))
      }, this.props.inputsValues[this.props.formInputsNames["name"]] || this.props.defaultValues.name), React.createElement("div", {
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
      }, this.props.inputsValues[this.props.formInputsNames["cvc"]] || this.props.defaultValues.cvc), React.createElement("div", {
        "className": "jp-card-shiny"
      }))));
    }
  });

  module.exports = CardReact;

}).call(this);
