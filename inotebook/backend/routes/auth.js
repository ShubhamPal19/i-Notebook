const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const  fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "dosomework";

// ROUTE 1 : - create a user using post "/api/auth" doesnot require auth
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whetheer the user with same email exists already

    try {
      let is_user = await User.findOne({ email: req.body.email });

      if (is_user) {
        console.log(is_user);
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      let user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // .then(user => res.json(user))
      // .catch(err=>console.log(err));
      // res.json({errors:'Please enter a unique value for email', message: err.message});

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
    }
  }
);

// ROUTE 2  :-authenticate the user details entered by user

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),

    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //email and password of the req.body
    const { email, password } = req.body;

    try {
      // check for the email in our database User Schema
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ errors: "Invalid Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(404).json({ errors: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

// ROUTE 3 :-  Get Loggedin User Details: post "api/ auth/getuser" . login required

router.post(
  "/getuser",

  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);
module.exports = router;
