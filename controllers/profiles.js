import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js"
import { Dogear } from "../models/dogear.js";

function show(req,res){
    Profile.findById(req.user.profile._id)
    .populate("library")
    .then(profile=>{
      Book.find({})
      .then(books=>{
      const ownsProfile = (profile._id === req.user.profile._id)
      res.render('profile/show',{
        title:"Library",
        profile:profile,
        ownsProfile,
        books
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect(`/books`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/books`)
    })
}
function newDogear(req,res){
Profile.findById(req.user.profile._id)
.then(profile=>{
  res.render('profile/new',{
    title:"New Dogear",
  })
})
.catch(err => {
  console.log(err)
  res.redirect(`/books`)
})
}

function saveBook(req,res){
  console.log(req.body)
  Profile.findById(req.user.profile._id)
  .then(profile=>{
    profile.library.push(req.body.targetBook)
    profile.save()
    res.redirect('/books')
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/books`)
  })
}

export{
  show,
  saveBook,
  newDogear,
}