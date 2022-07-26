const Comment = require("../model/comment.model");
const Account = require("../model/account.model");

// router.get("/all_comment", commentController.getAllComment);
// router.post("/create_new_comment", commentController.createNewComment);
// router.put("/update_comment/:id_comment", commentController.updateComment);
// router.delete("/delete_comment/:id_comment", commentController.deleteComment);

const getAllComment = async (req, res) => {
  //req.params : id_story
  try {
    const allComment = await Comment.find({
      id_story: req.params.id_story,
    }).populate("id_account");
    // console.log(`allComment ::: ${allComment}`);
    return res
      .status(200)
      .json({ code: 200, msg: "get comment success", data: allComment });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
const createNewComment = async (req, res) => {
  //req.params : id_story, id_account
  //req.body: comment

  try {
    const newComment=new Comment({
        id_story:req.params.id_story,
        id_account:req.params.id_account,
        comment:req.body.comment
    })
    await newComment.save()
    return res
      .status(200)
      .json({ code: 200, msg: "create new comment success", data: newComment });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
const updateComment = async (req, res) => {
  //req.params : id_comment
  //req.body: comment

  try {
    const commentUpdate=await Comment.findById(req.params.id_comment)
    commentUpdate.comment=req.body.comment
    await commentUpdate.save()
    return res
      .status(200)
      .json({ code: 200, msg: "update comment success", data: commentUpdate });
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
const deleteComment = async (req, res) => {
  //req.params : id_comment
  
  try {
    const commentDelete=await Comment.findById(req.params.id_comment)
    await commentDelete.remove()
    return res
      .status(200)
      .json({ code: 200, msg: "delete comment success"});
  } catch (error) {
    return res.status(200).json({ code: 500, msg: error.message });
  }
};
module.exports = {
  getAllComment,
  createNewComment,
  updateComment,
  deleteComment,
};
