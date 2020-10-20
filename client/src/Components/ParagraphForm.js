import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import { ADD_PARAGRAPH_TO_BOOK } from "../queries/mutations";

export default () => {
  const [addParagraph] = useMutation(ADD_PARAGRAPH_TO_BOOK);
  const [input, setInput] = useState("");

  const history = useHistory();
  const params = useParams();

  const { id } = params;

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="ui input"
    >
      <textarea
        type="text"
        placeholder="Write a new paragraph..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <button
          style={{ marginLeft: "2%" }}
          className="ui submit primary button"
          onClick={() =>
            addParagraph({
              variables: { id, content: input },
            }).then(() => history.push(`/books/${id}`))
          }
        >
          Add
        </button>
        <button
          onClick={() => history.push(`/books/${id}`)}
          className="ui button negative"
        >
          Exit
        </button>
      </div>
    </div>
  );
};
