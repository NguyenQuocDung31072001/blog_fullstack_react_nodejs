const express = require("express");
const router = express.Router();
const storyController = require("../controller/story.controller");
const { uploadCloud } = require("../configs/cloudinary.config");
const {verifyToken} =require('../middleware/verifyToken.middleware')

router.get("/all_story", storyController.getAllStory);
router.get("/story_account/:id", storyController.getStoryAccount);
router.get("/one_story/:id", storyController.getOneStory);

router.post("/search_by_name", storyController.searchStoryByName);

router.post(
  "/add_story/:id_account",
  verifyToken,
  uploadCloud.single("file"),
  storyController.addNewStory
);
router.put(
  "/update_story/:id",
  verifyToken,
  uploadCloud.single("file"),
  storyController.updateStory
);
router.delete("/delete_story/:id/:id_account",verifyToken, storyController.deleteStory);

module.exports = router;
