require("dotenv").config();
const Account = require("../model/account.model");
const cloudinary = require("../configs/cloudinary.config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const register = async (req, res) => {
  //username, email, password
  try {
    const validAccount = await Account.findOne({ email: req.body.email });

    if (validAccount) {
      return res.status(404).json({ message: "email exited!" });
    }
    const _hash = await bcrypt.hash(req.body.password, saltRounds);

    const account = new Account({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: _hash,
    });

    await account.save();

    return res.status(200).json({ message: "register success", data: account });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const generateAccessToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  );
};

const login = async (req, res) => {
  //email,password
  try {
    const account = await Account.findOne({ email: req.body.email });
    if (!account) {
      return res.status(400).json({ message: "email invalid!" });
    }
    const hash = await bcrypt.compare(req.body.password, account.password);
    if (!hash) {
      return res.status(400).json({ message: "wrong password" });
    }
    const accessToken = generateAccessToken(account._id);
    return res.status(200).json({
      message: "login success",
      data: { ...account._doc, accessToken },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  // params id, body : username, email, password
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "inValid Account" });
    }
    if (req.file && account.prevAvatar) {
      console.log("delete prev avatar")
      cloudinary.uploader.destroy(account.prevAvatar, function (result) {
        console.log(result);
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    account.username = req.body.username;
    account.email = req.body.email;
    account.password = hashPassword;
    await account.save();
    return res.status(200).json({message:"update success",data:account})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return;
    }
    const account=await Account.findById(req.params.id)
    account.avatar=req.file.path
    await account.save()

    return res.status(200).json({ avatar_url: req.file.path });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteAccount = async (req, res) => {
  //params id
  try {
    const account=await Account.findByIdAndDelete(req.params.id)
    return res.status(200).json({message:"delete success"})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateAccount,
  updateAvatar,
  deleteAccount,
};
