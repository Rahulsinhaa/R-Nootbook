
const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');
const fetchuser=require('../Middleware/fetchuser');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'rahulisaggod$boy';
// create a user using post  "/api/auth/createuser" dosent req authh
router.post('/createuser', [body('email', 'enter a vlid email').isEmail(),
// password must be at least 5 chars long
body('name', 'enter avalid name ').isLength({ min: 3 }),
body('password', 'correct password').isLength({ min: 5 }),],
  async (req, res) => {
    //if there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      //if there ia na error than return bad request 
      let user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (user) {
        return res.status(400).json({ error: "email already exists" })
      }
      //incription of password using bcrypt js
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      let success=false;
      const data = {
        user: {
          success,
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
     success=true;
      res.json({ success, authtoken: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server Error");
    }
  })


// Route 2 authenicate a user using post method:------------------------------------------

router.post('/login', [
  body('email', 'enter a vlid email').isEmail(),
  body('password', 'cannot be blannk').exists(),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
     let success=false;
    try {

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "user not exists"
        });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
         success=false;
        return res.status(400).json({
           success,
          error: "user not exists"
        });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken: authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("some erroe occured");
    }
  })




// Route 3 get user details  using post method login required:------------------------------------------
router.post('/getuser',fetchuser,async (req, res) => {

    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }
    catch (error) {
      console.log(error);
      res.status(500).send("some erroe occured");
    }
  })
module.exports = router