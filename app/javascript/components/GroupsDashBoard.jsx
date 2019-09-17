import React from "react";
import EditableGroupsList from "./EditableGroupsList";
import ToggleableGroupForm from "./forms/ToggleableGroupForm";

const GroupsDashBoard = props => (
  <div>
    <div className="flex-row">
      <div className="flex-large">
        <ToggleableGroupForm
          groups={props.groups}
          onFormSubmit={props.onFormSubmit}
        />
      </div>

      <div className="flex-large">
        <h2>View Groups</h2>
        <EditableGroupsList
          groups={props.groups}
          onDeleteClick={props.onDeleteClick}
          onSaveClick={props.onSaveClick}
        />
      </div>
    </div>
  </div>
);

export default GroupsDashBoard;
