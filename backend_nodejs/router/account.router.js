const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller");
const { uploadCloud } = require("../configs/cloudinary.config");
const { verifyToken } = require("../middleware/verifyToken.middleware");

router.put(
  "/update_account/:id",
  verifyToken,
  uploadCloud.single("file"),
  accountController.updateAccount
);
router.put(
  "/change_password/:id",
  verifyToken,
  accountController.changePassword
);
router.delete("/delete/:id", verifyToken, accountController.deleteAccount);

module.exports = router;
