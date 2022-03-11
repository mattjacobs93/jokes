import mongoose from 'mongoose'
import * as commentFIle from './comment.js'
import { profileSchema } from './profile.js'

const jokeSchema = new mongoose.Schema({
  title:String,
  text: String,
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  authorObj:profileSchema,
  comments: {type: [commentFIle.commentSchema]},
}, {
  timestamps: true
})

const Joke = mongoose.model('Joke', jokeSchema)

export {
  Joke
}