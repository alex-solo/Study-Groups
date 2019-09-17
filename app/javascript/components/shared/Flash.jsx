import React from "react";

const Flash = props => {
  let type = props.flash.type;
  let message = props.flash.message;

  return (
    type &&
    message && (
      <div className={`alert alert-${type}`}>
        <span className="close" onClick={props.onFlashClose}>
          <strong>X</strong>
        </span>
        <p>{message}</p>
      </div>
    )
  );
};

export default Flash;
