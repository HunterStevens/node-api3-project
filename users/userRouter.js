const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  userDb.get()
  .then(people =>{
    console.log('success on GET api/users request');
    res.status(200).json(people)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userDb.getUserPosts(req.user.id)
  .then(articles =>{
    if(articles.length === 0){
      res.status(404).json({Eror:"This user doesn't seem to have any posts made."})
    }
    else{
      res.status(200).json(articles);
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req,res,next){
  userDb.getById(req.params.id)
  .then(person =>{
    if(person === undefined){
      res.status(400).json({ message: "invalid user id" });  
    }else{
      console.log(person);
      req.user = person;
      next();
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({ message: "Error trying to retrieve id for user" });
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(req.body.name === "" || req.body.name === undefined)

}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
