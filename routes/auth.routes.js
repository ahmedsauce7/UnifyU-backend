const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

// POST /signup 
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters, one lowercase letter, one uppercase letter, and contain at least one number.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      const user = { email, name, _id };
      res.status(201).json({ user: user });
    })
    .catch((error) => next(error)); 
});

// POST /login 
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        const { _id, email, name } = foundUser;
        const orange = { _id, email, name };
        const authToken = jwt.sign(orange, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Authenticate failed" });
      }
    })
    .catch((error) => next(error)); 
});

// GET /verify 
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.orange`, req.orange);
  res.status(200).json(req.orange);
});

//Owner details
router.get('/:ownerId', (req, res, next) => {
  const { ownerId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(ownerId)
    .then(user => { res.json(user) })
    .catch(error => {
      console.log("error getting details of a user", err);
      res.status(500).json({
        message: "error getting details of a user",
        error: error
      });
    })
});

module.exports = router;
