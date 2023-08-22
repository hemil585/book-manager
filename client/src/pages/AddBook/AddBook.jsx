import React, { useState, useEffect } from "react";
import "./AddBook.css";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");

  const addBookData = async (e) => {
    e.preventDefault();

    console.log(title, description, author, imageURL);
    try {
      await axios.post("https://book-manager.onrender.com/books", {
        title,
        description,
        author,
        imageURL,
      });
      alert(`${title} added successfully!!! \n Go to book section to see 🙂`)
    } catch (err) {
      console.error(err);
    }
    setAuthor('')
    setDescription('')
    setTitle('')
    setImageURL('')
  };

  return (
    <div className="addbook-container">
      <div className="form-container">
        <h2 className="addbook-text">Add Book</h2>
        <form onSubmit={(e) => addBookData(e)}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={10}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="author-text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="imageurl"
              name="imageurl"
              placeholder="Enter image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
