import React from "react";

const textAreaStyle = {
  resize: "vertical"
};

class GroupForm extends React.Component {
  state = {
    name: this.props.name || "",
    description: this.props.description || ""
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, description } = this.state;
    this.props.onFormSubmit(name, description);
    this.props.onFormClose();
    this.setState({
      name: "",
      description: ""
    });
  };

  render() {
    const { name, description } = this.state;
    const isEnabled = name.length > 0;
    return (
      <form>
        <label>Group Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleNameChange}
        />
        <label>Description</label>
        <textarea
          style={textAreaStyle}
          value={description}
          onChange={this.handleDescriptionChange}
        ></textarea>
        <button disabled={!isEnabled} onClick={this.handleFormSubmit}>
          Create group
        </button>
        <button className="cancel" onClick={this.props.onFormClose}>
          Cancel
        </button>
      </form>
    );
  }
}

export default GroupForm;
