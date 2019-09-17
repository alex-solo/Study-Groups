import React from "react";

class Group extends React.Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id);
  };

  handleEditClick = () => {
    this.props.onEditClick(this.props.id);
  };

  componentDidUpdate = prevProps => {
    if (this.props.count !== prevProps.count) {
      this.forceUpdate();
    }
  };

  render() {
    const { id, name, description, count } = this.props;
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{description}</td>
        <td>{count}</td>
        <td>
          <button
            className="button muted-button"
            onClick={this.handleEditClick}
          >
            Edit
          </button>
          <button
            className="button muted-button"
            onClick={this.handleDeleteClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Group;
