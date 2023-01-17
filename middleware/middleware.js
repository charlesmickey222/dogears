function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

function updateBooks(req, res, next){
  req.body.books.forEach(book=>{
    book.authors.push(req.body._id)
  })
}

export {
  passDataToView,
  isLoggedIn,
  updateBooks,
}
