const express = require('express');
const multer = require('multer');
const { locationImageController } = require('../controllers');
const {
  authMid,
  locationImageMid,
  fileMid,
  generalMid,
} = require('../middlewares');

const route = express.Router();
const upload = multer({ dest: 'temp/' });

route
  .post('/', [upload.single('image'),
    authMid.sessionChecker,
    authMid.havePermissions,
    locationImageMid.checkAll,
    locationImageController.create,
    fileMid.saveImage],
  fileMid.errorHandler)
  .delete('/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions,
    locationImageController.remove],
  fileMid.deleteImage)
  .get('/', [locationImageMid.checkImageName,
    authMid.sessionChecker,
    authMid.havePermissions],
  fileMid.getImage);

module.exports = route;
