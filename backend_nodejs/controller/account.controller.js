require("dotenv").config();
const Account = require("../model/account.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { deleteImage } = require("../configs/cloudinary.config");

const updateAccount = async (req, res) => {
  // params id, body :file image, username, email
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(200).json({code:404, msg: "inValid Account" });
    }
    if (req.file) {
      if (account.prevAvatar) {
        deleteImage(account.prevAvatar);
      }
      account.avatar = req.file.path;
      account.prevAvatar = req.file.filename;
    }
    account.username = req.body.username;
    account.email = req.body.email;
    await account.save();

    return res.status(200).json({code:200,data:account});
  } catch (error) {
    return res.status(200).json({code:500, msg: error.message });
  }
};
const changePassword = async (req, res) => {
  //params id, body old_password, new_password
  try {
    const account = await Account.findById(req.params.id);
    const hash = await bcrypt.compare(req.body.old_password, account.password);
    if (!hash) {
      return res.status(200).json({code:404, msg: "password incorrect!"});
    }
    const hashNewPassword = await bcrypt.hash(req.body.new_password, saltRounds);
    account.password = hashNewPassword;
    await account.save()
    return res.status(200).json({code:200, msg: "change password success"});
  } catch (error) {
    return res.status(200).json({code:500, msg: error.message});
  }
};

const deleteAccount = async (req, res) => {
  //params id
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    return res.status(200).json({code:200, msg: "delete success" });
  } catch (error) {
    return res.status(200).json({code:500, msg: error.message });
  }
};

module.exports = {
  updateAccount,
  changePassword,
  deleteAccount,
};
