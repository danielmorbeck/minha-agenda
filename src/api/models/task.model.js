const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dates: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'finished'],
    default: 'pending'
  },
  repeat: {
    type: String,
    enum: ['daily', 'weekly', 'monthly']
  },
  end_repeat: {
    type: Number
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', TaskSchema);