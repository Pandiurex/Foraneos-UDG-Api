const bcrypt = require('bcrypt');

const getCompare = {
  username: /^[a-zA-Z_0-9]*$/,
  word: /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/,
  paragraph: /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ0-9\s\\.,;/\-:'"()!¡?¿*]*$/,
  email: /[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
  binary: /^[01]$/,
  number: /^([0-9])+$/,
  decimal: /^\d+\.\d{0,2}$/,
  latLon: /^(\d*\.)?\d+$/,
  postal: /^([0-9]){1,5}$/,
  locationImage: /^locationImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
  serviceImage: /^serviceImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
  profileImage: /^profileImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
};

const checkParamId = (req, res, next) => {
  if (getCompare.number.test(req.params.id) === false) {
    next({
      status: 406,
      message: 'Invalid format in param id',
    });
  } else {
    next();
  }
};

const checkParamUserId = (req, res, next) => {
  if (getCompare.number.test(req.params.userId) === false) {
    next({
      status: 406,
      message: 'Invalid format in param userId',
    });
  } else {
    next();
  }
};

const checkParamLocationId = (req, res, next) => {
  if (getCompare.number.test(req.params.locationId) === false) {
    next({
      status: 406,
      message: 'Invalid format in param locationId',
    });
  } else {
    next();
  }
};

const checkDate = (date) => {
  if (date === undefined) {
    return false;
  }

  const arr = date.split('-');
  const auxDate = new Date(arr[0], arr[1] - 1, arr[2]);

  if (arr.length === 3 && auxDate
   && Number(arr[0]) === auxDate.getFullYear()
   && Number(arr[1] - 1) === auxDate.getMonth()
   && Number(arr[2]) === auxDate.getDate()) {
    return true;
  }
  return false;
};

const hashPassword = async (req) => {
  if (req.query.password !== undefined) {
    req.query.password = await bcrypt.hash(`${req.query.password}`,
      Number(process.env.SECRET));
  } else if (req.body.password !== undefined) {
    req.body.password = await bcrypt.hash(`${req.body.password}`,
      Number(process.env.SECRET));
  }
};

module.exports = {
  getCompare,
  checkParamId,
  checkParamUserId,
  checkParamLocationId,
  checkDate,
  hashPassword,
};
