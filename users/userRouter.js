const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
  .then(newUser =>{
    res.status(200).json(newUser);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newArticle = req.body;
  newArticle.user_id = req.user.id;

  postDb.insert(req.body)
  .then(article =>{
    res.status(200).json(article);
  })
  .catch(err =>{
    res.status(500).json(err);
  })
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
  userDb.remove(req.user.id)
  .then(person =>{
        userDb.get()
      .then(people =>{
        console.log('success on GET api/users request');
        res.status(200).json(people)
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json("userDB get error: ", err);
      })
  })
  .catch(err =>{
    res.status(500).json("userDB remove method error: ", err);
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  userDb.update(req.user.id, req.body)
  .then(notNeeded =>{
    console.log(notNeeded);
    userDb.getById(req.user.id)
    .then(person=>{
      res.status(200).json(person);
    })
    .catch(err =>{
      res.status(500).json("Getting updated user Error: ",err);
    })
  })
  .catch(err =>{
    res.status(500).json("userDB update Error: ",err);
  })
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
  if(req.body.name === undefined || req.body === null){
    res.status(400).json({ message: "missing user data" });
  }
  else if(req.body.name === "" || req.body.name === null){
    res.status(404).json({ message: "missing required name field" });
  }
  else{
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(req.body.text === undefined || req.body === null){
    res.status(400).json({ message: "missing user data" });
  }
  else if(req.body.text === "" || req.body.text === null){
    res.status(404).json({ message: "missing required name field" });
  }
  else{
    next();
  }
}

module.exports = router;
