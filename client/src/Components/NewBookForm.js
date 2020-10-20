import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";

import { ADD_BOOK } from "../queries/mutations";

export default () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [about, setAbout] = useState("");
  const [addBook] = useMutation(ADD_BOOK);

  let history = useHistory();
  let location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    if (document.querySelector("#checkbox").checked) {
      addBook({ variables: { title, genre, about } });
      return history.push("/books");
    }
    return alert("You need to agree to be a NeЯd ya nerd!");
  };

  useEffect(
    () => (location.state ? setTitle(location.state.search) : setTitle("")),
    []
  );

  return (
    <>
      <form className="ui form segment">
        <p>Create a NeЯdy Book</p>
        <div className="two fields">
          <div className="field">
            <label>Title</label>
            <input
              value={location.state ? location.state.search : title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              name="title"
              type="text"
            />
          </div>
          <div className="field">
            <label>Genre</label>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Genre"
              name="genre"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label>About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell the world what your masterpiece will be about!"
            name="about"
          />
        </div>
        <div className="inline field">
          <div className="ui checkbox">
            <input id="checkbox" type="checkbox" name="terms" />
            <label>I agree to be an anonymous NeЯd</label>
          </div>
        </div>
        <div className="ui primary submit button" onClick={(e) => onSubmit(e)}>
          Submit
        </div>
        <div
          className="ui negative submit button"
          onClick={() => history.goBack()}
        >
          Exit
        </div>
        <div className="ui error message"></div>
      </form>
    </>
  );
};
