import React from "react";
import EditableGroup from "./EditableGroup";

const EditableGroupsList = props => {
  const groups = props.groups.map(group => {
    return (
      <EditableGroup
        key={group.id}
        id={group.id}
        name={group.name}
        count={group.users.length}
        description={group.description}
        onDeleteClick={props.onDeleteClick}
        onSaveClick={props.onSaveClick}
      />
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Description</th>
          <th>Members</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.length > 0 ? (
          groups
        ) : (
          <tr>
            <td colSpan={4}>No groups</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EditableGroupsList;
