# card-react

### React credit card component

@jessepollak's [Card](http://github.com/jessepollak/card) make credit card forms look awesome.
card-react is a React component that aims to do the same for React.

![card](http://i.imgur.com/qG3TenO.gif)

### Features

  - Validate inputs
  - Format form inputs
  - Identifies card type
  - Initialize the card element with user details
  - The card element itself don't have to be a child of the form - it can be rendered anywhere

### How to install

 - `npm install card-react`
 - Add `card.css` file to your project's stylesheets. You can find it at `lib/` folder.

### Usage

Include card-react in your code:

```html
ReactCardFormContainer = require('card-react')
```

Once included, you can initialize the component. you'll need to make the component the container of your form:

```jsx
<ReactCardFormContainer

  // the id of the container element where you want to render the card component.
  // the card component can be rendered anywhere (doesn't have to be in ReactCardFormContainer).
  container="react-card-container" // required

  // an object contain the form inputs names.
  // every input must have a unique name prop.
  formInputsNames={
    {
      number: 'CCnumber', // optional — default input[name = "number"]
      expiry: 'CCexpiry',// optional — default input[name = "expiry"]
      cvc: 'CCcvc', // optional — default input[name = "cvc"]
      name: 'CCname' // optional - defaults input[name = "name"]
    }
  }

  // initial values to render in the card element
  initialValues= {
    {
      number='4242424242424242' // optional — default •••• •••• •••• ••••
      cvc='123' // optional — default •••
      expiry='16/12' // optional — default ••/••
      name='Random Name' // optional — default FULL NAME
    }
  }

  // the class to add to the input and the corresponding card element when the input is valid/invalid.
  classes={
    {
      valid: 'valid-input', // optional — default 'jp-card-valid'
      invalid: 'invalid-input' // optional — default 'jp-card-invalid'
    }
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

// the container in which the card component will be rendered - can be anywhere in the DOM
<div id="react-card-container"></div>

```

### To run the example:

  - npm install
  - grunt

#### Development

  - Run npm install
  - Run grunt
  - Navigate to http://localhost:8000/
  - Run grunt build after you make the changes

You are more than welcome to contribute. Enjoy!

