const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    email: {
      type: String,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, "Invalid email format."],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    name: {
      type: String,
      required: true,
    },
    role:{
        type: String,
        default:"user"
    }
  });

  userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12)
    next()
})

module.exports.Users = mongoose.model('Users',userSchema)