(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Payment, React, ReactCard, ReactCardFormContainer;

React = require('react');

Payment = require('payment');

ReactCard = require('./card-react-component');

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
      },
      initialValues: {},
      fieldTypes: ["number", "cvc", "expiry", "name"]
    };
  },
  getInitialState: function() {
    return {
      inputsValidationClass: {}
    };
  },
  componentWillMount: function() {
    var i, len, ref, results, type;
    this.inputsValues = {};
    this.inputsRefs = {};
    this.cardFlipped = false;
    ref = this.props.fieldTypes;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      type = ref[i];
      results.push(this.inputsValues[this.props.formInputsNames[type]] = this.props.initialValues[type]);
    }
    return results;
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


},{"./card-react-component":"./card-react-component","payment":"payment","react":"react"}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2hheXN0ZXJuL2Rldi9jYXJkLXJlYWN0L3NyYy9jb2ZmZWUvY2FyZC1yZWFjdC1mb3JtLWNvbnRhaW5lci5janN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0FBQ1IsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSOztBQUNWLFNBQUEsR0FBWSxPQUFBLENBQVEsd0JBQVI7O0FBRVosc0JBQUEsR0FBeUIsS0FBSyxDQUFDLFdBQU4sQ0FFdkI7RUFBQSxXQUFBLEVBQWEsb0JBQWI7RUFFQSxlQUFBLEVBQWlCLFNBQUE7V0FDZjtNQUFBLFVBQUEsRUFBWSxJQUFaO01BQ0EsZUFBQSxFQUNFO1FBQUEsTUFBQSxFQUFRLFFBQVI7UUFDQSxNQUFBLEVBQVEsUUFEUjtRQUVBLEdBQUEsRUFBSyxLQUZMO1FBR0EsSUFBQSxFQUFNLE1BSE47T0FGRjtNQU1BLE9BQUEsRUFDRTtRQUFBLEtBQUEsRUFBTyxlQUFQO1FBQ0EsT0FBQSxFQUFTLGlCQURUO09BUEY7TUFTQSxhQUFBLEVBQWUsRUFUZjtNQVVBLFVBQUEsRUFBWSxDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLFFBQWxCLEVBQTRCLE1BQTVCLENBVlo7O0VBRGUsQ0FGakI7RUFlQSxlQUFBLEVBQWlCLFNBQUE7V0FDZjtNQUFBLHFCQUFBLEVBQXVCLEVBQXZCOztFQURlLENBZmpCO0VBa0JBLGtCQUFBLEVBQW9CLFNBQUE7QUFDbEIsUUFBQTtJQUFBLElBQUMsQ0FBQSxZQUFELEdBQWdCO0lBQ2hCLElBQUMsQ0FBQSxVQUFELEdBQWM7SUFDZCxJQUFDLENBQUEsV0FBRCxHQUFlO0FBRWY7QUFBQTtTQUFBLHFDQUFBOzttQkFDRSxJQUFDLENBQUEsWUFBYSxDQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMs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O0FBSlAsV0FNTyxXQUFZLENBQUEsUUFBQSxDQU5uQjtRQU9JLDRCQUE2QixDQUFBLFdBQVksQ0FBQSxRQUFBLENBQVosQ0FBN0IsR0FBc0QsSUFBQyxDQUFBLHVCQUFELENBQXlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQVosQ0FBK0IsVUFBL0IsQ0FBekI7QUFEbkQ7QUFOUCxXQVFPLFdBQVksQ0FBQSxNQUFBLENBUm5CO1FBU0ksNEJBQTZCLENBQUEsV0FBWSxDQUFBLE1BQUEsQ0FBWixDQUE3QixHQUFvRCxJQUFDLENBQUEsdUJBQUQsQ0FBeUIsVUFBQSxLQUFnQixFQUF6QztBQVR4RDtXQVdBLElBQUMsQ0FBQSxRQUFELENBQVU7TUFBQyxxQkFBQSxFQUF1Qiw0QkFBeEI7S0FBVjtFQWZhLENBN0hmO0VBOElBLHVCQUFBLEVBQXlCLFNBQUMsVUFBRDtJQUN2QixJQUFHLFVBQUg7YUFBbUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBbEM7S0FBQSxNQUFBO2FBQTZDLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQTVEOztFQUR1QixDQTlJekI7RUFpSkEsTUFBQSxFQUFRLFNBQUE7QUFFTixXQUNFLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCLElBQTNCLEVBQ0csSUFBQyxDQUFBLGlDQUFELENBQW1DLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBMUMsQ0FESDtFQUhJLENBakpSO0NBRnVCOztBQTJKekIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcblBheW1lbnQgPSByZXF1aXJlICdwYXltZW50J1xuUmVhY3RDYXJkID0gcmVxdWlyZSAnLi9jYXJkLXJlYWN0LWNvbXBvbmVudCdcblxuUmVhY3RDYXJkRm9ybUNvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cbiAgZGlzcGxheU5hbWU6ICdSZWFjdENhcmRDb250YWluZXInXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiAtPlxuICAgIGZvcm1hdHRpbmc6IHRydWVcbiAgICBmb3JtSW5wdXRzTmFtZXM6XG4gICAgICBudW1iZXI6ICdudW1iZXInXG4gICAgICBleHBpcnk6ICdleHBpcnknXG4gICAgICBjdmM6ICdjdmMnXG4gICAgICBuYW1lOiAnbmFtZSdcbiAgICBjbGFzc2VzOlxuICAgICAgdmFsaWQ6ICdqcC1jYXJkLXZhbGlkJ1xuICAgICAgaW52YWxpZDogJ2pwLWNhcmQtaW52YWxpZCdcbiAgICBpbml0aWFsVmFsdWVzOiB7fVxuICAgIGZpZWxkVHlwZXM6IFtcIm51bWJlclwiLCBcImN2Y1wiLCBcImV4cGlyeVwiLCBcIm5hbWVcIl1cblxuICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgaW5wdXRzVmFsaWRhdGlvbkNsYXNzOiB7fVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogLT5cbiAgICBAaW5wdXRzVmFsdWVzID0ge31cbiAgICBAaW5wdXRzUmVmcyA9IHt9XG4gICAgQGNhcmRGbGlwcGVkID0gZmFsc2VcbiAgICAjIGluc2VydCB0aGUgaW5pdGlhbCBjYXJkIHZhbHVlc1xuICAgIGZvciB0eXBlIGluIEBwcm9wcy5maWVsZFR5cGVzXG4gICAgICBAaW5wdXRzVmFsdWVzW0Bwcm9wcy5mb3JtSW5wdXRzTmFtZXNbdHlwZV1dID0gQHByb3BzLmluaXRpYWxWYWx1ZXNbdHlwZV1cblxuXG4gIGNvbXBvbmVudERpZE1vdW50OiAtPlxuXG4gICAgI3ZhbGlkYXRlIHJlcXVpcmVkIHByb3BzXG4gICAgdW5sZXNzIEBwcm9wcy5jb250YWluZXJcbiAgICAgIGNvbnNvbGUubG9nIFwiUGxlYXNlIHByb3ZpZGUgYSBjb250YWluZXIgcmVhY3QtY2FyZFwiXG4gICAgICByZXR1cm5cblxuICAgICMgbWFraW5nIHN1cmUgdGhlIGNvbnRhaW5lciBlbGVtZW50IGV4aXN0c1xuICAgIEBjYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgQHByb3BzLmNvbnRhaW5lclxuICAgIHVubGVzcyBAY2FyZENvbnRhaW5lclxuICAgICAgY29uc29sZS5sb2cgXCJjb3VsZG4ndCBmaW5kIHJlYWN0LWNhcmQgY29udGFpbmVyIGJ5IGl0cyBpZC4gcGxlYXNlIG1ha2Ugc3VyZSB0aGUgY29ycmVjdCBpZCBpcyBwcm92aWRlZFwiXG4gICAgICByZXR1cm5cblxuICAgICMgZm9ybWF0IG51bWJlciBhbmQgY3ZjIGlucHV0IGVsZW1lbnRzLlxuICAgIGlmIEBwcm9wcy5mb3JtYXR0aW5nXG4gICAgICBAZm9ybWF0SW5wdXRzKClcblxuICAgICMgcmVuZGVyIHRoZSBjYXJkIGVsZW1lbnQgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgQHJlbmRlckNhcmRDb21wb25lbnQoKVxuXG4gICMgZm9ybWF0IHRoZSB0ZXh0IGluc2lkZSB0aGUgbnVtYmVyLCBjdmMgYW5kIGV4cGlyeSBpbnB1dHNcbiAgZm9ybWF0SW5wdXRzOiAtPlxuICAgIGlucHV0c05hbWVzID0gQHByb3BzLmZvcm1JbnB1dHNOYW1lc1xuICAgIFBheW1lbnQuZm9ybWF0Q2FyZE51bWJlciBSZWFjdC5maW5kRE9NTm9kZShAcmVmc1tAaW5wdXRzUmVmc1tpbnB1dHNOYW1lc1tcIm51bWJlclwiXV1dKVxuICAgIFBheW1lbnQuZm9ybWF0Q2FyZENWQyBSZWFjdC5maW5kRE9NTm9kZShAcmVmc1tAaW5wdXRzUmVmc1tpbnB1dHNOYW1lc1tcImN2Y1wiXV1dKVxuICAgIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeSBSZWFjdC5maW5kRE9NTm9kZShAcmVmc1tAaW5wdXRzUmVmc1tpbnB1dHNOYW1lc1tcImV4cGlyeVwiXV1dKVxuXG4gICMgUmVuZGVyIHRoZSBjYXJkIGNvbXBvbmVudCBpbnRvIHRoZSBET00gaW4gdGhlIHN1cHBsaWVkIHRoaXMuY2FyZENvbnRhaW5lclxuICAjIGFjY29yZGluZyB0byBSZWFjdCBkb2NzOiBcIklmIHRoZSBSZWFjdEVsZW1lbnQgd2FzIHByZXZpb3VzbHkgcmVuZGVyZWQgaW50byBjb250YWluZXIsXG4gICMgdGhpcyB3aWxsIHBlcmZvcm0gYW4gdXBkYXRlIG9uIGl0IGFuZCBvbmx5IG11dGF0ZSB0aGUgRE9NIGFzIG5lY2Vzc2FyeSB0byByZWZsZWN0IHRoZSBsYXRlc3QgUmVhY3QgY29tcG9uZW50LlwiXG4gIHJlbmRlckNhcmRDb21wb25lbnQ6IC0+XG4gICAgaWYgQGNhcmRDb250YWluZXJcbiAgICAgIFJlYWN0LnJlbmRlciBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Q2FyZCwgUmVhY3QuX19zcHJlYWQoe30sIFxcXG4gICAgICAgICAgICAgICAgICAgIEBwcm9wcywgeyBcXFxuICAgICAgICAgICAgICAgICAgICBcImNhcmRGbGlwcGVkXCI6IChAY2FyZEZsaXBwZWQpLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgXCJmb2N1c2VkSW5wdXRcIjogKEBmb2N1c2VkSW5wdXQpLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgXCJpbnB1dHNWYWx1ZXNcIjogKEBpbnB1dHNWYWx1ZXMpLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgXCJpbnB1dHNWYWxpZGF0aW9uQ2xhc3NcIjogKEBzdGF0ZS5pbnB1dHNWYWxpZGF0aW9uQ2xhc3MpfSkpXG4gICAgICAsIEBjYXJkQ29udGFpbmVyXG5cbiAgIyBUcmF2ZXJzZSB0aGUgY2hpbGRyZW4gYW5kIGNoaWxkcmVuIG9mIGNoaWxkcmVuIHRvIGZpbmRcbiAgIyBhbGwgaW5wdXRzIGJ5IGNoZWNraW5nIHRoZSBuYW1lIHByb3AuIE1heWJlIGRvIGEgYmV0dGVyXG4gICMgY2hlY2sgaGVyZVxuICB0cmF2ZXJzZUNoaWxkcmVuQW5kUmVnaXN0ZXJJbnB1dHM6IChjaGlsZHJlbiktPlxuXG4gICAgaWYgdHlwZW9mIGNoaWxkcmVuIGlzbnQgJ29iamVjdCcgb3IgY2hpbGRyZW4gaXMgbnVsbFxuICAgICAgcmV0dXJuIGNoaWxkcmVuXG5cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQpPT5cblxuICAgICAgaWYgdHlwZW9mIGNoaWxkIGlzbnQgJ29iamVjdCcgb3IgY2hpbGQgaXMgbnVsbFxuICAgICAgICByZXR1cm4gY2hpbGRcblxuICAgICAgaWYgKGNoaWxkLnByb3BzIGFuZCBjaGlsZC5wcm9wcy5uYW1lKVxuXG4gICAgICAgIG5ld0NsYXNzTmFtZSA9IGNoaWxkLnByb3BzLmNsYXNzTmFtZVxuICAgICAgICBpbnB1dHNWYWxpZGF0aW9uQ2xhc3MgPSBAc3RhdGUuaW5wdXRzVmFsaWRhdGlvbkNsYXNzW2NoaWxkLnByb3BzLm5hbWVdXG5cbiAgICAgICAgIyBhc3NpZ24gYSBuZXcgcmVmIGlmIG9uZSBkb2VzIG5vdCBleGlzdHNcbiAgICAgICAgaWYgY2hpbGQucmVmXG4gICAgICAgICAgQGlucHV0c1JlZnNbY2hpbGQucHJvcHMubmFtZV0gPSBjaGlsZC5yZWZcbiAgICAgICAgZWxzZVxuICAgICAgICAgIEBpbnB1dHNSZWZzW2NoaWxkLnByb3BzLm5hbWVdID0gXCJyZWFjdC1jYXJkLWlucHV0LSN7Y2hpbGQucHJvcHMubmFtZX1cIlxuXG4gICAgICAgICMgYWRkIHZhbGlkYXRpb24gY2xhc3NOYW1lIGlmIG5lZWRlZFxuICAgICAgICBpZiBuZXdDbGFzc05hbWUgYW5kIGlucHV0c1ZhbGlkYXRpb25DbGFzc1xuICAgICAgICAgIG5ld0NsYXNzTmFtZSA9IFwiI3tuZXdDbGFzc05hbWV9ICN7aW5wdXRzVmFsaWRhdGlvbkNsYXNzfVwiXG4gICAgICAgIGVsc2UgaWYgaW5wdXRzVmFsaWRhdGlvbkNsYXNzXG4gICAgICAgICAgbmV3Q2xhc3NOYW1lID0gaW5wdXRzVmFsaWRhdGlvbkNsYXNzXG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgIG9uQ2hhbmdlOiBAaW5wdXRPbkNoYW5nZVxuICAgICAgICAgIG9uRm9jdXM6IEBpbnB1dE9uRm9jdXNcbiAgICAgICAgICBvbkJsdXI6IEBpbnB1dE9uQmx1clxuICAgICAgICAgIHJlZjogQGlucHV0c1JlZnNbY2hpbGQucHJvcHMubmFtZV1cbiAgICAgICAgICBjbGFzc05hbWU6IG5ld0NsYXNzTmFtZVxuICAgICAgICB9LCBjaGlsZC5wcm9wcyAmJiBjaGlsZC5wcm9wcy5jaGlsZHJlbilcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge30sIHRoaXMudHJhdmVyc2VDaGlsZHJlbkFuZFJlZ2lzdGVySW5wdXRzKGNoaWxkLnByb3BzICYmIGNoaWxkLnByb3BzLmNoaWxkcmVuKSlcbiAgICApXG5cbiAgaW5wdXRPbkNoYW5nZTogKGV2ZW50KS0+XG4gICAgQGlucHV0c1ZhbHVlc1tldmVudC50YXJnZXQubmFtZV0gPSBldmVudC50YXJnZXQudmFsdWVcbiAgICBAdmFsaWRhdGVJbnB1dCBldmVudC50YXJnZXQubmFtZSwgZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgQHJlbmRlckNhcmRDb21wb25lbnQoKVxuXG4gIGlucHV0T25Gb2N1czogKGV2ZW50KS0+XG4gICAgQGZvY3VzZWRJbnB1dCA9IGV2ZW50LnRhcmdldC5uYW1lXG4gICAgIyBmbGlwIGNhcmQgaWYgZm9jdXNlZCBpbnB1dCBpcyAnY3ZjJyBmaWVsZFxuICAgIGlmIEBmb2N1c2VkSW5wdXQgaXMgQHByb3BzLmZvcm1JbnB1dHNOYW1lc1snY3ZjJ11cbiAgICAgIEBjYXJkRmxpcHBlZCA9IHRydWVcbiAgICBAcmVuZGVyQ2FyZENvbXBvbmVudCgpXG5cbiAgaW5wdXRPbkJsdXI6IChldmVudCktPlxuICAgIEBmb2N1c2VkSW5wdXQgPSAnJ1xuICAgIEBjYXJkRmxpcHBlZCA9IGZhbHNlXG4gICAgQHJlbmRlckNhcmRDb21wb25lbnQoKVxuXG4gIHZhbGlkYXRlSW5wdXQ6IChpbnB1dE5hbWUsIGlucHV0VmFsdWUpLT5cbiAgICBpbnB1dHNOYW1lcyA9IEBwcm9wcy5mb3JtSW5wdXRzTmFtZXNcbiAgICBjdXJyZW50SW5wdXRzVmFsaWRhdGlvbkNsYXNzID0gQHN0YXRlLmlucHV0c1ZhbGlkYXRpb25DbGFzc1xuXG4gICAgc3dpdGNoIGlucHV0TmFtZVxuICAgICAgd2hlbiBpbnB1dHNOYW1lc1tcImV4cGlyeVwiXVxuICAgICAgICBvYmpWYWwgPSBQYXltZW50LmZucy5jYXJkRXhwaXJ5VmFsIGlucHV0VmFsdWVcbiAgICAgICAgY3VycmVudElucHV0c1ZhbGlkYXRpb25DbGFzc1tpbnB1dHNOYW1lc1tcImV4cGlyeVwiXV0gPSBAZ2V0SW5wdXRWYWxpZGF0aW9uQ2xhc3MoUGF5bWVudC5mbnMudmFsaWRhdGVDYXJkRXhwaXJ5IG9ialZhbC5tb250aCwgb2JqVmFsLnllYXIpXG4gICAgICB3aGVuIGlucHV0c05hbWVzW1wiY3ZjXCJdXG4gICAgICAgIGN1cnJlbnRJbnB1dHNWYWxpZGF0aW9uQ2xhc3NbaW5wdXRzTmFtZXNbXCJjdmNcIl1dID0gQGdldElucHV0VmFsaWRhdGlvbkNsYXNzKFBheW1lbnQuZm5zLnZhbGlkYXRlQ2FyZENWQyBpbnB1dFZhbHVlLCBAY2FyZFR5cGUpXG4gICAgICB3aGVuIGlucHV0c05hbWVzW1wibnVtYmVyXCJdXG4gICAgICAgIGN1cnJlbnRJbnB1dHNWYWxpZGF0aW9uQ2xhc3NbaW5wdXRzTmFtZXNbXCJudW1iZXJcIl1dID0gQGdldElucHV0VmFsaWRhdGlvbkNsYXNzKFBheW1lbnQuZm5zLnZhbGlkYXRlQ2FyZE51bWJlciBpbnB1dFZhbHVlKVxuICAgICAgd2hlbiBpbnB1dHNOYW1lc1tcIm5hbWVcIl1cbiAgICAgICAgY3VycmVudElucHV0c1ZhbGlkYXRpb25DbGFzc1tpbnB1dHNOYW1lc1tcIm5hbWVcIl1dID0gQGdldElucHV0VmFsaWRhdGlvbkNsYXNzKGlucHV0VmFsdWUgaXNudCBcIlwiKVxuXG4gICAgQHNldFN0YXRlIHtpbnB1dHNWYWxpZGF0aW9uQ2xhc3M6IGN1cnJlbnRJbnB1dHNWYWxpZGF0aW9uQ2xhc3N9XG5cbiAgZ2V0SW5wdXRWYWxpZGF0aW9uQ2xhc3M6IChpbnB1dFZhbGlkKS0+XG4gICAgaWYgaW5wdXRWYWxpZCB0aGVuIEBwcm9wcy5jbGFzc2VzLnZhbGlkIGVsc2UgQHByb3BzLmNsYXNzZXMuaW52YWxpZFxuXG4gIHJlbmRlcjogLT5cblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgKCBAdHJhdmVyc2VDaGlsZHJlbkFuZFJlZ2lzdGVySW5wdXRzKEBwcm9wcy5jaGlsZHJlbikgKVxuICAgICAgKVxuICAgIClcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENhcmRGb3JtQ29udGFpbmVyXG4iXX0=
