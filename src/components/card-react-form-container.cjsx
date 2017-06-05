React = require 'react'
createReactClass = require 'create-react-class'
ReactDOM = require 'react-dom'
Payment = require 'payment'
ReactCard = require './card-react-component'

CardReactFormContainer = createReactClass

  displayName: 'CardReactFormContainer'

  getDefaultProps: ->
    formatting: true
    formInputsNames:
      number: 'number'
      expiry: 'expiry'
      cvc: 'cvc'
      name: 'name'
    classes:
      valid: 'jp-card-valid'
      invalid: 'jp-card-invalid'
    initialValues: {}
    fieldTypes: ["number", "cvc", "expiry", "name"]

  getInitialState: ->
    inputsValidationClass: {}

  componentWillMount: ->
    @inputsValues = {}
    @inputsRefs = {}
    @cardFlipped = false
    # insert the initial card values
    for type in @props.fieldTypes
      @inputsValues[@props.formInputsNames[type]] = @props.initialValues[type]


  componentDidMount: ->

    #validate required props
    unless @props.container
      console.log "Please provide a container react-card"
      return

    # making sure the container element exists
    @cardContainer = document.getElementById @props.container
    unless @cardContainer
      console.log "couldn't find react-card container by its id. please make sure the correct id is provided"
      return

    # format number and cvc input elements.
    if @props.formatting
      @formatInputs()

    # render the card element for the first time
    @renderCardComponent()

  # format the text inside the number, cvc and expiry inputs
  formatInputs: ->
    inputsNames = @props.formInputsNames
    Payment.formatCardNumber ReactDOM.findDOMNode(@refs[@inputsRefs[inputsNames["number"]]])
    Payment.formatCardCVC ReactDOM.findDOMNode(@refs[@inputsRefs[inputsNames["cvc"]]])
    Payment.formatCardExpiry ReactDOM.findDOMNode(@refs[@inputsRefs[inputsNames["expiry"]]])

  # Render the card component into the DOM in the supplied this.cardContainer
  # according to React docs: "If the ReactElement was previously rendered into container,
  # this will perform an update on it and only mutate the DOM as necessary to reflect the latest React component."
  renderCardComponent: ->
    if @cardContainer
      ReactDOM.render <ReactCard
                    {...@props}
                    cardFlipped={@cardFlipped}
                    focusedInput={@focusedInput}
                    inputsValues={@inputsValues}
                    inputsValidationClass={@state.inputsValidationClass}/>
      , @cardContainer

  # Traverse the children and children of children to find
  # all inputs by checking the name prop. Maybe do a better
  # check here
  traverseChildrenAndRegisterInputs: (children)->

    if typeof children isnt 'object' or children is null
      return children

    return React.Children.map(children, (child)=>

      if typeof child isnt 'object' or child is null
        return child

      if (child.props and child.props.name)

        newClassName = child.props.className
        inputsValidationClass = @state.inputsValidationClass[child.props.name]

        # assign a new ref if one does not exists
        if child.ref
          @inputsRefs[child.props.name] = child.ref
        else
          @inputsRefs[child.props.name] = "react-card-input-#{child.props.name}"

        # add validation className if needed
        if newClassName and inputsValidationClass
          newClassName = "#{newClassName} #{inputsValidationClass}"
        else if inputsValidationClass
          newClassName = inputsValidationClass

        return React.cloneElement(child, {
          onKeyUp: @inputOnKeyUp
          onFocus: @inputOnFocus
          onBlur: @inputOnBlur
          ref: @inputsRefs[child.props.name]
          defaultValue: @inputsValues[child.props.name]
          className: newClassName
        }, child.props && child.props.children)
      else
        return React.cloneElement(child, {}, this.traverseChildrenAndRegisterInputs(child.props && child.props.children))
    )

  inputOnKeyUp: (event)->
    @inputsValues[event.target.name] = event.target.value
    @validateInput event.target.name, event.target.value
    @renderCardComponent()

  inputOnFocus: (event)->
    @focusedInput = event.target.name
    # flip card if focused input is 'cvc' field
    if @focusedInput is @props.formInputsNames['cvc']
      @cardFlipped = true
    @renderCardComponent()

  inputOnBlur: (event)->
    @focusedInput = ''
    @cardFlipped = false
    @renderCardComponent()

  validateInput: (inputName, inputValue)->
    inputsNames = @props.formInputsNames
    currentInputsValidationClass = @state.inputsValidationClass

    switch inputName
      when inputsNames["expiry"]
        objVal = Payment.fns.cardExpiryVal inputValue
        currentInputsValidationClass[inputsNames["expiry"]] = @getInputValidationClass(Payment.fns.validateCardExpiry objVal.month, objVal.year)
      when inputsNames["cvc"]
        currentInputsValidationClass[inputsNames["cvc"]] = @getInputValidationClass(Payment.fns.validateCardCVC inputValue, @cardType)
      when inputsNames["number"]
        currentInputsValidationClass[inputsNames["number"]] = @getInputValidationClass(Payment.fns.validateCardNumber inputValue)
      when inputsNames["name"]
        currentInputsValidationClass[inputsNames["name"]] = @getInputValidationClass(inputValue isnt "")

    @setState {inputsValidationClass: currentInputsValidationClass}

  getInputValidationClass: (inputValid)->
    if inputValid then @props.classes.valid else @props.classes.invalid

  render: ->

    return (
      <div>
       { @traverseChildrenAndRegisterInputs(@props.children) }
      </div>
    )

module.exports = CardReactFormContainer
