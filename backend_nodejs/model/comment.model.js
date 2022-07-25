const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    id_story:Schema.Types.ObjectId,
    id_account: {type: Schema.Types.ObjectId,ref:'Account'},
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
