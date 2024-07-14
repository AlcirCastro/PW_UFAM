import { Router, Request, Response } from 'express';
import { loremIpsum } from 'lorem-ipsum';
import mainController from '../controllers/main';

const router = Router();
// Main Controller
router.get('/', mainController.index);
router.get('/lorem/:num', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
//router.get("", mainController.erro);

export default router;