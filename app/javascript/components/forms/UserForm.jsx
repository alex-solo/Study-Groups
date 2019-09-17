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
    const { name, email, groups } = this.state;
    const isEnabled = name.length > 0 && email.length > 0;
    return (
      <form>
        <h1>Add user</h1>

        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={this.handleNameChange}
        />

        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={this.handleEmailChange}
        />

        <label for="group-select">Available groups:</label>
        <select
          name="groups"
          id="group-select"
          value={groups}
          onChange={this.handleGroupsChange}
          multiple
        >
          {groupNames}
        </select>

        <button disabled={!isEnabled} onClick={this.handleFormSubmit}>
          Create
        </button>
        <button className="cancel" onClick={this.props.onFormClose}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;
