import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js"
import { Dogear } from "../models/dogear.js";

function show(req,res){
    Profile.findById(req.user.profile._id)
    .populate("library")
    .populate({
      path:"dogears",
      populate: {
        path:'book',
      }
    })
    .then(profile=>{
      Book.find({})
      .then(books=>{
      const ownsProfile = (profile._id === req.user.profile._id)
      res.render('profiles/show',{
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
        Book.find({})
        .then(books=>{
        res.render('profiles/newDogear',{
        title:'add a dogear',
        books,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/books`)
    })
  }).catch(err => {
    console.log(err)
    res.redirect(`/books`)
  })
}

function createDogear(req,res){
  Book.findById(req.body.book)
  .then(book=>{})
  Profile.findById(req.user.profile._id)
  .then(profile=>{
    req.body.started = true
    req.body.owner = req.user.profile._id
    //req.body.name =
    Dogear.create(req.body)
    .then(dogear =>{
      profile.dogears.push(dogear)
      profile.save()
      res.redirect(`/profiles/${req.user.profile._id}`)
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

function editDogear(req,res){
      Dogear.findById(req.params.id)
      .then(dogear=>{
        console.log(dogear)
        res.render('profiles/editDogear',{
        title:`update page`,
        dogear:dogear,
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
  createDogear,
  editDogear,
}