const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('../routes/users');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"]
  },
  email: {
      type: String,
      required: [true, "Please add your email"], 
      unique: true
  },
  password: {
      type: String,
      required: [true, "Please enter a password"],
      unique: true
  },
  cart: {
    type: Array,
    required: false,
    default: []
  },
  tokens: [
    {
      token:{
        type: String, 
        required: true
      }
    }
  ]
});

//method to hash password before saving user model
userSchema.pre("save", async function(next){
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
})

//method to generate auth token for user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email},
    "secret");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

//getting the user's cart
// router.get("/", authToken, (req, res) => {
//   return res.send(req.user.cart)
// });

//method to search for user by email and password
userSchema.statics.findByCredentials = async (email ,password) => {
  const user = await User.findOne ({ email });
  if (!user) {
    throw new Error ({ error: "Invalid login details "});
  };
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error ({ error: "Invalid login details" });
  }
  return user;
}

const User = mongoose.model("User", userSchema);
module.exports = User

