import { Author } from "../models/author.js";

function index(req,res){
Author.find({})
.then(authors=>{
  res.render('authors/index',{
    title:'Authors',
    authors:authors,
  })
})
.catch(err=>{
  console.log(err)
  res.redirect('/authors')
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
  .catch(err=>{
    console.log(err)
    res.redirect('/authors')
  })
}

function show(req,res){
  Author.findById(req.params.id)
  .populate("poster")
  .then(author=>{
    res.render('authors/show',{
      title:'author detailed view',
      author:author,
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/authors')
  })
}

function edit(req,res){
  Author.findById(req.params.id)
  .then(author=>{
    res.render('authors/edit',{
      title:'update author information',
      author:author,
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/authors')
  })
}

function update(req,res){
  req.body.poster = req.user.profile._id
  req.body.readers = [req.body.poster]
  req.body.living = Boolean(req.body.living)
  Author.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(author=>{
    res.redirect(`authors/${book._id}`)
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/authors')
  })
}

function deleteAuthor(req,res){
  Author.findByIdAndDelete(req.params.id)
  .then(
    res.redirect('/authors')
  )
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}


export{
index,
create,
show,
deleteAuthor as delete,
update,
edit,
}