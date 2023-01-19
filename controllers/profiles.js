import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js"

function show(req,res){
    Profile.findById(req.user.profile._id)
    .populate("dogears.book")
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
    })
}

function createDogear(req,res){
  req.body.started = Boolean(req.body.started)
  req.body.completed = Boolean(req.body.completed)
  Book.findById(req.body.book)
  .then(book=>{
    req.body.book=book
    Profile.findById(req.user.profile._id)
      .then(profile=>{

        profile.dogears.push(req.body)
        profile.save()
        .then(()=>{
          res.redirect(`/profiles/${req.user.profile._id}`)
        })
        .catch(err => {
          console.log(err)
          res.redirect(`/profiles/${req.user.profile._id}`)
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

export{
  show,
  createDogear,
}