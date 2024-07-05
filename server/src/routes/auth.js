const express = require("express");
const {
    register,
    login,
    getProfile,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);

module.exports = router;
