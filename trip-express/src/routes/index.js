const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const tripRoutes = require("./tripRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/user", userRoutes);
router.use("/trip", tripRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
