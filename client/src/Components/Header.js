import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

//basic set up is done. But I like the search bar. So if I want to keep it
//I'd have to make a new query to search for a book by it's title
//then implement something with that. Also gotta do some stuff w/ user and login
//let's save for the end

//kinda did the search part but it's just meh, so gotta fix it

export default () => {
  const [input, setInput] = useState("");

  const FETCH_BOOK_BY_TITLE = gql`
  {
    bookByTitle(title: "${input}"){
      id
    }
  }
`;

  const [searchBooks, { data, loading }] = useLazyQuery(FETCH_BOOK_BY_TITLE);

  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    searchBooks();
    if (loading) return console.log(loading);
    if (!data) {
      return;
    }
    if (!data.bookByTitle) {
      return history.push("/books/404-title-not-found");
    }
    if (data.bookByTitle.id) {
      return history.push(`/books/${data.bookByTitle.id}`);
    }
  };

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
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search for a book!"
            />
            <i onClick={(e) => onSubmit(e)} className="search link icon"></i>
          </div>
        </div>
        <a className="ui item">Login</a>
      </div>
    </div>
  );
};
