import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  username: String,
  name: String,
  avatar: String,
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile,
  profileSchema
}