import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { useModal } from "../hooks/useModal";
import Popup from "./PopUp";
import ActionButtons from "./ActionButtons";
import { DELETE_BOOK_COMMENT } from "../queries/mutations";

//() =>
//

export default ({ comment, likes, query, id, bookId }) => {
  const [deleteComment] = useMutation(DELETE_BOOK_COMMENT);
  const { isShowing, toggle } = useModal();

  let history = useHistory();

  const removeComment = () => {
    deleteComment({
      variables: { id, bookId },
      refetchQueries: [{ query }],
    }).then(() => toggle);
  };

  const iconCheck = () => (likes >= 0 ? "thumbs up" : "thumbs down");

  return (
    <>
      <div class="ui list">
        <div className="item">
          <div style={{ display: "flex" }} className="header">
            {comment}{" "}
            <i
              style={{ cursor: "pointer" }}
              onClick={toggle}
              className="x icon"
            />
            <Popup action={removeComment} isShowing={isShowing} hide={toggle} />
          </div>
          <div>
            <i className={`${iconCheck()} icon`} /> {likes}
          </div>
          <div style={{ width: "50%" }}>
            <ActionButtons parent="comment" query={query} id={id} />
          </div>
        </div>
      </div>
    </>
  );
};
