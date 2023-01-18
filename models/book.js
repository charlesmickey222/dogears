import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  name:{type:String, required:true},
  authors:[{type:Schema.Types.ObjectId, ref:"Author"}],
  poster:{type:Schema.Types.ObjectId, ref:"Profile"},
  readers:[{type:Schema.Types.ObjectId, ref:"Profile"}],
  pageCount:Number,
  yearPublished:{type:Number, min:0, max:2023},
},{timestamps:true});
const Book = mongoose.model('Book', bookSchema);
export{
  Book,
}