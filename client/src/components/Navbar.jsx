import React, { useState } from "react";
import "./Navbar.css";
import { Routes, Route, NavLink } from "react-router-dom"; // Import NavLink instead of Link
import Homepage from "../pages/Homepage/Homepage";
import AddBook from "../pages/AddBook/AddBook";
import About from "../pages/About/About";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import UpdateBook from "../pages/Updatebook/UpdateBook";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="navbar-container">
        <ul className="navbar-items">
          <NavLink to={"/"}>Books</NavLink>
          <NavLink to={"/addbook"}>Add Book</NavLink>
          <NavLink to={"/about"}>About</NavLink>
        </ul>
        <div className="navbar-mobile-container">
          {menu ? (
            <RiCloseLine
              className="navbar-closeline"
              color="black"
              size={"4rem"}
              onClick={() => setMenu(false)}
            />
          ) : (
            <RiMenu3Line
              className="navbar-menuline"
              color="#fff"
              size={"4rem"}
              onClick={() => setMenu(true)}
            />
          )}
          {menu && (
            <div className="navbar-mobile-container-items">
              <ul className="mobile-navbar-items">
                <NavLink
                  to={"/"}
                  onClick={() => setMenu(false)}
                  className="navbar-item-active"
                >
                  Books
                </NavLink>
                <NavLink
                  to={"/addbook"}
                  onClick={() => setMenu(false)}
                  className="navbar-item-active"
                >
                  Add Book
                </NavLink>
                <NavLink
                  to={"/about"}
                  onClick={() => setMenu(false)}
                  className="navbar-item-active"
                >
                  About
                </NavLink>
              </ul>
            </div>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/addbook" element={<AddBook />}></Route>
        <Route path="/updatebook/:id" element={<UpdateBook />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
};

export default Navbar;
