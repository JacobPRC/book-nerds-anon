import React from "react";
import { Link, useLocation } from "react-router-dom";

export default ({ header, btnText }) => {
  let location = useLocation();
  const { newTitle } = location.state;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {header || "Whoops, sorry! It seems like this book doesn't exist"}{" "}
      </h1>
      <h2>{!header ? "Want to make it?" : null}</h2>
      {!header ? (
        <Link to={{ pathname: "/books/new", state: { search: newTitle } }}>
          <button className="ui button primary">Hell yes!</button>
        </Link>
      ) : null}
      <Link to="/books">
        <button className="ui button negative">
          {btnText || "Nah, take me back"}
        </button>
      </Link>
    </div>
  );
};
