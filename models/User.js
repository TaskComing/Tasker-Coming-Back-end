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
    required: [true, 'Please provide password of at least six digits'],
    minlength: 6,
    maxlength: 25,
  },
  googleId: {
    type: String,
    allowNull: true,
  },
  picture: {
    type: String,
    allowNull: true,
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

userSchema.virtual('id').get(function () {
  if (this._id) {
    return this._id.toHexString();
  }
});

userSchema.set('toJSON', {
  virtuals: true,
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
