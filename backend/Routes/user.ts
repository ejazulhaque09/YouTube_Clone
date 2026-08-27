import express from 'express';
import * as userController from '../Controllers/user';

const router = express.Router();

router.post('/signup', userController.signup);   // route to register new user
router.post('/login', userController.login);     // route to login existing user
router.post('/logout', userController.logout);   // route to logout the logged user

export default router;
