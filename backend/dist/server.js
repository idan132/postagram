//Packages
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());
//DB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => { console.error(error); });
db.once('open', () => { console.log('Connected to mongo DB'); });
//Routes
const postRouter = require('./routes/post_route.js');
const messageRouter = require('./routes/message_route.js');
app.use(express.static('public'));
app.use('/post', postRouter);
app.use('/messages', messageRouter);
//Export app object for server.js
module.exports = app;
//# sourceMappingURL=server.js.map