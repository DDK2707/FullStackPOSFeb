const User = require("../models/user")

exports.registerNewUser = async (req, res) => {
    try {
        console.log(isUser);
        if (isUser.length >= 1) {
            return res.status(409).json({
                message: "Email already in use"
            });
        }
        const user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        let data = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({ data, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {};

exports.getUserDetails = async (req, res) => {};