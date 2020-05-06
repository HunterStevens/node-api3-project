const express = require('express');
const postDb = require('./posts/postDb');
const userDb = require('./users/userDb');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



//custom middleware

function logger(req, res, next) {
  const today = new Date().toISOString();
  today.slice(0,14);
  console.log(`${req.method} to ${req.url} [${today}]`);
}

function validateUserId(req,res,next){

}

function validateUser(req,res,next){

}

function validatePost(req,res,next){

}


module.exports = server;
