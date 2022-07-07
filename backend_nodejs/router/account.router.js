const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller");
const { uploadCloud } = require("../configs/cloudinary.config");

router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.post("/logout", accountController.logout);

router.put(
  "/update_account/:id",
  uploadCloud.single("file"),
  accountController.updateAccount
);
router.post('/check_password/:id',accountController.checkPassword)
// router.post('/change_password/:id',accountController.changePassword)
router.delete('/delete/:id',accountController.deleteAccount)

module.exports = router;
