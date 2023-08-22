import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookData = async () => {
    try {
      const response = await axios.get("https://book-manager.onrender.com/books");
      const data = response.data;
      console.log(data);
      setLoading(false);
      setBookData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  const deleteBook = async (bookID) => {
    await axios.delete(`https://book-manager.onrender.com/books/${bookID}`);
    fetchBookData();
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : null}
      <div className="homepage-container">
        {bookData.length === 0 && !loading ? (
          <h1 className="homepage-not-have-books">You don't have any books yet ☹️</h1>
        ) : null}
        {bookData &&
          bookData.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="image-container">
                <img
                  className="book-image"
                  src={book.imageURL}
                  alt="book-image"
                />
                <p className="author-name">- {book.author}</p>
              </div>
              <div className="book-details">
                <h3 className="book-name">{book.title}</h3>
                <p className="book-description">{book.description}</p>
                <div className="button-container">
                  <Link to={`/updatebook/${book._id}`}>
                    <button className="update-button">Update</button>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Homepage;
