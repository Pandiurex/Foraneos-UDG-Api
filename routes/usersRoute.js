const express = require('express');
const multer = require('multer');
const { usersController } = require('../controllers');
const {
  authMid,
  userMid,
  fileMid,
  generalMid,
} = require('../middlewares');

const route = express.Router();
const upload = multer({ dest: 'temp/' });

route
  .get('/', [authMid.sessionChecker, authMid.havePermissions],
    usersController.showAll)
  .get('/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  usersController.showOne)
  .post('/', [upload.single('image'),
    authMid.sessionChecker,
    authMid.havePermissions,
    userMid.checkAllPost,
    usersController.create,
    fileMid.saveImage,
    fileMid.errorHandler,
  ], authMid.register)
  .put('/:id', [upload.single('image'),
    generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions,
    userMid.checkAllPut,
    usersController.update,
    userMid.deletePastProfileImage,
    fileMid.saveImage],
  fileMid.errorHandler)
  .patch('/:id', [upload.single('image'),
    generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions,
    userMid.checkAllPatch,
    usersController.patch,
    userMid.deletePastProfileImage,
    fileMid.saveImage],
  fileMid.errorHandler)
  .delete('/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  usersController.remove);

module.exports = route;
