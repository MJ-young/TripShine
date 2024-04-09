const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secret");

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      data: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        data: {
          code: 401,
          message: "Unauthorized",
        },
      });
    }

    // 根据decoded中的信息来识别和验证用户身份
    req.userId = decoded.userId;
    req.userRole = decoded.userRole;
    next();
  });
};

module.exports = checkAuth;
