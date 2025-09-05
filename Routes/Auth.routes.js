import express from 'express'
import {
  signUp,
  login,
  logout,
  editUserProfile,
  editUserPassword,
} from "../Controller/AuthController.js";
import { verifyToken } from '../Middlewares/Token.js';

const router = express.Router();

router.post("/sign-up",signUp)

router.post("/login", login);

router.post("/logout",logout)

router.patch("/user/editProfile/:userId", editUserProfile);

router.patch('/user/editPassword/:userId', editUserPassword );


export default router;