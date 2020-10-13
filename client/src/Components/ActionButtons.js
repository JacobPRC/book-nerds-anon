import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { LIKE_BOOK, UNLIKE_BOOK } from "../queries/mutations";

export default (props) => {
  const [likeHover, setLikeHover] = useState(false);
  const [unlikeHover, setUnlikeHover] = useState(false);
  const [commentHover, setCommentHover] = useState(false);
  const [pHover, setPHover] = useState(false);

  const [likeBook] = useMutation(LIKE_BOOK);
  const [unlikeBook] = useMutation(UNLIKE_BOOK);
  return (
    <div
      className="actions"
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "8%",
        cursor: "pointer",
      }}
    >
      <div
        onMouseEnter={() => setLikeHover(!likeHover)}
        onMouseLeave={() => setLikeHover(!likeHover)}
        style={likeHover ? { backgroundColor: "gray" } : {}}
      >
        {" "}
        <i
          className="thumbs up outline icon"
          onClick={() =>
            likeBook({
              variables: { id: props.id },
              refetchQueries: [
                {
                  query: props.query,
                },
              ],
            })
          }
        />{" "}
        Like
      </div>
      <div
        onMouseEnter={() => setUnlikeHover(!unlikeHover)}
        onMouseLeave={() => setUnlikeHover(!unlikeHover)}
        style={unlikeHover ? { backgroundColor: "gray" } : {}}
      >
        {" "}
        <i
          className="thumbs down outline icon"
          onClick={() =>
            unlikeBook({
              variables: { id: props.id },
              refetchQueries: [
                {
                  query: props.query,
                },
              ],
            })
          }
        />{" "}
        Dislike
      </div>
      <div
        onMouseEnter={() => setCommentHover(!commentHover)}
        onMouseLeave={() => setCommentHover(!commentHover)}
        style={commentHover ? { backgroundColor: "gray" } : {}}
      >
        {" "}
        <i className="paragraph icon" /> Add New Paragraph
      </div>
      <div
        onMouseEnter={() => setPHover(!pHover)}
        onMouseLeave={() => setPHover(!pHover)}
        style={pHover ? { backgroundColor: "gray" } : {}}
      >
        {" "}
        <i className="comment outline icon" /> Comment
      </div>
    </div>
  );
};
