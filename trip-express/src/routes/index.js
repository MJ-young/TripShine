const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
// const taskRoutes = require("./taskRoutes");

router.use("/user", userRoutes);
// router.use("/task", taskRoutes);

module.exports = router;
