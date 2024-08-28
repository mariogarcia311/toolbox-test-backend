import FilesService from '../services/filesService.js';

const filesService = new FilesService();

export const getFiles = async (req, res) => {
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

export const setFiles = async (req, res) => {
  try {
    res.json({
      msg: 'files',
      files: [],
    });
  } catch (error) {
    res.status(error.code ?? 500).json({
      msg: 'connection error',
      error: error.message,
    });
  }
};
