const { getCompare, checkDate, hashPassword } = require('./general');
const { removeImage } = require('./file');

const checkUserType = (req, res, next) => {
  if (getCompare.number.test(req.body.userType) === false) {
    next({
      status: 406,
      message: 'Invalid format in userType',
    });
  } else if (req.body.userType < 0
    || req.body.userType > 2) {
    next({
      status: 406,
      message: 'Invalid format in userType',
    });
  } else {
    next();
  }
};

const checkUsername = (req, res, next) => {
  if (getCompare.username.test(req.body.username) === false) {
    next({
      status: 406,
      message: 'Invalid format in username',
    });
  } else {
    next();
  }
};

const checkPassword = (req, res, next) => {
  if (getCompare.password.test(req.body.password) === false) {
    next({
      status: 406,
      message: 'Invalid format in password',
    });
  } else {
    hashPassword(req);
    next();
  }
};

const checkName = (req, res, next) => {
  if (getCompare.word.test(req.body.name) === false) {
    next({
      status: 406,
      message: 'Invalid format in name',
    });
  } else {
    next();
  }
};

const checkFirstSurname = (req, res, next) => {
  if (getCompare.word.test(req.body.firstSurname) === false) {
    next({
      status: 406,
      message: 'Invalid format in firstSurname',
    });
  } else {
    next();
  }
};

const checkSecondSurname = (req, res, next) => {
  if (getCompare.word.test(req.body.secondSurname) === false) {
    next({
      status: 406,
      message: 'Invalid format in secondSurname',
    });
  } else {
    next();
  }
};

const checkProfileImage = (req, res, next) => {
  if (req.file === undefined
    || (req.file.mimetype !== 'image/jpeg'
      && req.file.mimetype !== 'image/jpg'
      && req.file.mimetype !== 'image/png')) {
    next({
      status: 406,
      message: 'Invalid image format',
    });
  } else {
    const type = req.file.mimetype.split('/')[1];
    req.body.profileImage = `profileImages/file-${req.file.filename}.${type}`;
    req.body.image = req.body.profileImage;
    res.locals.pastProfileImage = res.locals.user.profileImage;
    next();
  }
};

const checkBirthdate = (req, res, next) => {
  if (checkDate(req.body.birthdate) === false) {
    next({
      status: 406,
      message: 'Invalid format or date in birthdate',
    });
  } else {
    next();
  }
};

const checkGender = (req, res, next) => {
  if (getCompare.binary.test(req.body.gender) === false) {
    next({
      status: 406,
      message: 'Invalid format or gender',
    });
  } else {
    next();
  }
};

const checkMainEmail = (req, res, next) => {
  if (getCompare.email.test(req.body.mainEmail) === false) {
    next({
      status: 406,
      message: 'Invalid format or mainEmail',
    });
  } else {
    next();
  }
};

const checkMainEmailId = (req, res, next) => {
  if (getCompare.number.test(req.body.mainEmailId) === false) {
    next({
      status: 406,
      message: 'Invalid format or mainEmailId',
    });
  } else {
    next();
  }
};

const checkNumAttributesPut = (req, res, next) => {
  const numKeys = Object.keys(req.body).length;
  if (numKeys === 0) {
    next({
      status: 406,
      message: 'Put needs to receive at least one parameter',
    });
  } else if (numKeys > 7) {
    next({
      status: 406,
      message: 'Put is receiving not expected parameters',
    });
  } else {
    next();
  }
};

const checkNumAttributesPatch = (req, res, next) => {
  if (Object.keys(req.body).length !== 1
    && req.file === undefined) {
    next({
      status: 406,
      message: 'Patch needs to receive one parameter',
    });
  } else if (Object.keys(req.body).length === 1
    && req.file) {
    next({
      status: 406,
      message: 'Patch needs to receive one parameter',
    });
  } else {
    next();
  }
};

const checkAttributesPatch = (req, res, next) => {
  if (req.body.mainEmailId !== undefined) {
    checkMainEmailId(req, res, next);
  } else if (req.body.userType !== undefined) {
    checkUserType(req, res, next);
  } else if (req.body.password !== undefined) {
    checkPassword(req, res, next);
  } else if (req.body.name !== undefined) {
    checkName(req, res, next);
  } else if (req.body.firstSurname !== undefined) {
    checkFirstSurname(req, res, next);
  } else if (req.body.secondSurname !== undefined) {
    checkSecondSurname(req, res, next);
  } else if (req.body.birthdate !== undefined) {
    checkBirthdate(req, res, next);
  } else if (req.file !== undefined) {
    checkProfileImage(req, res, next);
  } else {
    next({
      status: 406,
      message: 'Patch is receiving not expected parameters',
    });
  }
};

const deletePastProfileImage = (req, res, next) => {
  removeImage(res.locals.pastProfileImage);
  next();
};

const checkQueryEmailId = (req, res, next) => {
  if (getCompare.number.test(req.query.emailId) === false) {
    next({
      status: 406,
      message: 'Invalid format or emailId',
    });
  } else {
    next();
  }
};

const checkQueryEmail = (req, res, next) => {
  if (getCompare.email.test(req.query.email) === false) {
    next({
      status: 406,
      message: 'Invalid format or email',
    });
  } else {
    next();
  }
};

const checkEmail = (req, res, next) => {
  if (getCompare.email.test(req.body.email) === false) {
    next({
      status: 406,
      message: 'Invalid format or email',
    });
  } else {
    next();
  }
};

const checkProfileImageName = (req, res, next) => {
  if (getCompare.profileImage.test(req.query.image) === false) {
    next({
      status: 406,
      message: 'Invalid format in image',
    });
  } else {
    next();
  }
};

const checkAllPost = [
  checkUserType,
  checkUsername,
  checkPassword,
  checkName,
  checkFirstSurname,
  checkSecondSurname,
  checkProfileImage,
  checkBirthdate,
  checkGender,
  checkMainEmail,
];

const checkAllPut = [
  checkNumAttributesPut,
  checkMainEmailId,
  checkUserType,
  checkPassword,
  checkName,
  checkFirstSurname,
  checkSecondSurname,
  checkProfileImage,
  checkBirthdate,
];

const checkAllPatch = [
  checkNumAttributesPatch,
  checkAttributesPatch,
];

module.exports = {
  checkUserType,
  checkUsername,
  checkPassword,
  checkName,
  checkFirstSurname,
  checkSecondSurname,
  checkProfileImage,
  checkBirthdate,
  checkGender,
  checkMainEmail,
  deletePastProfileImage,
  checkAllPost,
  checkAllPut,
  checkAllPatch,
  checkQueryEmail,
  checkQueryEmailId,
  checkEmail,
  checkProfileImageName,
};
