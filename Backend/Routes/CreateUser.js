const express = require("express");
const router = express.Router();
const User = require("../modles/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisRohitKumarSingh3010";
router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(500).json({ error: error.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      }),
        res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (true) {
        if (!userData) {
          return res
            .status(400)
            .json({ errors: "Try Logging With Correct Credentials" });
        }
        const pwdCompare = await bcrypt.compare(
          req.body.password,
          userData.password
        );
        if (!pwdCompare) {
          return res
            .status(400)
            .json({ errors: "Try Logging With Correct Credentials3234" });
        }
        const data = {
          user: {
            id: userData.id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
