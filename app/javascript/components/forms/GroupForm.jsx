import React from "react";

const textAreaStyle = {
  resize: "vertical"
};

const GroupForm = props => {
  return (
    <form>
      <label>Group Name</label>
      <input type="text" name="name" value="" />
      <label>Description</label>
      <textarea style={textAreaStyle}></textarea>
      <button>Create group</button>
      <button className="cancel">Cancel</button>
    </form>
  );
};

export default GroupForm;
