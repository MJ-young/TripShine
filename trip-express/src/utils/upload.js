// OSS
require("dotenv").config();
const multer = require("multer");
const MAO = require("multer-aliyun-oss");

const upload = multer({
  storage: MAO({
    config: {
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      bucket: process.env.BUCKET,
    },
    destination: "public/images",
  }),
});

module.exports = upload;
