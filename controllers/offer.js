const OfferModel = require('../models/Offer');

const addOffer = async (req, res) => {
  const { name, number, email, description, deleted, task, create_datetime } = req.body;

  const offer = new OfferModel({
    name,
    number,
    email,
    description,
    deleted,
    task,
    create_datetime,
  });
  await offer.save();
  res.status(201).json(task);
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
};
