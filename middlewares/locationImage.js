const { getCompare } = require('./general');

const checkLocationId = (req, res, next) => {
  if (getCompare.number.test(req.body.locationId) === false) {
    next({
      status: 406,
      message: 'Invalid format in locationId',
    });
  } else {
    next();
  }
};

const checkImageFile = (req, res, next) => {
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
    req.body.image = `locationImages/file-${req.file.filename}.${type}`;
    next();
  }
};

const checkImageName = (req, res, next) => {
  if (getCompare.locationImage.test(req.query.image) === false) {
    next({
      status: 406,
      message: 'Invalid format in image',
    });
  } else {
    next();
  }
};

const checkAll = [
  checkLocationId,
  checkImageFile,
];

module.exports = {
  checkLocationId,
  checkImageFile,
  checkImageName,
  checkAll,
};
