const express = require("express");
const { login, signUp, dashboard } = require("../controllers/main");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from jwt !");
});

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/dashboard").get(isAuth, dashboard);

module.exports = router;
