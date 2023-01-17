import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  googleID:String,
  //dogears
  //savedAuthors
  library:[{type:Schema.Types.ObjectId, ref:"Book"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
