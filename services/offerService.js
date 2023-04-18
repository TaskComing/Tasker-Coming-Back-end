const OfferModel = require('../models/Offer');
const TaskModel = require('../models/Task');
const { createNotification } = require('./notificationService');

const acceptOfferService = async (req, res) => {
  const { id } = req.params;
  const { offerIds, taskId } = req.body;
  console.log(req.body, id);
  const bulkOps = offerIds.map((offerId) => ({
    updateOne: {
      filter: { _id: offerId },
      update: { $set: { status: offerId === id ? 'accepted' : 'rejected' } },
    },
  }));
  await OfferModel.bulkWrite(bulkOps);
  const task = await TaskModel.findOneAndUpdate(
    { _id: taskId },
    { status: 'assigned' },
    { new: true }
  ).populate({
    path: 'create_user_id',
    select: 'following_task_id head_img_url firstName lastName',
  })
  .populate({
    path: 'offers',
    populate: {
      path: 'create_user_id',
      select: 'head_img_url',
    },
  });
  await createNotification({ task, action: 'offerAssigned' });

  res.status(201).json(task);
};

module.exports = {
  acceptOfferService,
};
