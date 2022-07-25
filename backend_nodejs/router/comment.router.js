const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment.controller");
const { verifyToken } = require("../middleware/verifyToken.middleware");

router.get(
  "/all_comment/:id_story",
  commentController.getAllComment
);
router.post(
  "/create_new_comment/:id_story/:id_account",
  verifyToken,
  commentController.createNewComment
);
router.put(
  "/update_comment/:id_comment",
  verifyToken,
  commentController.updateComment
);
router.delete(
  "/delete_comment/:id_comment",
  verifyToken,
  commentController.deleteComment
);

module.exports = router;
