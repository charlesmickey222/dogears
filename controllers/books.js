import { Book } from "../models/book.js";

function index(req,res){
  Book.find({})
  .then(books=>{
    res.render('books/index',{
      title:'Books',
      books,
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}

function create(req,res){
  req.body.poster = req.user.profile._id
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
  .then(book=>{
    res.render('books/show',{
      title:'Detail View',
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
    res.render('books/edit',{
      title:'update book information',
      book:book,
    })
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
}