import {Joke} from '../models/joke.js'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import * as commentsFile from '../models/comment.js' 


function index (req,res) {
  let userID

  try {
    userID = req.session.passport.user
  } catch (error) {
    res.redirect('/')
  }

  User.findById(userID,function (error, user) {   
    if (!user || !user.profile || !user.profile.username) {
      res.redirect('/profiles/new')
    } else {
      user.populate('profile',function (error, userPop) {
        console.log(userPop)
        Joke.find({}, function (error,jokes) {
          res.render('jokes/index', {
            jokes,
            title: 'All Jokes',
            user,
          })
        }) 
      })
    }
  })
}

function newJoke (req, res) {
  let userID
  
  try {
    userID = req.session.passport.user
  } catch (error) {

    res.redirect('/')
  }

  User.findById(userID,function (error, user) {    
    res.render('jokes/new', {
      title: 'New Joke',
      user,
    })
  })
}

function create (req, res) {
  Joke.create(req.body,function(error){
    res.redirect('/jokes')
  })
}

function show(req, res) {
  let userID
  
  try {
    userID = req.session.passport.user
  } catch (error) {

    res.redirect('/')
  }

  User.findById(userID, function (error,user) {
    Joke.findById(req.params.id, function (error, joke) {
      res.render('jokes/show', {
        joke,
        title: 'Joke', 
        user,
      })
    })
  })
}

function createComment (req, res) {
  Joke.findById(req.params.id, function(error,joke) {
    joke.comments.push(req.body)
    joke.save(function (error) {
      res.redirect(`/jokes/${joke._id}`)
    })
  })

}

function deleteJoke (req, res) {
  Joke.findByIdAndDelete(req.params.id, function (){
    res.redirect('/jokes')
  })
}

function edit (req, res) {
  let userID
  
  try {
    userID = req.session.passport.user
  } catch (error) {

    res.redirect('/')
  }
  User.findById(userID, function (error, user) {
    Joke.findById(req.params.id, function (error, joke) {
      res.render('jokes/edit', {
        joke,
        title: 'Edit Joke',
        user,
      })
    })
  })
}

function update (req, res) {
  Joke.findByIdAndUpdate(req.params.id,req.body,function() {
    res.redirect(`/jokes/${req.params.id}`)
  })
}

function deleteComment (req, res) {
   Joke.findById(req.params.jokeId, function (error, joke) {
     joke.comments = joke.comments.filter(comment=>!comment._id.equals(req.params.id))
     joke.save(function (error) {
      commentsFile.Comment.findByIdAndDelete(req.params.id, function (error) {
        res.redirect(`/jokes/${req.params.jokeId}`)
      })
     })
   })
}


function editComment (req, res) {
  let userID
  
  try {
    userID = req.session.passport.user
  } catch (error) {

    res.redirect('/')
  }

  User.findById(userID, function (error, user) {
    Joke.findById(req.params.jokeId, function (error, joke) {
      const comment = joke.comments.filter(comment=>comment._id.equals(req.params.id))[0]
      res.render('jokes/editComment', {
        joke, 
        comment,
        title: 'Edit Comment',
        user,
      })
    })
  })
}

function updateComment (req,res) {
  Joke.findById(req.params.jokeId, function (error, joke) {
    joke.comments.forEach(comment => {
      if (comment._id.equals(req.params.id)) {
        comment.text = req.body.text
        joke.save()
      }
    })
    res.redirect(`/jokes/${req.params.jokeId}`)
  })
}



export {
  index,
  newJoke as new,
  create,
  show,
  createComment,
  deleteJoke as delete,
  edit,
  update,
  deleteComment,
  updateComment,
  editComment,
}