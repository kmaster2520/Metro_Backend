
// Status Codes
const loginSuccess = { code: 0, msg: 'Login Successful' };
const loginIncorrect = { code: 1, msg: 'Login Incorrect' };
const serverError = { code: 9, msg: '500: Login Error'  };

function login(params, res, dbCon) {
    dbCon.loginUser(params.username, params.password, (err, didLogin) => {
        if (err) {
            console.log(err);
            res.status(500); res.send(serverError);
        } else {
            if (didLogin)  {
                res.status(200); res.send(loginSuccess);
            } else {
                res.status(400); res.send(loginIncorrect);
            }
        }
    });
}

module.exports = login;