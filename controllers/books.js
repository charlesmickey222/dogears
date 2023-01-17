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
  req.body.authors = []
  Book.create(req.body)
  .populate('poster')
  .then(book=>{
    res.render(`books/show`,{
      title:'Book',
      book:book,
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/books')
  })
}

function show(req,res){
  Book.findById(req.params.id)
  .populate("poster")
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