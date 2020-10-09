import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FETCH_BOOKS } from "../queries/queries";

export default () => {
  const { loading, error, data, refetch } = useQuery(FETCH_BOOKS);

  const renderBooks = () => {
    if (data.books.lenth < 1) {
      return <h1>There are no books, would you like to create one?</h1>;
    }

    return data.books.map((book) => {
      const { title, createdAt, id } = book;
      return (
        <div key={id} className="ui relaxed divided list">
          <div className="item">
            <i className="large book icon"></i>
            <div className="content">
              <Link to={`/books/${id}`} className="header">
                {title}
              </Link>
              {/* <p>Genre: {genre}</p> */}
              <div className="description">Created: {createdAt}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error! {error.message}</h1>;

  refetch();

  return (
    <div>
      <h1>BookList</h1>
      {renderBooks()}
    </div>
  );
};
