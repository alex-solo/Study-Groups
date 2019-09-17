import React from "react";
import EditableUser from "./EditableUser";

const EditableUsersList = props => {
  const users = props.users.map(user => {
    const userGroups = user.groups.map(group => group.name);
    return (
      <EditableUser
        key={user.id}
        id={user.id}
        name={user.name}
        email={user.email}
        userGroups={userGroups}
        allGroups={props.groupNames}
        onDeleteClick={props.onDeleteClick}
        onSaveClick={props.onSaveClick}
      />
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Groups</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users
        ) : (
          <tr>
            <td colSpan={4}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EditableUsersList;
