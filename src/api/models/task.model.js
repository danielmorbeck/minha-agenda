const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dates: {
    type: [Date],
    default: [Date.now()]
  },
  status: {
    type: String,
    enum: ['pending', 'finished'],
    default: 'pending'
  },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Task', TaskSchema);