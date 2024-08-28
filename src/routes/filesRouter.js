import { Router } from 'express';
import { getFiles } from '../controllers/filesController.js';
import verifyToken from '../middlewares/verifyToken.js';

const filesRoutes = Router();

filesRoutes.get('/data', verifyToken, getFiles);

export default filesRoutes;
