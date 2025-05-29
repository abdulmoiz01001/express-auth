const express = require('express');
const upload = require('../middleware/uploadMiddleware'); // Ensure this path is correct
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }
    res.status(200).json({
      message: 'File uploaded successfully!',
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Multiple files upload (up to 10)
router.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded!' });
  }

  const uploadedFiles = req.files.map(file => ({
    filename: file.filename,
    path: file.path
  }));

  res.status(200).json({
    message: 'Files uploaded successfully!',
    files: uploadedFiles
  });
});

module.exports = router;