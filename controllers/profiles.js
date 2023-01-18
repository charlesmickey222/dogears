import { Profile } from "../models/profile.js";

function show(req,res){
  Profile.findById(req.user.profile._id)
  .populate("dogears")
  .populate("library")
  .then(profile=>{
    res.render('profile/show',{
      title:"Library",
      profile:profile,
    })
  })
}


export{
  show,
}