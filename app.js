const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const fileRouter = require('./router/fileRouter');
const messageRouter = require('./router/messageRouter');
const receiverRouter = require('./router/receiverRouter');
const userRouter = require('./router/userRouter');
const viewRouter = require('./router/viewRouter');

const app = express();

// req.body parser
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', viewRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/receive', receiverRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
