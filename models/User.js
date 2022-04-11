const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Plese provide username"],
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Plese provide eamil"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Plese provide password"],
    minlength: 6
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  verificationToken: String,
  ifVerified: {
    type: Boolean,
    defualt: false
  },
  verified: Date,
  passwordToken: {
    type: String
  },
  passwordTokenExpirationDate: {
    type: Date
  }
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (conditatePassword) {
  const isMatch = await bcrypt.compare(conditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
