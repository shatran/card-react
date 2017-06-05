React = require 'react'
ReactDOM = require 'react-dom'
CardReactFormContainer = require '../lib/card-react-form-container.js'

CardLoader = React.createClass

  displayName: "CardLoader"

  render: ->

    <div>
      <CardReactFormContainer

        container="react-card-container"

        inputAttributeIndentifier="id"

        formInputsNames={
          number: 'CCnumber', # optional — default input[name = "number"]
          expiry: 'CCexpiry', # optional — default input[name = "expiry"]
          cvc: 'CCcvc', # optional — default input[name = "cvc"]
          name: 'CCname' # optional - defaults input[name = "name"]
        }

        initialValues= {
          expiry: '16/12'
          name:'Random Name'
        }

        # the class to add to the form input and the corresponding card element when the input is valid or invalid.
        classes={
          valid: 'valid', # optional — default 'jp-card-valid'
          invalid: 'invalid' # optional — default 'jp-card-invalid'
        }

      >
          <form>
            <input placeholder="Full name" type="text" id="CCname" />
            <input placeholder="Card number" type="text" id="CCnumber" />
            <input placeholder="MM/YY" type="text" id="CCexpiry" />
            <input placeholder="CVC" type="text" id="CCcvc" />
          </form>
      </CardReactFormContainer>
      <div id="react-card-container"></div>
    </div>


ReactDOM.render <CardLoader />, document.getElementById 'demo-container'
