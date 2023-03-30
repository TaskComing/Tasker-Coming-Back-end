const express = require('express');
const fs = require('fs');
const util = require('util');

const unlinkFile = util.promisify(fs.unlink);
const { uploadFile } = require('../s3');

const uploadFileToS3 = async (req, res) => {
  const { file } = req;
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  res.send({ imagePath: `/images/${result.Key}` });
};

module.exports = {
  uploadFileToS3,
};
