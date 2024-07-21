import { Router, Request, Response } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';
import main from '../controllers/main';
import authController from '../controllers/auth';
import { checkAuth } from '../middlewares/checkAuth';
const router = Router();

//Auth Controller
router.get("/auth/signup",authController.signup);
router.post("/auth/signup",authController.signup);
router.get("/auth/login",authController.login);
router.post("/auth/login",authController.login);
router.get("/auth/logout",authController.logout);

//Major Controller
router.get("/major", majorController.index);
router.get("/major/create", checkAuth, majorController.create); 
router.post("/major/create", majorController.create);
router.get("/major/read/:id", majorController.read);
router.get("/major/update", majorController.update);
router.post("/major/update", majorController.update);
router.post("/major/remove", majorController.remove);     

// Main Controller
router.get("/test-cookie",mainController.testCookie);
router.get('/', mainController.index);
router.get('/lorem/:num', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

export default router;