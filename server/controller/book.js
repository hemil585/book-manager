const mongoose = require("mongoose");
const model = require("../model/book");
const Book = model.Book;

exports.createBook = (req, res) => {
  try {
    const { title, description, author, imageURL } = req.body;
    const data = {
      title: title,
      description: description,
      author: author,
      imageURL: imageURL,
    };
    console.log("Data: ", data);

    const book = new Book(data);
    const savedBook = book.save();

    res.status(201).json(savedBook);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(404).json(err);
  }
};

exports.getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(404).json(err);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, author, imageURL } = req.body;
    const updatedData = {
      title: title,
      description: description,
      author: author,
      imageURL: imageURL,
    };
    const query = { _id: id };
    const book = await Book.findOneAndUpdate(query, updatedData, { new: true });
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(404).json(err);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id
    const book = await Book.findByIdAndDelete(id)
    res.status(200).json(book)
  } catch (err) {
    console.error(err);
    res.status(204).json(err);
  }
};
