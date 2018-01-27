const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  text: { type: Schema.Types.ObjectId, ref: 'text' },
  headline: { type: String, required: true },
  date: { type: String, required: true, default: Date.now("<YYYY-mm-dd>") },
  votedBy: [{ type: String }]
});

const modelClass = mongoose.model('record', recordSchema);

module.exports = modelClass;