import React from "react";

class GroupEditForm extends React.Component {
  state = {
    name: this.props.name || "",
    description: this.props.description || ""
  };

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id);
  };

  handleEditClick = () => {
    this.props.onEditClick(this.props.id);
  };

  handleSave = () => {
    const { name, description } = this.state;
    this.props.onSaveClick(this.props.id, name, description);
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    const { id, name, description } = this.state;

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
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={this.handleDescriptionChange}
          />
        </td>
        <td>{this.props.count}</td>
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

export default GroupEditForm;
