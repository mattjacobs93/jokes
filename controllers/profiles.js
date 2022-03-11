import { Profile } from "../models/profile.js";
import { User } from '../models/user.js'

function newProfile (req, res) {
  res.render('profiles/new', {title:'New Profile'})
}

function create (req, res) {

  Profile.create(req.body, function (error, profile) {
    let userID

    try {
      userID = req.session.passport.user
    } catch (error) {
      res.redirect('/')
    }
    console.log('user id testing: ', userID)
    User.findById(userID, function (error, user) {
      user['profile'] = profile._id
      user.save()
      res.redirect('/jokes')
    })
  })

}

export {
  newProfile as new,
  create
}