import React from "react";
import UserForm from "./UserForm";

class ToggleableUserForm extends React.Component {
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
    if (this.state.isOpen || this.props.isEditable) {
      return (
        <UserForm
          onFormClose={this.handleFormClose}
          groupNames={this.props.groupNames}
          onFormSubmit={this.props.onFormSubmit}
          isEditable={this.props.isEditable}
        />
      );
    } else {
      return (
        <div>
          <button onClick={this.handleFormOpen}>Add user</button>
        </div>
      );
    }
  }
}

export default ToggleableUserForm;
