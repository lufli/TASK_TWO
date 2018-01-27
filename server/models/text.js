const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  headline: { type: String, unique: true, required: true },
  buttonText: { type: String, required: true }
});

const modelClass = mongoose.model('text', textSchema);

module.exports = modelClass;


