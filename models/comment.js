import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: String,
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  joke: {type: mongoose.Schema.Types.ObjectId, ref: 'Joke'},
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

export {
  Comment,
  commentSchema
}