import React from "react";

class UserEditForm extends React.Component {
  state = {
    name: this.props.name || "",
    email: this.props.email || "",
    userGroups: this.props.userGroups || []
  };

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id);
  };

  handleEditClick = () => {
    this.props.onEditClick(this.props.id);
  };

  handleSave = () => {
    const { name, email, userGroups } = this.state;
    this.props.onSaveClick(this.props.id, name, email, userGroups);
  };

  handleGroupsChange = e => {
    const values = [...e.target.options]
      .filter(o => o.selected)
      .map(o => o.value);
    this.setState({ userGroups: values });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { id, name, email, userGroups } = this.state;
    const groupNames = this.props.allGroups.map(groupName => {
      return (
        <option key={groupName} value={groupName}>
          {groupName}
        </option>
      );
    });
    return (
      <tr key={id}>
        <td>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
          />
        </td>
        <td>
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleEmailChange}
          />
        </td>
        <td>
          <select
            name="groups"
            id="group-select"
            value={userGroups}
            onChange={this.handleGroupsChange}
            multiple
          >
            {groupNames}
          </select>
        </td>
        <td>
          <button className="button muted-button" onClick={this.handleSave}>
            Save
          </button>
          <button className="cancel" onClick={this.props.onCancelClick}>
            Cancel
          </button>
        </td>
      </tr>
    );
  }
}

export default UserEditForm;
