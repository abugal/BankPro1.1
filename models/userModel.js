const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }


})

// static signup 
userSchema.statics.signup = async function (email, password) {

    // use validator to validate email and password
    if (!email || !password) {
        throw Error('Kindly fill all the fields')
    }
    if (!validator.isEmail(email)) {
        throw Error("Not a valid Email")
    }
    if(!validator.isStrongPassword(password)) {
        throw Error("Password not Strong enough!")
    }

    // adding an extra layer of security
    const exists = await this.findOne({ email })

    if  (exists) {
        throw Error('Email in use')
    }

    // generate salt by using the default value=10
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) // hashing the password

    // creating a document of the hash password and the email
    const user = await this.create({email, password: hash})

    return user
}

// create static login method
userSchema.statics.login = async function(email, password) {
  // checking the email value
  if (!email || !password) {
    throw Error("Kindly fill all the fields");
  }

  // check if the user exist
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email not correct please");
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw Error('Password not correct please')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)