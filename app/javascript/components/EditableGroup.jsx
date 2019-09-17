import React from "react";
import Group from "./Group";
import GroupEditForm from "./forms/GroupEditForm";

class EditableGroup extends React.Component {
  state = {
    isEditing: false
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleCancelClick = () => {
    this.closeForm();
  };

  handleSaveClick = (id, name, description) => {
    this.props.onSaveClick(id, name, description);
    this.setState({ isEditing: false });
  };

  openForm = () => {
    this.setState({ isEditing: true });
  };

  closeForm = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { id, name, description, count } = this.props;
    if (this.state.isEditing) {
      return (
        <GroupEditForm
          id={id}
          name={name}
          count={count}
          description={description}
          onCancelClick={this.handleCancelClick}
          onSaveClick={this.handleSaveClick}
        />
      );
    } else {
      return (
        <Group
          id={id}
          name={name}
          description={description}
          count={count}
          onDeleteClick={this.props.onDeleteClick}
          onEditClick={this.handleEditClick}
          onCancelClick={this.handleCancelClick}
        />
      );
    }
  }
}

export default EditableGroup;
