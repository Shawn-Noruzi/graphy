const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

//Make a collection in DB called book, its contents being bookSchema
module.exports = mongoose.model("Book", bookSchema)