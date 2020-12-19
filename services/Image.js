const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const config = require('../config')

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: config.s3SecretAccesKey,
  accessKeyId: config.s3AccesKeyId,
  Bucket: config.s3Bucket,
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Solo aceptamos JPEG, JPG y PNG!'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: config.s3Bucket,
    metadata(req, file, cb) {
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key(req, file, cb) {
      cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

module.exports = { upload };