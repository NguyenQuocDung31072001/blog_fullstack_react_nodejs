const Story = require("../model/story.model");
const Account =require('../model/account.model')
const {deleteImage}=require('../configs/cloudinary.config')

const getAllStory = async (req, res) => {
  try {
    const allStory = await Story.find();
    return res.json({ allStory: allStory });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
const getStoryAccount = async (req, res) => {
  // params id_account
  console.log("req params id : ", req.params.id_account);
  try {
    const account=await Account.findById(req.params.id_account).populate('stories')

    return res.json({ storyAccount: account});
  } catch (error) {
    return res.json({ error: error.message });
  }
};
const getOneStory = async (req, res) => {
  // params id
  try {
    const story=await Story.findById(req.params.id)
    // console.log("story is ",story)
    return res.status(200).json(story);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const addNewStory = async (req, res) => {
  //params id_account,  body : image, title, description, detailDescription

  console.log("req params ", req.params)
  console.log("req body ", req.body)
  console.log("req.body.file ",req.body.file)
  console.log("req.file.filename ",req.file.filename)
  console.log("req.file.path ",req.file.path)
  try {
    const newStory = new Story({
      // _id: new mongoose.Types.ObjectId(),
      image: req.file.path,
      prevImage: req.file.path,
      title: req.body.title,
      description: req.body.description,
      detailDescription: req.body.detailDescription,
    });
    console.log("new story : ",newStory)
    const saveStory= await newStory.save();

    const account = await Account.findById(req.params.id_account);
    account.stories.push(saveStory.id);
    await account.save()
    console.log("account is ", account)
    return res.status(200).json({ newStory: saveStory, account: account });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message });
  }
};
const updateStory = async (req, res) => {
  //params id,  body : image, title, description, detailDescription
  try {
    const story=await Story.findById(req.params.id)
    if(req.file){
      if(story.prevImage){
        deleteImage(story.prevImage)
      }
      console.log("req.file update is ",req.file)
      story.image=req.file.path
      story.prevImage=req.file.filename
      story.title=req.body.title
      story.description=req.body.description
      story.detailDescription=req.body.detailDescription  
      const _story= await story.save()
      return res.json({storyUpdate: _story})
    }
    story.title=req.body.title
    story.description=req.body.description
    story.detailDescription=req.body.detailDescription  
    const _story= await story.save()
    return res.json({storyUpdate: _story})

  } catch (error) {
    return res.json({ error: error.message });
  }
};
const deleteStory = async (req, res) => {
  //params id
  try {
      const story=await Story.findByIdAndDelete(req.params.id)
      console.log("story is ", story)
      const account=await Account.findById(req.params.id_account)
      account.stories=account.stories.filter((id)=>id!=story.id)
      await account.save()
      return res.status(200).json({message:"delete ok"})
  } catch (error) {
    return res.json({ error: error.message });
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
