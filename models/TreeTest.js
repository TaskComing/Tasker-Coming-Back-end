const { Schema, model } = require('mongoose');

const TreeSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  childIdArray: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

const TreeModel = model('TreeTest', TreeSchema);

module.exports = TreeModel;
