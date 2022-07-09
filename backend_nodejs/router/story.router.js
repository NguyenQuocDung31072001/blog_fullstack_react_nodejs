const express = require("express");
const router = express.Router();
const storyController = require("../controller/story.controller");
const { uploadCloud } = require("../configs/cloudinary.config");

router.get("/all_story", storyController.getAllStory);
router.get("/story_account/:id", storyController.getStoryAccount);
router.get("/one_story/:id", storyController.getOneStory);

router.post(
  "/add_story/:id_account",
  uploadCloud.single("file"),
  storyController.addNewStory
);
router.put(
  "/update_story/:id",
  uploadCloud.single("file"),
  storyController.updateStory
);
router.delete("/delete_story/:id/:id_account", storyController.deleteStory);

module.exports = router;
