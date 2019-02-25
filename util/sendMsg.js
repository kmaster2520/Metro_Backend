
// sends simple message
function sendMsg(res, code, msg) {
  res.status(code);
  msg = { msg: msg };
  res.send(msg);
}

// sends JSON object
function sendObj(res, code, obj) {
  res.status(code);
  res.send(obj);
}

module.exports = {
  msg: sendMsg,
  obj: sendObj
}