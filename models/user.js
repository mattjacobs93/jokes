import mongoose from 'mongoose'
import { profileSchema } from './profile.js'

const userSchema = new mongoose.Schema({
  email: String,
  googleId: String,
  profile: profileSchema,
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

export {
  User
}