const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = ({
  _id: Schema.Types.ObjectId,
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

export default Story
