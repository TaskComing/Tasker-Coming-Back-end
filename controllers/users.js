const UserModel = require('../models/User');
// const CommentModel = require('../models/comment');
// const { populate } = require('../models/comment');

// const addUser = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   const user = new UserModel(firstName, lastName, email, password);
//   await user.save();
//   res.status(201).json(user);
// };

const getAllUsers = async (req, res) => {
  const users = await UserModel.find().exec();
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id).populate('comments_id').exec();
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }
  res.json(user);
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, mobile, email, password, head_img_url } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    { firstName, lastName, mobile, email, password, head_img_url },
    { new: true }
  ).exec();
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }
  res.json(user);
};

const updateFollowById = async (req, res) => {
  const { id } = req.params;
  const { following_task_id } = req.body;

  const user = await UserModel.findById(id).exec();
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }

  const followingTasks = user.following_task_id;
  const dataExistsIndex = followingTasks.indexOf(following_task_id);
  if (dataExistsIndex !== -1) {
    followingTasks.splice(dataExistsIndex, 1);
  } else {
    followingTasks.push(following_task_id);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { following_task_id: followingTasks },
    { new: true }
  ).exec();
  if (!updatedUser) {
    res.status(404).json({ error: 'update failed' });
    return;
  }
  res.json({ msg: 'follow array update success'});
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const deleted = true;
  const user = await UserModel.findByIdAndUpdate(id, { deleted }, { new: true }).exec();
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }
  res.json(user);
};

// @@
// const removeNotificationFromUser = async (req, res) => {
//   const { notificationId, userId } = req.params;
//   const user = await UserModel.findByIdAndUpdate(
//     userId,
//     { $pull: { notification_id: notificationId } },
//     { new: true }
//   ).exec();
//   if (!user) {
//     res.status(404).json({ error: 'user not found' });
//   }
// };

module.exports = {
  // addUser,
  getAllUsers,
  getUserById,
  updateUserById,
  updateFollowById,
  deleteUserById,
  // removeNotificationFromUser,
  // addTaskToUser,
  // removeTaskFromUser,
};
