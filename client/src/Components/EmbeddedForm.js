import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT_TO_BOOK } from "../queries/mutations";

export default ({ showCommentForm, id, query }) => {
  const [addComment] = useMutation(ADD_COMMENT_TO_BOOK);
  const [input, setInput] = useState("");

  const submitComment = () => {
    return addComment({
      variables: { id, comment: input },
      refetchQueries: [{ query }],
    })
      .then(() => setInput(""))
      .then(() => showCommentForm());
  };

  return (
    <div className="ui input">
      <input
        type="text"
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") return submitComment();
        }}
      />
      <button
        style={{ marginLeft: "2%" }}
        className="ui submit primary button"
        onClick={() => submitComment()}
      >
        Add
      </button>
      <i
        className="x icon"
        onClick={() => showCommentForm()}
        style={{ fontSize: "2rem", cursor: "pointer", paddingLeft: "2%" }}
      />
    </div>
  );
};
