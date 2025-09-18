const express = require("express");
const router = express.Router();
const { login, register, me } = require("../controller/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");



router.post("/register", register);           
router.post("/login", login);                 
router.get("/me", authenticateToken, me);     

module.exports = router;
