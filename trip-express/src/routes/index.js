const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const tripRoutes = require("./tripRoutes");

router.use("/user", userRoutes);
router.use("/trip", tripRoutes);

module.exports = router;
