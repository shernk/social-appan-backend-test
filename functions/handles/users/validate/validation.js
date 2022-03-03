const { isEmpty, isEmail, isEmailValidated } = require("./isvalidated");

exports.validateSignUp = (signup) => {
  let errors = {};

  if (isEmpty(signup.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(signup.email)) {
    errors.email = "Email address is invalid";
  }

  if (isEmpty(signup.password)) {
    errors.password = "Must be not be empty & have 8 or more characters";
  } else if (signup.password.length < 8) {
    errors.password = "Must be have 8 or more characters";
  }

  if (isEmpty(signup.confirmPassword)) {
    errors.confirmPassword = "Must be not be empty";
  } else if (signup.confirmPassword !== signup.password) {
    errors.confirmPassword = "Do not match";
  }

  if (isEmpty(signup.handle)) errors.handle = "Must be not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignIn = (signin) => {
  let errors = {};

  if (isEmpty(signin.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(signin.email)) {
    errors.email = "Email address is invalid";
  }

  if (isEmpty(signin.password)) {
    errors.password = "Must be not be empty & have 8 or more characters";
  } else if (signin.password.length < 8) {
    errors.password = "Must be have 8 or more characters";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (userData) => {
  let userDetails = {};

  if (!isEmpty(userData.bio.trim())) userDetails.bio = userData.bio;
  if (!isEmpty(userData.website.trim())) {
    // https://website.com
    if (userData.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `https://${userData.website.trim()}`;
    } else userDetails.website = userData.website;
  }
  if (!isEmpty(userData.location.trim()))
    userDetails.location = userData.location;

  return userDetails;
};
