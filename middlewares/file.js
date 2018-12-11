const fs = require('fs');
const pathAdmin = require('path');

const saveImage = (req, res, next) => {
  fs.rename(req.file.path, req.body.image, (err) => {
    if (err) {
      next({
        status: 406,
        message: 'Error creating image',
      });
    }
  });

  res.status(201).send({
    status: 201,
    message: 'Image created',
  });
};

const removeImage = (path) => {
  if (path === undefined) {
    return true;
  }
  try {
    fs.unlinkSync(path);
  } catch (err) {
    return true;
  }
  return false;
};

const deleteImage = (req, res, next) => {
  if (!removeImage(res.locals.path)) {
    next({
      status: 406,
      message: 'Error deleting image',
    });
  }
  res.send({
    status: 200,
    message: 'Image deleted',
  });
};

const searchImage = (path) => {
  try {
    return fs.readFileSync(path);
  } catch (err) {
    return undefined;
  }
};

const getImage = (req, res, next) => {
  const image = searchImage(req.query.image);
  if (image === undefined) {
    next({
      status: 406,
      message: 'Image not found',
    });
  } else {
    const type = pathAdmin.extname(req.query.image);
    res.writeHead(200, { 'Content-Type': `image/${type}` });
    res.end(image, 'binary');
  }
};

const errorHandler = (err, req, res, next) => {
  if (req.file === undefined) {
    next(err);
  } else if (removeImage(req.file.path)) {
    removeImage(req.body.image);
    next(err);
  } else {
    next(err);
  }
};

module.exports = {
  saveImage,
  deleteImage,
  getImage,
  removeImage,
  searchImage,
  errorHandler,
};
