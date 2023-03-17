const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new Schema({
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
      ref: 'Task',
    },
  ],
  notification_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notification',
    },
  ],
  // notification: [
  //   {
  //     type: String,
  //     ref: 'Notification',
  //   },
  // ],
  comments_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  offers_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
  // profilePicture: { type: String, required: false },
});

userSchema.pre('save', async () => {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = () =>
  jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

userSchema.methods.comparePassword = async (password) => {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const UserModel = model('User', userSchema);

module.exports = UserModel;
