import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-input', 'PaperInputComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it does not set isInvalid when required is false and text has no value', function(assert) {
  assert.expect(1);
  var component = this.subject();

  component.set('required', false);
  component.set('value', '');

  assert.equal(component.get('isInvalid'), false, 'isInvalid is true');
});

test('it sets isInvalid as true when required is true and text has no value', function(assert) {
  assert.expect(1);
  var component = this.subject();

  component.set('required', true);
  component.set('value', '');
  component.set('isTouched', true);

  assert.equal(component.get('isInvalid'), true, 'isInvalid is false');
});

test('it does not set isInvalid when required is true and text has value', function(assert) {
  assert.expect(1);
  var component = this.subject();

  component.set('required', true);
  component.set('value', 'Ember Paper');
  component.set('isTouched', true);

  assert.equal(component.get('isInvalid'), false, 'isInvalid is true with a value');
});

test('it does not set isInvalid when required is true, text has no value and isTouched is false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  component.set('required', true);
  component.set('value', '');
  component.set('isTouched', false);

  assert.equal(component.get('isInvalid'), false, 'isInvalid is true');
});

test('it sets isInvalid when it is otherwise valid and the errors input is set', function(assert) {
  assert.expect(2);
  var component = this.subject();
  component.set('required', true);
  component.set('value', '');
  component.set('isTouched', false);

  // verify it is otherwise valid
  assert.equal(component.get('isInvalid'), false, 'isInvalid is true');

  // set the errors input property
  component.set('errors', [{message: 'some custom error message'}]);
  assert.equal(component.get('isInvalid'), true, 'isInvalid is false when the errors input is set');
});

test('it adds md-input-invalid css class when isInvalid', function(assert) {
  assert.expect(2);
  var inputGroup,
      component = this.subject();

  component.set('required', true);
  component.set('value', '');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');

  assert.equal(inputGroup.length === 1, true);
  assert.equal(inputGroup[0].className.indexOf('md-input-invalid') >= 0, true, 'Could not find md-input-invalid css class');
});

test('it sets error text when isInvalid', function(assert) {
  assert.expect(2);
  var inputGroup,
      errorDiv,
      expectedError = 'This is required.',
      component = this.subject();

  component.set('required', true);
  component.set('value', '');
  component.set('errorText', expectedError);
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');

  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);

  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);
});

test('it sets error text when errors input is set', function(assert) {
  assert.expect(2);
  var inputGroup,
      errorDiv,
      expectedError = 'A custom error message',
      component = this.subject();

  component.set('value', '');
  component.set('isTouched', true);
  component.set('errors', [{message: expectedError}]);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');

  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);

  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);
});

test('validates min with default error', function(assert) {
  var inputGroup,
      errorDiv,
      component = this.subject(),
      expectedError = 'Must be at least 3.';

  assert.expect(2);

  component.set('min', 3);
  component.set('value', 2);
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

});

test('validates min with custom error', function(assert) {
  var inputGroup,
    errorDiv,
    component = this.subject(),
    expectedError = 'Too low!';

  assert.expect(2);

  component.set('min', 3);
  component.set('min-errortext', expectedError);
  component.set('value', 2);
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-'+inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

});

test('validates min with no error', function(assert) {
  var inputGroup,
      errorDiv,
      component = this.subject();

  assert.expect(2);

  component.set('min', 3);
  component.set('value', 3);
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerText, '');

});

test('validates max with default error', function(assert) {
  var inputGroup,
      errorDiv,
      component = this.subject(),
      expectedError = 'Must be less than 3.';

  assert.expect(2);

  component.set('max', 3);
  component.set('value', 4);
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

});

test('validates max with custom error', function(assert) {
  var inputGroup,
      errorDiv,
      component = this.subject(),
      expectedError = 'Too high!';

  assert.expect(2);

  component.set('max', 3);
  component.set('max-errortext', expectedError);
  component.set('value', 4);
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

});

test('validates max with no error', function(assert) {
  var inputGroup,
      errorDiv,
      component = this.subject();

  assert.expect(2);

  component.set('max', 3);
  component.set('value', 3);
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerText, '');

});

test('validates maxlength with default error', function(assert) {
  var inputGroup,
    errorDiv,
    charCounterDiv,
    component = this.subject(),
    expectedError = 'Must not exceed 10 characters.';

  assert.expect(3);

  component.set('maxlength', 10);
  component.set('value', 'This is a test');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-'+inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

  charCounterDiv = document.getElementsByClassName('md-char-counter');
  assert.equal(charCounterDiv[0].innerHTML, '14/10');
});

test('validates maxlength with custom error', function(assert) {
  var inputGroup,
    errorDiv,
    charCounterDiv,
    component = this.subject(),
    expectedError = 'Too much!';

  assert.expect(3);

  component.set('maxlength', 10);
  component.set('maxlength-errortext', expectedError);
  component.set('value', 'This is a test');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-'+inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

  charCounterDiv = document.getElementsByClassName('md-char-counter');
  assert.equal(charCounterDiv[0].innerHTML, '14/10');

});

test('validates maxlength with no error', function(assert) {
  var inputGroup,
    errorDiv,
    charCounterDiv,
    component = this.subject();

  assert.expect(3);

  component.set('maxlength', 10);
  component.set('value', 'Testing...');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerText, '');

  charCounterDiv = document.getElementsByClassName('md-char-counter');
  assert.equal(charCounterDiv[0].innerHTML, '10/10');

});

test('custom validations with one object and error', function(assert) {
  var inputGroup,
    errorDiv,
    customValidationConstraint,
    component = this.subject(),
    expectedError = 'Value does not equal 4';

  assert.expect(2);

  customValidationConstraint = {
    'errorMessage': 'Value does not equal 4',
    'isError': function (inputValue) {
      return +inputValue !== 4;
    }
  };

  component.set('customValidation', customValidationConstraint);
  component.set('value', '5');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-'+inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

});

test('custom validations with one object and no error', function(assert) {
  var inputGroup,
    errorDiv,
    customValidationConstraint,
    component = this.subject();

  assert.expect(2);

  customValidationConstraint = {
    'errorMessage': 'Value does not equal 4',
    'isError': function (inputValue) {
      return +inputValue !== 4;
    }
  };

  component.set('customValidation', customValidationConstraint);
  component.set('value', '4');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerText, '');

});

test('custom validations with multiple constraints and error caught for first constraint', function(assert) {
  var inputGroup,
    errorDiv,
    customValidationArray,
    component = this.subject(),
    expectedError = 'Value is not even';

  assert.expect(2);

  customValidationArray = [
    {
      'errorMessage': 'Value is not even',
      'isError': function isInputisNotEven(inputValue) {
        return (+inputValue % 2) === 1;
      }
    },
    {
      'errorMessage': 'Value does not equal 4',
      'isError': function isInputFour(inputValue) {
        return +inputValue !== 4;
      }
    }
  ];

  component.set('customValidation', customValidationArray);
  component.set('value', '5');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-'+inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

});


test('custom validations with multiple constraints and error caught for second constraint', function(assert) {
  var inputGroup,
    errorDiv,
    customValidationArray,
    component = this.subject(),
    expectedError = 'Value does not equal 4';

  assert.expect(2);

  customValidationArray = [
    {
      'errorMessage': 'Value is not even',
      'isError': function isInputisNotEven(inputValue) {
        return (+inputValue % 2) === 1;
      }
    },
    {
      'errorMessage': 'Value does not equal 4',
      'isError': function isInputFour(inputValue) {
        return +inputValue !== 4;
      }
    }
  ];

  component.set('customValidation', customValidationArray);
  component.set('value', '6');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-'+inputGroup[0].id);
  assert.equal(errorDiv.innerHTML, expectedError, 'Error text does not equal ' + expectedError);

});

test('custom validations with multiple constraints and no error', function(assert) {
  var inputGroup,
    errorDiv,
    customValidationArray,
    component = this.subject();

  assert.expect(2);

  customValidationArray = [
    {
      'errorMessage': 'Value is not even',
      'isError': function isInputisNotEven(inputValue) {
        return (+inputValue % 2) === 1;
      }
    },
    {
      'errorMessage': 'Value does not equal 4',
      'isError': function isInputFour(inputValue) {
        return +inputValue !== 4;
      }
    }
  ];

  component.set('customValidation', customValidationArray);
  component.set('value', '4');
  component.set('isTouched', true);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');
  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-' + inputGroup[0].id);
  assert.equal(errorDiv.innerText, '');

});

