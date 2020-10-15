import { extendSchemaImpl } from "graphql/utilities/extendSchema";
import React from "react";

export default ({ enter, exit, click, icon, hover, text }) => {
  return (
    <div style={{ cursor: "pointer" }} onClick={() => click()}>
      {" "}
      <div className="ui icon button" data-tooltip={text} data-inverted="">
        <i className={`${icon} icon`}></i>
      </div>
    </div>
  );
};
