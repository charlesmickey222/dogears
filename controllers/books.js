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

function create(req,res){
  req.body.poster = req.user.profile._id
  Book.create(req.body)
  .then(book=>{
    res.redirect('/books')
  })
}

function deleteBook(req,res){
  Book.findByIdAndDelete(req.body.id,)
}

function show(req,res){
  Book.findById(req.params.id)
  .then(book=>{
    res.render('book/show',{
      title:'Detail View',
      book:book,
    })
  })
}

export{
index,
create,
deleteBook as delete,
show
}