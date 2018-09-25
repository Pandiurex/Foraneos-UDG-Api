const requestUrl = (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
};

const requestType = (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
};

const requestTime = (req, res, next) => {
  req.body.requestTime = Date.now();
  next();
};

const userGet = (req, res, next) => {
  console.log('ID:', req.params.id);
  next();
};
const userSend = (req, res, next) => {
  res.send('User Info');
  next();
};

module.exports = {
  requestTime,
  requestUrl,
  requestType,
  userGet,
  userSend,
};
