import { Author } from "../models/author.js";

function index(req,res){
Author.find({})
.then(authors=>{
  res.render('authors/index',{
    title:'Authors',
    authors:authors,
  })
})
}

function create(req,res){
  req.body.poster = req.user.profile._id
  req.body.readers = [req.body.poster]
  req.body.living = Boolean(req.body.living)
  Author.create(req.body)
  .then(author=>{
    res.redirect('/authors')
  })
}


export{
index,
create,
}