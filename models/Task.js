const mongoose = require('mongoose');

/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the example (in uppercase).
 *         title:
 *           type: string
 *           description: The title of the example.
 *           required: true
 *         state:
 *           type: number
 *           description: The state of the example.
 *         deleted:
 *           type: boolean
 *           description: Indicates whether the example has been deleted.
 *           default: false
 *         due_time:
 *           type: string
 *           format: date-time
 *           description: The due time of the example.
 *           default: 'current datetime'
 *         remote:
 *           type: boolean
 *           description: Indicates whether the example is remote.
 *         x:
 *           type: number
 *           format: decimal
 *           description: The x coordinate of the example.
 *           default: 0
 *         y:
 *           type: number
 *           format: decimal
 *           description: The y coordinate of the example.
 *           default: 0
 *         detail:
 *           type: string
 *           description: The detail of the example.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of image URLs.
 *         budget:
 *           type: number
 *           description: The budget of the example.
 *         type:
 *           type: string
 *           description: The type of the example.
 *         tag:
 *           type: string
 *           description: The tag of the example.
 *         status:
 *           type: string
 *           description: The status of the example.
 *           default: 'open'
 *         final_price:
 *           type: number
 *           description: The final price of the example.
 *         create_user_id:
 *           type: string
 *           description: The ID of the user who created the example.
 *         create_datetime:
 *           type: string
 *           format: date-time
 *           description: The datetime when the example was created.
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of comments for the example.
 *         offers:
 *           type: array
 *           items:
 *             type: object
 *           description: An array of offers for the example.
 *           example:
 *             - offer_id: 'abc123'
 *               offer_amount: 50
 *             - offer_id: 'def456'
 *               offer_amount: 75
 */
const schema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   default: new mongoose.Types.ObjectId(),
  //   unique: true,
  // },
  title: {
    type: String,
    required: true,
  },
  due_time: {
    type: Date,
    default: Date.now,
  },
  remote: {
    type: Boolean,
  },
  address: {
    type: String,
  },
  // x: {
  //   type: mongoose.Decimal128,
  //   default: 0,
  // },
  // y: {
  //   type: mongoose.Decimal128,
  //   default: 0,
  // },
  detail: {
    type: String,
    default: '',
  },
  images: {
    type: [],
  },
  budget: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
  },
  tag: {
    type: String,
  },
  status: {
    type: String,
    default: 'open',
  },
  final_price: {
    type: Number,
    default: 0,
  },
  create_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  create_datetime: {
    // 数据库的名字是datetime
    type: Date,
    default: Date.now,
  },
  comments: {
    type: [String],
    default: '',
  },
  offers: {
    type: Array,
  },
  deleted: {
    default: false,
    type: Boolean,
  },
});

const TaskModel = mongoose.model('Task', schema);
module.exports = TaskModel;
