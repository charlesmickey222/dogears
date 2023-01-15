import { Book } from "../models/book.js";

function index(req,res){
  Book.find({})
  .then(books=>{
    res.render('books/index',{
      title:'Books',
      books,
    })
  })
}

function newBook(req,res){
  res.render('books/new',{
    title:'add a book',
  })
}

function create(req,res){
  req.body.poster = req.user.profile._id
  Book.create(req.body)
  .then(book=>{
    res.redirect('/books')
  })
}

export{
index,
newBook as new,
create,
}