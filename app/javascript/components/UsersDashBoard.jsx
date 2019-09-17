import React from "react";
import EditableUsersList from "./EditableUsersList";
import ToggleableUserForm from "./forms/ToggleableUserForm";

const UsersDashBoard = props => (
  <div>
    <div className="flex-row">
      <div className="flex-large">
        <ToggleableUserForm
          groupNames={props.groupNames}
          onFormSubmit={props.onFormSubmit}
        />
      </div>
      <div className="flex-large">
        <h2>View Users</h2>
        <EditableUsersList
          users={props.users}
          groupNames={props.groupNames}
          onDeleteClick={props.onDeleteClick}
          onSaveClick={props.onSaveClick}
        />
      </div>
    </div>
  </div>
);

export default UsersDashBoard;
