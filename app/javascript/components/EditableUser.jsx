import React from "react";
import User from "./User";
import UserEditForm from "./UserEditForm";

class EditableUser extends React.Component {
  state = {
    isEditing: false
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleCancelClick = () => {
    this.closeForm();
  };

  handleSaveClick = (id, name, email, groups) => {
    this.props.onSaveClick(id, name, email, groups);
    this.setState({ isEditing: false });
  };

  openForm = () => {
    this.setState({ isEditing: true });
  };

  closeForm = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { id, name, email, userGroups } = this.props;
    if (this.state.isEditing) {
      return (
        <UserEditForm
          id={id}
          name={name}
          email={email}
          userGroups={userGroups}
          allGroups={this.props.allGroups}
          onSaveClick={this.handleSaveClick}
          onCancelClick={this.handleCancelClick}
        />
      );
    } else {
      return (
        <User
          id={id}
          name={name}
          email={email}
          userGroups={userGroups}
          onDeleteClick={this.props.onDeleteClick}
          onEditClick={this.handleEditClick}
        />
      );
    }
  }
}

export default EditableUser;
