const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);
const cors = require('cors');
const mongoose = require('mongoose');
const Text = require('./controllers/text');
const Record = require('./controllers/record');

// db setup
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://root:118@ds113648.mlab.com:13648/task_2');

app.use(bodyParser.json({ type: '*/*' }));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(cors());
app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.post('/api/create', Text.create);
app.get('/api/fetch', Text.fetch);
app.post('/api/vote', Record.vote);
app.get('/api/show', Record.show);
app.use(redirectUnmatched);
function redirectUnmatched(req, res) {
  res.redirect("/");
}


const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is runing on localhost:${port}`)
});