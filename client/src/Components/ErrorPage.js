import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Whoops, sorry! It seems like this book doesn't exist</h1>
      <h2>Want to make it?</h2>
      <Link to="/books/new">
        <button className="ui button primary">Hell yes!</button>
      </Link>
      <Link to="/books">
        <button className="ui button negative">Nah, take me back</button>
      </Link>
    </div>
  );
};
