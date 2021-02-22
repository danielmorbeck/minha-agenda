const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tasks : [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('User', UserSchema);