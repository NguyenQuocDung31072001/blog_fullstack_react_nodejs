require("dotenv").config();
const Account = require("../model/account.model");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../service/jwt_service");

const register = async (req, res) => {
  //username, email, password
  try {
    const validAccount = await Account.findOne({ email: req.body.email });

    if (validAccount) {
      return res.json({ message: "email was singin", status: "email" });
    }
    const _hash = await bcrypt.hash(req.body.password, saltRounds);

    const account = new Account({
      username: req.body.username,
      email: req.body.email,
      password: _hash,
    });

    await account.save();

    return res.status(200).json({ code: 200, msg: "success" });
  } catch (error) {
    return res.status(200).json({ code: 404, msg: error.message });
  }
};

const login = async (req, res) => {
  //email,password
  try {
    const account = await Account.findOne({ email: req.body.email });
    if (!account) {
      return res.json({ component: "email", message: "email invalid!" });
    }
    const hash = await bcrypt.compare(req.body.password, account.password);
    if (!hash) {
      return res.json({ component: "password", message: "wrong password" });
    }
    const accessToken = generateAccessToken(account._id);
    //
    return res
      .status(200)
      .json({
        code: 200,
        msg: "success",
        data: { ...account._doc, accessToken },
      });
  } catch (error) {
    return res.status(200).json({code:404, msg: error.message });
  }
};
const logout = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const refreshToken = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
