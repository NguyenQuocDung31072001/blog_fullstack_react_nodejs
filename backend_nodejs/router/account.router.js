const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller");
const { uploadCloud } = require("../configs/cloudinary.config");

router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.post("/logout", accountController.logout);

router.post(
  "/upload_avatar/:id",
  uploadCloud.single("file"),
  accountController.updateAvatar
);
router.put("/update/:id", accountController.updateAccount);
router.delete('/delete/:id',accountController.deleteAccount)

module.exports = router;
