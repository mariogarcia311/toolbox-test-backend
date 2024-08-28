const { Router } = require('express');
const { getFiles, getFilesList } = require('../controllers/filesController.js');
const verifyToken = require('../middlewares/verifyToken.js');

const filesRoutes = Router();
filesRoutes
  .get('/data', verifyToken, getFiles)
  .get('/list', verifyToken, getFilesList);

module.exports = filesRoutes;
