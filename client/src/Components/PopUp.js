import React, { useState } from "react";
import ReactDOM from "react-dom";

export default ({
  isShowing,
  hide,
  action,
  text,
  buttonText,
  color,
  paragraph,
}) => {
  const [input, setInput] = useState("");

  const renderTextArea = () => (
    <textarea
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Make something beautiful..."
    />
  );
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={hide}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <h1>{text || "Are you sure you want to delete this?"}</h1>
              {paragraph ? renderTextArea() : null}
              <button
                onClick={() => action(input)}
                className={`ui button ${color || "negative"}`}
              >
                {buttonText || "Delete"}
              </button>
              <button onClick={hide} className="ui submit button">
                Go Back
              </button>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
