import React from "react";

const User = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.groups}</td>
      <td>
        <button className="button muted-button">Edit</button>
        <button className="button muted-button">Delete</button>
      </td>
    </tr>
  );
};

export default User;
