const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String},
    prevAvatar: { type: String},
    stories: [{ type: mongoose.Types.ObjectId, ref: "Story" }],
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
