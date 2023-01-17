import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  name:{type:String, required:true},
  authors:[String],//[{type:Schema.Types.ObjectId, ref:"Author"}] when author model is made
  poster:{type:Schema.Types.ObjectId, ref:"Profile"},
  readers:[{type:Schema.Types.ObjectId, ref:"Profile"}],
},{timestamps:true});
const Book = mongoose.model('Book', bookSchema);
export{
  Book,
}