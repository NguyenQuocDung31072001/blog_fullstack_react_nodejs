const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema({
  // _id: Schema.Types.ObjectId,
  image: String,
  prevImage: String,
  title: String,
  description: String,
  detailDescription: String,
  author:Schema.Types.ObjectId
},{
    timestamps:true
});

const Story = mongoose.model("Story", storySchema);

module.exports= Story
