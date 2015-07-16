# card-react

### A better credit card form now also as a react component

[Card](http://github.com/jessepollak/card) makes credit card forms look and behave great. Everything is created with pure CSS, HTML, and Javascript — no images required.

![card](http://i.imgur.com/qG3TenO.gif)

## Usage

To use, you'll need to include the Card.js and card.css files into your project. You can find them at `dist/` folder.

```html
ReactCardFormContainer = require('card-react')
```

Once you've included those files, you can initialize Card.

```jsx

  <ReactCardFormContainer

    // the id of the container element where yo want to render the card component. this element can be anywhere in the DOM.
    container="react-card-container" // required

    // an object contain the form inputs name. every input must have a name prop so that card-react and identify it.
    formInputsNames={
      number: 'CCnumber', // optional — default input[name = "number"]
      expiry: 'CCexpiry',// optional — default input[name = "expiry"]
      cvc: 'CCcvc', // optional — default input[name = "cvc"]
      name: 'CCname' // optional - defaults input[name = "name"]
    }

    // initial values to render in the card element
    initialNumber='4242424242424242' // optional — default •••• •••• •••• ••••
    initialCvc='123' // optional — default •••
    initialExpiry='16/12' // optional — default ••/••
    initialName='Michael Jordan' // optional — default FULL NAME

    // the class to add to the form input and the corresponding card element when the input is valid/invalid.
    classes={
      valid: 'valid-input', // optional — default 'jp-card-valid'
      invalid: 'invalid-input' // optional — default 'jp-card-invalid'
    }

    // specify whether you want to format the form inputs or not
    formatting={true} // optional - default true
  >

    <form>
      <input placeholder="Full name" type="text" name="CCname" />
      <input placeholder="Card number" type="text" name="CCnumber" />
      <input placeholder="MM/YY" type="text" name="CCexpiry" />
      <input placeholder="CVC" type="text" name="CCcvc" />
    </form>

  </ReactCardFormContainer>
```

### Installing card-react from npm

If you're using npm, you can install card.js with:

  npm install card-react


### To see the example run:

  - npm install
  - grunt

#### Development

  - Run npm install
  - Run grunt
  - Navigate to http://localhost:8000/
  - Run grunt build after you make the changes

your more than welcome to contribute!

