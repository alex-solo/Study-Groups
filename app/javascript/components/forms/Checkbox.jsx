import React from "react";

class Checkbox extends React.Component {
  handleCheckboxChange = e => {
    this.props.onCheckboxChange(e, this.props.label);
  };

  render() {
    return (
      <div>
        <label key={this.props.key} className="checkbox-container">
          <input type="checkbox" onChange={this.handleCheckboxChange} />
          <span className="checkmark"></span>
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
