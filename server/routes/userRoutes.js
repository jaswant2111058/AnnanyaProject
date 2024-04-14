const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModal");

//user registration

router.post("/register", async (req, res) => {
  try {
    // if (!req.body.email || !req.body.password || !req.body.role) {
    //   res.status(400).send({
    //     success: false,
    //     message: "Invalid Parameters",
    //   });
    // }
    // console.log(req.body);
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.send({
        success: false,
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const NewUser = new User(req.body);
    await NewUser.save();
    res.status(200).send({
      success: true,
      message: "User created successfully",
      createdUser: NewUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

//get current user

router.post("/getuserbyemail", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user)
      res.send({
        success: true,
        message: "User Fetched successfully",
        data: user,
      });
    else {
      res.send({
        success: false,
        message: "Invalid User",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

//user login'

router.post("/login", async (req, res) => {
  try {
    //check if user exist
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      throw new Error("User not found");
    }

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) throw new Error("Invalid Password");

    //create and assign token

    const token = jwt.sign({ email: user.email }, "helloworld", {});

    user.token.push(token);
    await user.save();

    res.send({
      success: true,
      message: "User logged in successfully",
      createdUser: user,
      token: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

//Verify Token

router.post("/verifytoken", async (req, res) => {
  try {
    const user = jwt.verify(req.body.token, "helloworld");
    const result = await User.find({ email: user.email });
    // console.log(`User found`, result);
    if (result)
      res.send({
        success: true,
        message: "Token Verified successfully",
        data: result,
      });
    else {
      res.send({
        success: false,
        message: "Invalid Token",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

//Add DOctors
router.post("/registerdocs", async (req, res) => {
  try {
    // if (!req.body.email || !req.body.password || !req.body.role) {
    //   res.status(400).send({
    //     success: false,
    //     message: "Invalid Parameters",
    //   });
    // }
    // console.log(req.body);
    const user = await Doctor.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.send({
        success: false,
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const NewUser = new Doctor(req.body);
    await NewUser.save();
    res.status(200).send({
      success: true,
      message: "User created successfully",
      createdUser: NewUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

//Get All doctors

router.get("/getalldocters", async (req, res) => {
  try {
    const doctors = await Doctor.find();

    return res.send({
      success: true,
      doctors: doctors,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

module.exports = router;
