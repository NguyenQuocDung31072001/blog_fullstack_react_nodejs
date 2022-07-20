const jwt = require("jsonwebtoken");
require("dotenv");

const generateAccessToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "30s",
    }
  );
};
const generateRefreshToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "356d",
    }
  );
};

const verifyTokenService = async (token) => {
  try {
    const result=await jwt.verify(token, process.env.JWT_KEY)
    return result
  } catch (error) {
    return {
      error: true,
      name:error.name,
      msg: error.message,
    };
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyTokenService,
};
