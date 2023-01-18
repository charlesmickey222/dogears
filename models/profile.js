import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dogearSchema = new Schema({
  book:{type:Schema.Types.ObjectId, ref:"Book"},
  started:Boolean,
  currentPage:Number,
  completed:Boolean,
  owner:{type:Schema.Types.ObjectId, ref:"Profile"}
  
},{timestamps:true})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  googleID:String,
  library:[{type:Schema.Types.ObjectId, ref:"Book"}],
  dogears:[dogearSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
