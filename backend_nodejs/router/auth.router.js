const express = require("express");
const router = express.Router();
const authController=require('../controller/auth.controller')

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refesh_token", authController.refreshToken);


module.exports = router;
