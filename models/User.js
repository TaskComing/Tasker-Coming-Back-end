const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
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
  salt: {
    type: String,
  },
  firstName: {
    type: String,
    default: 'Please enter your first name',
  },
  lastName: {
    type: String,
    default: 'Please enter your last name',
  },
  mobile: {
    type: String,
    length: 11,
  },
  openid: {
    type: String,
  },
  head_img_url: {
    type: String,
  },
  following_task_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'task',
    },
  ],
  notification_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'notification',
    },
  ],
  // notification: [
  //   {
  //     type: String,
  //     ref: 'notification',
  //   },
  // ],
  deleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const UserModel = model('User', userSchema);

module.exports = UserModel;
