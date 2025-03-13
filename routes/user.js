const express = require("express");
const { verify } = require("../auth"); 
const userController = require("../controllers/user");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", verify, userController.getUserDetails);


module.exports = router;