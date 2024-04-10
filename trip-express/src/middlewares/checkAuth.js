const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secret");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      data: {
        status: 401,
        message: "Unauthorized - No token provided",
      },
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          data: {
            status: 401,
            message: "Token has expired",
          },
        });
      } else {
        return res.status(401).json({
          data: {
            status: 401,
            message: "Unauthorized",
          },
        });
      }
    }

    req.userId = decoded.userId;
    req.userRole = decoded.userRole;
    next();
  });
};

module.exports = checkAuth;
