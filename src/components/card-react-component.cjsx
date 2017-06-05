React = require 'react'
createReactClass = require 'create-react-class'
Payment = require 'payment'
ClassNames = require 'classnames'

dot = String.fromCharCode('8226')
ccDots = dot + dot + dot + dot
cvcDots = dot + dot + dot
expiryDots = dot + dot + '/' + dot + dot

CardReact = createReactClass

  displayName: "CardReact"

  getDefaultProps: ->
    messages:
      validDate: 'valid\nthru'
      monthYear: 'month/year'
    baseWidth: 350
    defaultValues:
      number: ccDots + " " + ccDots + " " + ccDots + " " + ccDots
      cvc: cvcDots
      expiry: expiryDots
      name: 'Full Name'

  componentWillMount: ->
    # add special styling according to specific browser
    @cardBrowserClass = @_addBrowserClass()

  _addBrowserClass: ->
    # safari can't handle transparent radial gradient right now
    if navigator?.userAgent
      ua = navigator.userAgent.toLowerCase()
      if ua.indexOf('safari') != -1 and ua.indexOf('chrome') == -1
        return 'jp-card-safari'
    if (/MSIE 10\./i.test(navigator.userAgent))
      return 'jp-card-ie-10'
    # ie 11 does not support conditional compilation, use user agent instead
    if (/rv:11.0/i.test(navigator.userAgent))
      return 'jp-card-ie-11'
    else return ''

  _getCardType: (cardNumber)->
    @cardType = Payment.fns.cardType cardNumber
    if @cardType and @cardType isnt 'unknown'
      return "jp-card-#{@cardType} jp-card-identified"

  _isFocusedInput: (inputName)->
    currentInputValue = @props.formInputsNames[inputName]

    # focused styling is applied to the currently focused element
    # and all other elements with user input values
    return ((@props.focusedInput is currentInputValue) or @props.inputsValues[currentInputValue])

  _getInputValidationState: (inputName)->
    validationState = @props.inputsValidationClass[@props.formInputsNames[inputName]]
    if typeof validationState is 'undefined'
      ''
    else
      validationState


  render: ->
    containerStyle = {}

    # scale the card according to the width prop
    if @props.width
      scaleWidth = "scale(#{@props.width / @props.baseWidth})"
      containerStyle =
        WebkitTransform: scaleWidth
        MozTransform: scaleWidth
        msTransform: scaleWidth
        OTransform: scaleWidth
        transform: scaleWidth

    # format the expiry value
    expiryValue = @props.inputsValues[@props.formInputsNames["expiry"]]
    if expiryValue
      expiryValue = expiryValue.replace(/\s+/g, '')
    else
      expiryValue = @props.defaultValues.expiry

    return (
      <div className="jp-card-container" style={containerStyle}>
        <div className={ClassNames("jp-card", @cardBrowserClass, @_getCardType(@props.inputsValues[@props.formInputsNames["number"]]), 'jp-card-flipped': @props.cardFlipped)}>
          <div className="jp-card-front">
            <div className="jp-card-logo jp-card-visa">visa</div>
            <div className="jp-card-logo jp-card-mastercard">MasterCard</div>
            <div className="jp-card-logo jp-card-maestro">Maestro</div>
            <div className="jp-card-logo jp-card-amex"></div>
            <div className="jp-card-logo jp-card-discover">discover</div>
            <div className="jp-card-logo jp-card-dankort"><div className="dk"><div className="d"></div><div className="k"></div></div></div>
            <div className="jp-card-lower">
              <div className="jp-card-shiny"></div>
              <div className={ClassNames("jp-card-cvc", "jp-card-display", "jp-card-focused": @_isFocusedInput("cvc"), @_getInputValidationState("cvc"))}>
                {@props.inputsValues[@props.formInputsNames["cvc"]] or @props.defaultValues.cvc}
              </div>
              <div className={ClassNames("jp-card-number", "jp-card-display", "jp-card-focused": @_isFocusedInput("number"), @_getInputValidationState("number"))}>
                {@props.inputsValues[@props.formInputsNames["number"]] or @props.defaultValues.number}
              </div>
              <div className={ClassNames("jp-card-name", "jp-card-display", "jp-card-focused": @_isFocusedInput("name"), @_getInputValidationState("name"))}>
                {@props.inputsValues[@props.formInputsNames["name"]] or @props.defaultValues.name}
              </div>
              <div className={ClassNames("jp-card-expiry", "jp-card-display", "jp-card-focused": @_isFocusedInput("expiry"), @_getInputValidationState("expiry"))}
                   data-before={@props.messages.monthYear}
                   data-after={@props.messages.validDate}>
                {expiryValue}
              </div>
            </div>
          </div>
          <div className="jp-card-back">
            <div className="jp-card-bar"></div>
            <div className={ClassNames("jp-card-cvc", "jp-card-display", "jp-card-focused": @_isFocusedInput("cvc"), @_getInputValidationState("cvc"))}>
              {@props.inputsValues[@props.formInputsNames["cvc"]] or @props.defaultValues.cvc}
            </div>
            <div className="jp-card-shiny"></div>
          </div>
        </div>
      </div>
    )

module.exports = CardReact
