import { Book } from "../models/book.js";
import { Author } from "../models/author.js";
import { Profile } from "../models/profile.js";

function index(req,res){
  Profile.findById(req.user.profile._id)
  .then(profile =>{
    Book.find({})
    .then((books)=>{
      Author.find({})
      .then(authors=>{
        res.render('books/index',{
          title:'Books',
          books,
          authors,
          profile
        })
    })
    })
    .catch(err=>{
      console.log(err)
      res.redirect('/books')
    })
  })
}

function create(req,res){
  req.body.poster = req.user.profile._id
  let temp = req.body.authors
  req.body.authors = [temp]
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
    Book.findById(req.params.id)
    .then(book=>{
      if (req.body.authors.length){
        book.authors.push(req.body.authors)
      }
      book.name = req.body.name
      if(req.body.yearPublished!==0){book.yearPublished = req.body.yearPublished}
      if(req.body.pageCount!==0){book.pageCount = req.body.pageCount}
      book.save()
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