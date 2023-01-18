import { Book } from "../models/book.js";
import { Author } from "../models/author.js";

function index(req,res){
  Book.find({})
  .then(books=>{
    Author.find({})
    .then(authors=>{
    res.render('books/index',{
      title:'Books',
      books,
      authors,
    })
  })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}

function create(req,res){
  req.body.poster = req.user.profile._id
  req.body.authors = []
  Book.create(req.body)
  .then(book=>{
    res.redirect('/books')
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}

function show(req,res){
  Book.findById(req.params.id)
  .populate("poster")
  .populate("authors")
  .then(book=>{
    res.render('books/show',{
      title:'Book',
      book:book,
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}

function deleteBook(req,res){
  Book.findByIdAndDelete(req.params.id)
  .then(book=>{
    res.redirect('/books')
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}

function edit(req,res){
  Book.findById(req.params.id)
  .then(book=>{
    Author.find({})
    .then(authors=>{
      res.render('books/edit',{
        title:'update book information',
        book:book,
        authors:authors
      })
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}

function update(req,res){
    req.body.poster = req.user.profile._id
    Book.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(book=>{
      res.redirect('/books')
    })
    .catch(err=>{
      console.log(err)
      res.redirect('/books')
    })
}

export{
index,
create,
show,
deleteBook as delete,
edit,
update,
}