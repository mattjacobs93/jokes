
//checks is the user is logged in in the middle in order to protect routes from unauthorized access
function isLoggedIn (req,res,next) {
  //if the user is logged in, then call the next function
  if (req.isAuthenticated()) return next()
  //else redirect to login page
  res.redirect('/auth/google')
}

  

  function passUserToView(req, res, next) {
    res.locals.user = req.user ? req.user : null
    next()
  }

  
  export {
    passUserToView,
    isLoggedIn
  }

