const Story = require("../model/story.model");
const Account = require("../model/account.model");
const { deleteImage } = require("../configs/cloudinary.config");

const getAllStory = async (req, res) => {
  try {
    const allStory = await Story.find();
    return res.status(200).json({ code: 200, data: allStory });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
const getStoryAccount = async (req, res) => {
  // params id
  try {
    const story = await Story.findById(req.params.id);
    const account = await Account.findById(story.author).populate("stories");
    return res.status(200).json({ code: 200, data: account });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
const getOneStory = async (req, res) => {
  // params id, id_account
  try {
    const story = await Story.findById(req.params.id).populate("author");

    // console.log("story is ", story);
    return res.status(200).json({ code: 200, data: story });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};

const addNewStory = async (req, res) => {
  //params id_account,  body : image, title, description, detailDescription

  // console.log("req params ", req.params);
  // console.log("req body ", req.body);
  // console.log("req.body.file ", req.body.file);
  // console.log("req.file.filename ", req.file.filename);
  // console.log("req.file.path ", req.file.path);
  try {
    const newStory = new Story({
      image: req.file.path,
      prevImage: req.file.path,
      title: req.body.title,
      description: req.body.description,
      detailDescription: req.body.detailDescription,
      author: req.params.id_account,
    });
    // console.log("new story : ",newStory)
    const saveStory = await newStory.save();

    const account = await Account.findById(req.params.id_account);
    account.stories.push(saveStory.id);
    await account.save();
    return res.status(200).json({ code: 200, data: saveStory });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
const updateStory = async (req, res) => {
  //params id,  body : image, title, description, detailDescription
  try {
    const story = await Story.findById(req.params.id);
    if (req.file) {
      if (story.prevImage) {
        deleteImage(story.prevImage);
      }
      story.image = req.file.path;
      story.prevImage = req.file.filename;
      story.title = req.body.title;
      story.description = req.body.description;
      story.detailDescription = req.body.detailDescription;
      const _story = await story.save();
      return res.status(200).json({ code: 200, data: _story });
    }
    story.title = req.body.title;
    story.description = req.body.description;
    story.detailDescription = req.body.detailDescription;
    const _story = await story.save();

    return res.status(200).json({ code: 200, data: _story });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
const deleteStory = async (req, res) => {
  //params id
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    const account = await Account.findById(req.params.id_account);
    account.stories = account.stories.filter((id) => id != story.id);
    await account.save();
    return res
      .status(200)
      .json({ code: 200, data: { msg: "delete success!" } });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};

module.exports = {
  getAllStory,
  getStoryAccount,
  getOneStory,
  addNewStory,
  updateStory,
  deleteStory,
};
