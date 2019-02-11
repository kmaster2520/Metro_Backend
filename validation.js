
function validateUsername(username) {
    if (password.length < 6 || password.length > 16) {
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

function isLegalCharacterPassword(c) {
    if ('!' <= c && c <= '~') {
        return true;
    }
    return false;
}



module.exports = {
    validateUsername, validatePassword
}