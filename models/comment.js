import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true, minlength: 1},
  author:String,
  authorProfile:{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  joke: {type: mongoose.Schema.Types.ObjectId, ref: 'Joke'},
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

export {
  Comment,
  commentSchema
}