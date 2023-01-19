import { Author } from "../models/author.js";
import { Book } from "../models/book.js";

function index(req,res){
Author.find({})
.then(authors=>{
Book.find({})
.populate("name")
.then(books=>{
  res.render('authors/index',{
    title:'Authors',
    authors:authors,
    books:books,
  })
})
.catch(err=>{
  console.log(err)
  res.redirect('/authors')
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
  .catch(err=>{
    console.log(err)
    res.redirect('/authors')
  })
}

function show(req,res){
  Book.find({})
  .then(books=>{
  Author.findById(req.params.id)
  .populate("poster")
  .populate("books")
  .then(author=>{
    res.render('authors/show',{
      title:'author detailed view',
      author:author,
      books:books
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/authors')
  })
})
}

function edit(req,res){
  Book.find({})
  .then(books=>{
  Author.findById(req.params.id)
  .populate("books")
  .then(author=>{
    res.render('authors/edit',{
      title:'update author information',
      author:author,
      books:books,
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/authors')
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