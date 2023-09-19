//importing modules
const mongoose = require('mongoose');


//defining the structure of the collection
const newUserSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        required: true
    }
});

//creating the model
const newUser = mongoose.model('user',newUserSchema);

module.exports = newUser;