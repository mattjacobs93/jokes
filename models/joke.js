import mongoose from 'mongoose'

const jokeSchema = new mongoose.Schema({
  title:String,
  text: String,
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
}, {
  timestamps: true
})

const Joke = mongoose.model('Joke', jokeSchema)

export {
  Joke
}