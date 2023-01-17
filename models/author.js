import mongoose from "mongoose";
const Schema = mongoose.Schema;
const authorSchema = new Schema({
  name:{type:String, required:true},
  books:[{type:Schema.Types.ObjectId, ref:"Book"}], 
  poster:{type:Schema.Types.ObjectId, ref:"Profile"},
  readers:[{type:Schema.Types.ObjectId, ref:"Profile"}],
  living:Boolean,
},{timestamps:true});
const Author = mongoose.model('Author', authorSchema);
export{
  Author,
}