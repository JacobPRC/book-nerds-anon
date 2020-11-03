import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_BOOK_TITLE, EDIT_PARAGRAPH } from "../queries/mutations";

export default ({ title, hide, id, parent }) => {
  const [input, setInput] = useState("");
  const [editTitle] = useMutation(EDIT_BOOK_TITLE);
  const [editParagraph] = useMutation(EDIT_PARAGRAPH);

  useEffect(() => (title ? setInput(title) : setInput("")), []);

  const clickCheck = () => {
    if (parent === "paragraph") {
      return editParagraph({ variables: { id, content: input } }).then(() =>
        hide()
      );
    }
    return editTitle({ variables: { id, title: input } }).then(() => hide());
  };

  const inputOrTextArea = () => {
    if (parent === "paragraph") {
      return (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") return clickCheck();
          }}
        />
      );
    }
    return (
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") return clickCheck();
        }}
      />
    );
  };

  return (
    <div style={{ display: "flex" }}>
      {inputOrTextArea()}
      <button className="ui primary submit button" onClick={() => clickCheck()}>
        Submit
      </button>
      <i className="x icon" onClick={() => hide()} />
    </div>
  );
};
