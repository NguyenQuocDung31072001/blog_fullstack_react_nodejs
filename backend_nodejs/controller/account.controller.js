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
      return res.status(404).json({ message: "email exited!" });
    }
    const _hash = await bcrypt.hash(req.body.password, saltRounds);

    const account = new Account({
      // _id: new mongoose.Types.ObjectId(),
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
  console.log(req.body)
  // params id, body : username, email, password
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
    if(req.body.password){
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      account.password = hashPassword;
    }
    account.username = req.body.username;
    account.email = req.body.email;
    await account.save();
    console.log('req.body.password ',req.body.password)
    return res.status(200).json(account);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
const checkPassword = async (req, res) => {
  console.log("req body password is ",req.body.password)
  //params id, body password
  try {
    const account = await Account.findById(req.params.id);
    const hash = await bcrypt.compare(req.body.password, account.password);
    if (!hash) {
      return res.json({ message: "password incorrect!", status: false });
    }
    return res.json({ message: "password correct", status: true });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
// const changePassword = async (req, res) => {
//   //params id, body new_password
//   try {
//     const account = await Account.findById(req.params.id);
//     const _hash = await bcrypt.hash(req.body.new_password, saltRounds);
//     account.password = _hash;
//     await account.save();
//     return res.json(account);
//   } catch (error) {
//     return res.json({ message: error.message });
//   }
// };

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
  checkPassword,
  // changePassword,
  // updateAvatar,
  deleteAccount,
};
