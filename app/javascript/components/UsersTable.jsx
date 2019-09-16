import React from "react";
import User from "./User";

class UsersTable extends React.Component {
  render() {
    const users = this.props.users.map(user => {
      const groups = user.groups.map(group => group.name).join(", ");
      return <User name={user.name} groups={groups} />;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Groups</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{users}</tbody>
      </table>
    );
  }
}

export default UsersTable;
