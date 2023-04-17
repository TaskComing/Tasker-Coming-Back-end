const { uploadFile } = require('../s3');

const uploadFileToS3 = async (req, res) => {
  const { files } = req;

  try {
    const uploadedFiles = [];
    files.forEach(async (file) => {
      const result = await uploadFile(file);
      uploadedFiles.push(result.Key);
    });
    res.status(201).json({ uploadedFiles });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  uploadFileToS3,
};
