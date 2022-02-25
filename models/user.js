const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"]
  },
  email: {
      type: String,
      required: [true, "Please add your email"]
  },
  password: {
      type: String,
      required: [true, "Please enter a password"]
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
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.name},
    "secret");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

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

