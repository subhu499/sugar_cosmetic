const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
      fName: {
            type: String,
            required: true,
        },
        lName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        number: {
            type: Number,
            required: true,
            unique: true,
        },
        cart: [Object],
})


const Usermodal = mongoose.model("user" , UserSchema)


module.exports = { Usermodal }