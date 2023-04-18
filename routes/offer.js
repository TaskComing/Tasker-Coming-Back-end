const { Router } = require('express');
const {
  addOffer,
  getAllOffers,
  getOfferById,
  updateOfferById,
  deleteOfferById,
  getOfferByIds,
} = require('../controllers/offer');
const auth = require('../middleware/authentication');
const { acceptOfferService } = require('../services/offerService');

const offerRouter = Router();

offerRouter.post('/', addOffer);
offerRouter.get('', getAllOffers);
offerRouter.get('/Ids/', getOfferByIds);
offerRouter.get('/:id', getOfferById);
offerRouter.put('/accept/:id', acceptOfferService);
offerRouter.put('/:id', updateOfferById);
offerRouter.delete('/:id', deleteOfferById);

module.exports = offerRouter;
