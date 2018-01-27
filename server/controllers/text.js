const Text = require('../models/text');

exports.create = function(req, res, next) {
  let textModel = new Text();
  textModel.headline = req.body.headline;
  textModel.buttonText = req.body.buttonText;

  textModel.save(function(err, text) {
    if (err) { return next(err); }
    res.status(200).send({ text })
  })
}

exports.fetch = function(req, res, next) {
  const texts = Text.find(function(err, texts) {
    if (err) { return next(err); }
    res.status(200).send({texts});
  });
}