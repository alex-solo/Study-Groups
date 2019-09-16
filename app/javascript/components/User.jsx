import React from "react";

class User extends React.Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id);
  };

  handleEditClick = () => {
    this.props.onEditClick(this.props.id);
  };

  render() {
    const { id, name, email, userGroups } = this.props;
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{userGroups.join(", ")}</td>
        <td>
          <button
            className="button muted-button"
            onClick={this.handleEditClick}
          >
            Edit
          </button>
          <button
            className="button muted-button"
            onClick={this.handleDeleteClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default User;
