import React from "react";

export default (props) => (
  <>
    <div class="ui list">
      <div className="item">
        <div className="header">{props.comment}</div>
        likes: {props.likes}
      </div>
    </div>
  </>
);
