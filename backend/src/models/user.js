const { default: mongoose } = require("mongoose");




const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: "user", enum: ["user", "mod", "admin"]
  },
  skills:
    [String]
  ,
  createdAt: {
    type: Date,
    default: Date.now
  }


}, {
  timestamps: true
})


const User = mongoose.model("User", userSchema)
module.exports = User