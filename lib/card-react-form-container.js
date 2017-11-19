(function() {
  var CardReactFormContainer, Payment, React, ReactCard, ReactDOM, createReactClass;

  React = require('react');

  createReactClass = require('create-react-class');

  ReactDOM = require('react-dom');

  Payment = require('payment');

  ReactCard = require('./card-react-component');

  CardReactFormContainer = createReactClass({
    displayName: 'CardReactFormContainer',
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
      Payment.formatCardNumber(ReactDOM.findDOMNode(this.refs[this.inputsRefs[inputsNames["number"]]]));
      Payment.formatCardCVC(ReactDOM.findDOMNode(this.refs[this.inputsRefs[inputsNames["cvc"]]]));
      return Payment.formatCardExpiry(ReactDOM.findDOMNode(this.refs[this.inputsRefs[inputsNames["expiry"]]]));
    },
    renderCardComponent: function() {
      if (this.cardContainer) {
        return ReactDOM.render(React.createElement(ReactCard, Object.assign({}, this.props, {
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
              onKeyUp: _this.inputOnKeyUp,
              onFocus: _this.inputOnFocus,
              onBlur: _this.inputOnBlur,
              ref: _this.inputsRefs[child.props.name],
              defaultValue: _this.inputsValues[child.props.name],
              className: newClassName
            }, child.props && child.props.children);
          } else {
            return React.cloneElement(child, {}, _this.traverseChildrenAndRegisterInputs(child.props && child.props.children));
          }
        };
      })(this));
    },
    inputOnKeyUp: function(event) {
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

  module.exports = CardReactFormContainer;

}).call(this);
