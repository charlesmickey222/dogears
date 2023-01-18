import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js"

function show(req,res){
    Profile.findById(req.user.profile._id)
    .populate("dogears")
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

}

export{
  show,
  createDogear
}