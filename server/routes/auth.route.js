import express from 'express';
import  {register, login, google, logout, forgotPassword, resetPassword} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', google);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);
router.get('/logout', logout);

export default router;