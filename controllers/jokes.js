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


export {
  index,
  newJoke as new,
  create
}