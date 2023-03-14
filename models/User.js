const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide firstName'],
    minlength: 1,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide lastName'],
    minlength: 1,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    maxlength: 25,
  },
  // confirmPassword: {
  //   type: String,
  //   required: [true, 'Please confirm your password!'],
  //   // this runs only save() or create()
  //   validate: {
  //     validator(el) {
  //       return el === this.password;
  //     },
  //     message: "Passwords don't match",
  //   },
  // },
  // profilePicture: { type: String, required: false },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
