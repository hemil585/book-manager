const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = Schema({
    title: {type:String,required: true},
    description: String,
    author: String,
    imageURL: String  
})


exports.Book = mongoose.model('Book',bookSchema)