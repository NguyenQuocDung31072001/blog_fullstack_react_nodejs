require("dotenv").config();
const { verifyTokenService } = require("../service/jwt_service");

// const token = req.headers["authorization"]
const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  const result = await verifyTokenService(token);
  if (!result.error) next();
  else {
    if (result.name === "TokenExpiredError") {
      return res.status(200).json({ code: 403, msg: result.msg });
    } else if (result.name === "JsonWebTokenError") {
      return res.status(200).json({ code: 500, msg: result.msg });
    } else if (result.name === "NotBeforeError") {
      return res.status(200).json({ code: 500, msg: result.msg });
    }
  }
};

module.exports = { verifyToken };
