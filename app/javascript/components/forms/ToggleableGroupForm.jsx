import React from "react";
import GroupForm from "./GroupForm";

class ToggleableGroupForm extends React.Component {
  state = {
    isOpen: false
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <GroupForm
          onFormClose={this.handleFormClose}
          groupNames={this.props.groupNames}
        />
      );
    } else {
      return (
        <div>
          <button onClick={this.handleFormOpen}>Add Group</button>
        </div>
      );
    }
  }
}

export default ToggleableGroupForm;
