const OfferModel = require('../models/Offer');
const notificationService = require('../services/notificationService');
const TaskModel = require('../models/Task');
const UserModel = require('../models/User');

const addOffer = async (req, res) => {
  const { name, number, email, description, deleted, task, create_user_id } = req.body;

  const offer = new OfferModel({
    name,
    number,
    email,
    description,
    deleted,
    task,
    create_user_id,
  });

  await offer.save();

  const foundTask = await TaskModel.findById(task).exec();
  foundTask.offers.push(offer._id);
  await foundTask.save();

  await UserModel.updateOne(
    { _id: create_user_id },
    { $addToSet: { offers_id: offer._id } }
  ).exec();
  // const addToTaskRes = await TaskModel.updateOne(
  //   { _id: task },
  //   { $addToSet: { offers: offer._id } }
  // ).exec();

  // add notification to the database
  await notificationService.createNotification({
    task: foundTask,
    action: 'createOffer',
    offer,
  });

  res.status(201).json(offer);
};
const getAllOffers = async (req, res) => {
  const offers = await OfferModel.find().exec();
  res.json(offers);
};

const getOfferById = async (req, res) => {
  const { id } = req.params;
  const offer = await OfferModel.findById(id).exec();
  if (!offer) {
    res.status(404).json({ error: 'offer not found' });
    return;
  }
  res.json(offer);
};

const getOfferByIds = async (req, res) => {
  const { ids } = req.body;
  const offers = await OfferModel.find({ _id: { $in: ids } })
    .populate({
      path: 'create_user_id',
      select: 'head_img_url',
    })
    .exec();
  if (!offers) {
    res.status(404).json({ error: 'offer not found' });
    return;
  }
  res.json(offers);
};

const updateOfferById = async (req, res) => {
  const { id } = req.params;
  const { name, number, email, description, deleted, task, create_datetime } = req.body;
  const offer = await OfferModel.findByIdAndUpdate(
    id,
    { name, number, email, description, deleted, task, create_datetime },
    { new: true }
  ).exec();
  if (!offer) {
    res.status(404).json({ error: 'offer not found' });
    return;
  }
  res.json(offer);
};

const deleteOfferById = async (req, res) => {
  const { id } = req.params;
  const offer = await OfferModel.findByIdAndDelete(id).exec();
  if (!offer) {
    res.status(404).json({ error: 'offer not found' });
    return;
  }
  res.sendStatus(204);
};
module.exports = {
  addOffer,
  getAllOffers,
  getOfferById,
  updateOfferById,
  deleteOfferById,
  getOfferByIds,
};
