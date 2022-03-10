import {Joke} from '../models/joke.js'
import * as commentsFile from '../models/comment.js' 

function index (req,res) {
  //console.log('sanity check index ctrl')
  Joke.find({}, function (error,jokes) {
    res.render('jokes/index', {
      jokes
    })
  })
}

function newJoke (req, res) {
  res.render('jokes/new')
}

function create (req, res) {
  //req.body.author = 'Joe'
  console.log(req.body)
  Joke.create(req.body,function(error){
    res.redirect('/jokes')
  })
}

function show(req, res) {
  Joke.findById(req.params.id, function (error, joke) {
    res.render('jokes/show', {joke})
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
  console.log('edit joke')
  Joke.findById(req.params.id, function (error, joke) {
      res.render('jokes/edit', {joke})
  })
}

function update (req, res) {
  Joke.findByIdAndUpdate(req.params.id,req.body,function() {
    res.redirect(`/jokes/${req.params.id}`)
  })
}

function deleteComment (req, res) {
  console.log('delete comment', req.params)
   Joke.findById(req.params.jokeId, function (error, joke) {
     joke.comments = joke.comments.filter(comment=>!comment._id.equals(req.params.id))
     joke.save()
   })

  commentsFile.Comment.findByIdAndDelete(req.params.id, function (error) {
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
}