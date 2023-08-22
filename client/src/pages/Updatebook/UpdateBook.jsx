import React, { useState, useEffect } from "react";
import "../AddBook/AddBook.css";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";

const UpdateBook = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [bookData, setBookData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");

  const getBookData = async () => {
    const response = await axios.get(`https://book-manager.onrender.com/books/${id}`);
    const bookData = response.data;
    setBookData(bookData);
    setTitle(bookData.title);
    setDescription(bookData.description);
    setAuthor(bookData.author);
    setImageURL(bookData.imageURL);
  };

  useEffect(() => {
    getBookData();
  }, []);

  const updateBookData = async (e) => {
    e.preventDefault();

    try {
      if(title !== '' || description !== '' || author !== '' || imageURL !== ''){
      await axios.patch(`https://book-manager.onrender.com/books/${id}`, {
        title,
        description,
        author,
        imageURL,
      });
      navigate('/')
    }else{
      alert('Please make sure to fill out all the required fields before proceeding\nYour input is valuable 😉')
    }
    } catch (err) {
      console.error(err);
    }
    setAuthor("");
    setDescription("");
    setTitle("");
    setImageURL("");
  };

  return (
    <div className="addbook-container">
      <div className="form-container">
        <h2 className="addbook-text">Update Book</h2>
        <form onSubmit={(e) => updateBookData(e)}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="title">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
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
            />
          </div>
          <button className="btn" type="submit">
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
