import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  googleID:String,
  library:[{type:Schema.Types.ObjectId, ref:"Book"}],
  dogears:[{type:Schema.Types.ObjectId, ref:"Dogears"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
