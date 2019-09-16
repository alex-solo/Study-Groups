import React from "react";

class UserForm extends React.Component {
  state = {
    name: this.props.name || "",
    email: this.props.email || "",
    groups: this.props.groups || []
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleGroupsChange = e => {
    const values = [...e.target.options]
      .filter(o => o.selected)
      .map(o => o.value);
    console.log(values);
    this.setState({ groups: values });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, email, groups } = this.state;
    this.props.onFormSubmit(name, email, groups);
    this.setState({
      name: "",
      email: "",
      groups: []
    });
  };

  render() {
    const groupNames = this.props.groupNames.map(groupName => {
      return <option value={groupName}>{groupName}</option>;
    });
    return (
      <form>
        <h1>Add user</h1>

        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />

        <label for="group-select">Select one or more groups:</label>
        <select
          name="groups"
          id="group-select"
          value={this.state.groups}
          onChange={this.handleGroupsChange}
          multiple
        >
          {groupNames}
        </select>

        <button onClick={this.handleFormSubmit}>Create</button>
        <button className="cancel" onClick={this.props.onFormClose}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;
