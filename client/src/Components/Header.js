import React from "react";
import { Link } from "react-router-dom";

//basic set up is done. But I like the search bar. So if I want to keep it
//I'd have to make a new query to search for a book by it's title
//then implement something with that. Also gotta do some stuff w/ user and login
//let's save for the end

export default () => {
  return (
    <div className="ui secondary  menu">
      <Link to="/" className="active item">
        Book NeЯds
      </Link>
      <Link to="/books" className="item">
        Books
      </Link>
      <Link to="/books/new" className="item">
        New Book
      </Link>
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search for a book!" />
            <i className="search link icon"></i>
          </div>
        </div>
        <a className="ui item">Login</a>
      </div>
    </div>
  );
};
