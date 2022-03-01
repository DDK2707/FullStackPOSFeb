require('dotenv').config();

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const User = require("../models/userModel")

exports.registerNewUser = async (req, res) => {
    const body = req.body;
    if ((!body.email && body.password)) {
        return res.status(400).send({ error: "Data not entered correctly"})
    }
    const user = new User(body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
};

exports.loginUser = async (req, res) => {
     const email = req.email;
    const user = await User.findOne({ email });
    console.log(user)

    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    // res.json({ accessToken: accessToken })
};

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};