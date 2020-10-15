import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { useModal } from "../hooks/useModal";
import Popup from "./PopUp";
import ActionButtons from "./ActionButtons";
import { DELETE_PARAGRAPH } from "../queries/mutations";

export default ({ content, likes, createdAt, id, query, bookId }) => {
  const [deleteParagraph] = useMutation(DELETE_PARAGRAPH);
  const { isShowing, toggle } = useModal();

  let history = useHistory();

  const removeParagraph = () => {
    deleteParagraph({
      variables: { id, bookId },
      refetchQueries: { query },
    }).then(() => history.push(`/books/${bookId}`));
  };

  return (
    <>
      <p>
        {content}{" "}
        <i style={{ cursor: "pointer" }} className="x icon" onClick={toggle} />
        <Popup action={removeParagraph} isShowing={isShowing} hide={toggle} />
      </p>
      <h4>Likes: {likes}</h4>
      <h4>{createdAt}</h4>
      <ActionButtons id={id} query={query} parent="paragraph" />
    </>
  );
};
