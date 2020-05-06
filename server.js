const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');


const server = express();

server.use(express.json());
server.use(logger);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter);

//custom middleware

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(`${req.method} to ${req.url} [${today}]`);
  next();
}



module.exports = server;
