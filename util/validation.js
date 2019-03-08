
/*
Username and Password specs:

Username must be:
- at least 4 characters
- at most 16 characters
- contain only letters and digits

Password must be:
- at least 8 characters
- contain only ASCII characters from ! to ~ (no spaces)

Passwords are hashed using the BCrypt hash algorithm using 10 salt rounds.
Each hash contains 60 characters for a total of 448(?) bits. Though smaller
than other SHA algorithms, BCrypt hashing takes longer and therefore is more
resistant to brute force attacks

*/

// Check if username is valid
function validateUsername(username) {
  if (username.length < 4 || username.length > 16) {
    return false;
  }

  console.log(username)
  for (i = 0; i < username.length; i++) {
    c = username.charAt(i);
    if (!isLegalCharacterAN(c)) {
      return false;
    }
  }
  return true;
}

// Check if password is valid (does not check if password is correct)
function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }
  for (i = 0; i < password.length; i++) {
    c = password.charAt(i);
    if (!isLegalCharacterPassword(c)) {
      return false;
    }
  }
  return true;
}

// check for errors in user info
function errorsInUserInfo(username, password, cpassword) {

  // check if passwords match
  if (password !== cpassword) {
    return 'Passwords Don\'t Match';
  }

  // check if valid username
  if (!validation.validateUsername(username)) {
    return 'Username Invalid';
  }

  // check if valid password
  if (!validation.validatePassword(password)) {
    return 'Password Invalid';
  }

  return null;
}

// alphanumeric characters only
function isLegalCharacterAN(c) {
  if ('A' <= c && c <= 'Z') {
    return true;
  } else if ('a' <= c && c <= 'z') {
    return true;
  } else if ('0' <= c && c <= '9') {
    return true;
  }
  return false;
}

// keyboard characters only
function isLegalCharacterPassword(c) {
  if ('!' <= c && c <= '~') {
    return true;
  }
  return false;
}



module.exports = {
  validateUsername, validatePassword, errorsInUserInfo
}