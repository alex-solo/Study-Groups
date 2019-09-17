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
    if (this.state.isOpen) {
      return (
        <UserForm
          onFormClose={this.handleFormClose}
          groupNames={this.props.groupNames}
          onFormSubmit={this.props.onFormSubmit}
        />
      );
    } else {
      return (
        <div>
          <button onClick={this.handleFormOpen}>Add User</button>
        </div>
      );
    }
  }
}

export default ToggleableUserForm;
