const UserModel = require('../models/User');

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
  const user = await UserModel.findById(id).exec();
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }
  res.json(user);
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, mobile, email, password } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    { firstName, lastName, mobile, email, password },
    { new: true }
  ).exec();
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }
  res.json(user);
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

const addUserToComment = async (req, res) => {};

const removeUserFromComment = async (req, res) => {};

const addNotificationToUser = async (req, res) => {};

const removeNotificationFromUser = async (req, res) => {};

const addTaskToUser = async (req, res) => {};

const removeTaskFromUser = async (req, res) => {};

module.exports = {
  // addUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addUserToComment,
  removeUserFromComment,
  addNotificationToUser,
  removeNotificationFromUser,
  addTaskToUser,
  removeTaskFromUser,
};
