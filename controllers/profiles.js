import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js"
import { Dogear } from "../models/dogear.js";

function show(req,res){
    Profile.findById(req.user.profile._id)
    .populate("library")
    .populate("dogears")
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
  .then(book=>{
  Profile.findById(req.user.profile._id)
  .then(profile=>{
    req.body.started = true
    req.body.owner = req.user.profile._id
    req.body.name = book.name;
    req.body.completed = false;
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

function updateDogear(req,res){
  req.body.completed = Boolean(req.body.completed)
  Dogear.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(dogear=>{
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/books`)
  })
}

function deleteDogear(req,res){
  Dogear.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function saveBook(req,res){
  Profile.findById(req.user.profile._id)
  .then(profile=>{
    profile.library.push(req.body.targetBook)
    profile.save()
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/books`)
  })
}

function tossBook(req,res){
  Profile.findById(req.user.profile._id)
  .then(profile=>{
    let idx = profile.library.indexOf(req.body.bookHandler);
    profile.library.splice(idx,1)
    profile.save()
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export{
  show,
  saveBook,
  tossBook,
  newDogear,
  createDogear,
  editDogear,
  updateDogear,
  deleteDogear,
}