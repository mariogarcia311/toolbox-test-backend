const FilesService = require('../services/filesService.js');
const filesService = new FilesService();

const getFiles = async (req, res) => {
  try {
    const files = await filesService.getFiles();
    res.json(files);
  } catch (error) {
    res.status(error.code ?? 500).json({
      msg: 'connection error',
      error: error.message,
    });
  }
};

const getFilesList = async (req, res) => {
  const files = await filesService.getFilesList();
  try {
    res.json({
      files,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      msg: 'connection error',
      error: error.message,
    });
  }
};

module.exports = {
  getFiles,
  getFilesList,
};
