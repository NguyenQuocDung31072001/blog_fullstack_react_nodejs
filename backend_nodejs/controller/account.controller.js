require("dotenv").config();
const Account = require("../model/account.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { deleteImage } = require("../configs/cloudinary.config");
const register = async (req, res) => {
  //username, email, password
  try {
    const validAccount = await Account.findOne({ email: req.body.email });

    if (validAccount) {
      return res.json({ message: "email was singin",status:'email'});
    }
    const _hash = await bcrypt.hash(req.body.password, saltRounds);

    const account = new Account({
      username: req.body.username,
      email: req.body.email,
      password: _hash,
    });

    await account.save();

    return res.json({ message: "register success",status:'ok'});
  } catch (error) {
    return res.json({ message: error.message , status:'error'});
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
      return res.json({component:"email", message: "email invalid!" });
    }
    const hash = await bcrypt.compare(req.body.password, account.password);
    if (!hash) {
      return res.json({component:"password", message: "wrong password" });
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
  // params id, body :file image, username, email
  console.log(" req body account ",req.body.username, req.body.email)
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "inValid Account" });
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

    return res.status(200).json(account);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
const changePassword = async (req, res) => {
  //params id, body old_password, new_password
  console.log(" req body account ",req.body.old_password, req.body.new_password)
  try {
    const account = await Account.findById(req.params.id);
    const hash = await bcrypt.compare(req.body.old_password, account.password);
    if (!hash) {
      return res.json({ message: "password incorrect!", status: 'old_password' });
    }
    const hashNewPassword = await bcrypt.hash(req.body.new_password, saltRounds);
    account.password = hashNewPassword;
    await account.save()
    return res.json({ message: "change password success", status: 'ok' });
  } catch (error) {
    return res.json({ message: error.message, status: 'error' });
  }
};

const deleteAccount = async (req, res) => {
  //params id
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "delete success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateAccount,
  changePassword,
  deleteAccount,
};
