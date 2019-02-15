export const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isEmail': {
        isValid = isValid && emailValidator(val);
        break;
      }
      case 'minLength': {
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      }
      case 'equalTo': {
        // pass in the value of the password controls to be compared with, not of the confirmPassword control
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      }
      case 'notEmpty': {
        isValid = isValid && notEmptyValidator(val);
        break;
      }
      default: {
      }

    }
  }
  return isValid;
};
const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};
const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};
const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};
const notEmptyValidator = (val) => {
  return val && val.trim() !== '';
};
