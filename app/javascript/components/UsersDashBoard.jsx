import React from "react";
import UsersTable from "./UsersTable";
import ToggleableUserForm from "./forms/ToggleableUserForm";

class UsersDashBoard extends React.Component {
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
            <UsersTable users={this.props.users} />
          </div>
        </div>
      </div>
    );
  }
}

export default UsersDashBoard;
