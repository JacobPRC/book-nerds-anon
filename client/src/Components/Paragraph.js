import React from "react";

export default (props) => (
  <>
    <p>{props.content}</p>
    <h4>Likes: {props.likes}</h4>
    <h4>{props.createdAt}</h4>
  </>
);
