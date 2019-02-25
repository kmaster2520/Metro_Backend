const sendMsg = require('../util/sendMsg');

// Status Codes
const deleteSuccess = { code: 0, msg: 'Delete Successful' };
const deleteIncorrect = { code: 1, msg: 'Account Credentials Incorrect' };
const deleteError = { code: 9, msg: '500: Delete Error' };

function deleteUser(params, res, dbCon) {
  dbCon.deleteUser(params.username, params.password, (err, didDelete) => {
    if (err) {
      sendMsg.obj(res, 500, deleteError);
    } else {
      if (didDelete) {
        sendMsg.obj(res, 200, deleteSuccess);
      } else {
        sendMsg.obj(res, 400, deleteIncorrect);
      }

    }
  });
}


module.exports = deleteUser;