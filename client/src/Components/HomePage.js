import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <div style={{ textAlign: "center", paddingTop: "5%" }}>
        <h1>Book NeЯds Anon</h1>
        <br />
        <Link to="/books">
          <button className="ui button">Come neЯd out with us!</button>
        </Link>
      </div>
    </>
  );
};
