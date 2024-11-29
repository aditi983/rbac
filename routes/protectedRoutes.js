const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/admin", protect, authorize("Admin"), (req, res) => {
    res.status(200).send("Welcome Admin! You have full access.");
});

router.get("/user", protect, authorize("User", "Admin"), (req, res) => {
    res.status(200).send("Welcome User! You have limited access.");
});

router.get("/moderator", protect, authorize("Moderator", "Admin"), (req, res) => {
    res.status(200).send("Welcome Moderator! You have moderate access.");
});

module.exports = router;
