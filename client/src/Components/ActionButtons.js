import React from "react";
import { useMutation } from "@apollo/client";

import {
  LIKE_BOOK,
  UNLIKE_BOOK,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  LIKE_PARAGRAPH,
  UNLIKE_PARAGRAPH,
} from "../queries/mutations";
import Icon from "./Icon";

export default ({ id, query, showCommentForm, parent }) => {
  const [likeBook] = useMutation(LIKE_BOOK);
  const [unlikeBook] = useMutation(UNLIKE_BOOK);
  const [likeComment] = useMutation(LIKE_COMMENT);
  const [unlikeComment] = useMutation(UNLIKE_COMMENT);
  const [likeParagraph] = useMutation(LIKE_PARAGRAPH);
  const [unlikeParagraph] = useMutation(UNLIKE_PARAGRAPH);

  const itsABook = () => {
    return (
      <>
        <Icon
          click={() =>
            likeBook({
              variables: { id },
              refetchQueries: [{ query }],
            })
          }
          icon="thumbs up outline"
          text="Like"
        />
        <Icon
          click={() =>
            unlikeBook({
              variables: { id },
              refetchQueries: [{ query }],
            })
          }
          icon="thumbs down outline"
          text="Unlike"
        />
        <Icon
          click={() => console.log("fuck")}
          icon="paragraph"
          text="Add Paragraph"
        />
        <Icon
          click={() => showCommentForm()}
          icon="comment outline"
          text="Comment"
        />
      </>
    );
  };

  const itsAComment = () => {
    return (
      <>
        <Icon
          click={() =>
            likeComment({
              variables: { id },
              refetchQueries: [{ query }],
            })
          }
          icon="thumbs up outline"
          text="Like"
        />
        <Icon
          click={() =>
            unlikeComment({
              variables: { id },
              refetchQueries: [{ query }],
            })
          }
          icon="thumbs down outline"
          text="unlike"
        />
      </>
    );
  };

  const itsAParagragraph = () => {
    return (
      <>
        <Icon
          click={() =>
            likeParagraph({
              variables: { id },
              refetchQueries: [{ query }],
            })
          }
          icon="thumbs up outline"
          text="Like"
        />
        <Icon
          click={() =>
            unlikeParagraph({
              variables: { id },
              refetchQueries: [{ query }],
            })
          }
          icon="thumbs down outline"
          text="Unlike"
        />
      </>
    );
  };

  const buttonCheck = () => {
    if (parent === "book") return itsABook();
    if (parent === "comment") return itsAComment();
    if (parent === "paragraph") return itsAParagragraph();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "8%",
      }}
    >
      {buttonCheck()}
    </div>
  );
};
