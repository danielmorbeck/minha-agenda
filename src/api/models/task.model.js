const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('Task', TaskSchema);