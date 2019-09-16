import React from "react";
import EditableUsersList from "./EditableUsersList";
import ToggleableUserForm from "./forms/ToggleableUserForm";

class UsersDashBoard extends React.Component {
  handleDeleteClick = id => {
    fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.props.deleteUser(id);
    });
  };

  render() {
    return (
      <div>
        <div className="flex-row">
          <div className="flex-large">
            <ToggleableUserForm
              groupNames={this.props.groupNames}
              onFormSubmit={this.props.onFormSubmit}
            />
          </div>
          <div className="flex-large">
            <h2>View Users</h2>
            <EditableUsersList
              users={this.props.users}
              groupNames={this.props.groupNames}
              onDeleteClick={this.handleDeleteClick}
              onSaveClick={this.props.onSaveClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UsersDashBoard;
