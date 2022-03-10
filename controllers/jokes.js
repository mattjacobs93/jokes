import {Joke} from '../models/joke.js'

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


export {
  index,
  newJoke as new,
  create,
  show,
  createComment
}