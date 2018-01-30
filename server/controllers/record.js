const Record = require('../models/record');
const Text = require('../models/text');

exports.vote = function(req, res, next) {
  console.log(req.body.username)
  const current = new Date().toISOString().substring(0, 10);
  Record.findOne({
    $and: [ { text: req.body.text }, { date: current } ]
  }, function(err, record) {
    if  (err) { return next(err) }
    return record;
  })
  .then((response) => {
    if(!response) {
      Text.findOne({ _id: req.body.text }, function(err, text) {
        if (err) { return next(err); }
        let recordModel = new Record();
        recordModel.text = text._id;
        recordModel.headline = text.headline;
        recordModel.date = current;
        recordModel.votedBy = [req.body.username];
        recordModel.save(function(err, newRecord) {
          if (err) { return next(err); }
        });
      })
    } else {
      Record.findByIdAndUpdate(response._id, {$addToSet: {votedBy: req.body.username}}, function(err, record) {
        if (err) { return next(err); }
        res.status(200).send({ record });
      })
    }
  })
}

exports.show = function(req, res, next) {
  const current = new Date().toISOString().substring(0,10);
  Record.find({ date: current }, function(err, records) {
    if (err) { return next(err); }
    res.status(200).send({ records });
  })
}