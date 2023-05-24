const router = require("express").Router();
const User = require("../models/User.model")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/profile", (req,res,next) => {
  res.json("profile good in here")
})

module.exports = router;
