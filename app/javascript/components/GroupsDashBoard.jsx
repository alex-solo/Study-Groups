import React from "react";
import GroupsTable from "./GroupsTable";
import ToggleableGroupForm from "./forms/ToggleableGroupForm";

const GroupsDashBoard = ({ groups }) => (
  <div>
    <div className="flex-row">
      <div className="flex-large">
        <ToggleableGroupForm />
      </div>
      <div className="flex-large">
        <h2>View Groups</h2>
        <GroupsTable groups={groups} />
      </div>
    </div>
  </div>
);

export default GroupsDashBoard;
