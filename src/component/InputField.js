import React, { Component } from "react";
import "./inputField.css";

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleChange = event => {
    let tempName = event.target.value;
    this.setState(
      {
        value: tempName
      },
      () => {
        this.props.handleChange(this.state.value);
      }
    );
  };
  render() {
    return (
      <div className="input_field_container_wrapper">
        <div className="label_container">{this.props.inputField}</div>
        <input
          placeholder={this.props.placeholder}
          className="input_field_container"
          onChange={this.handleChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default InputField;

InputField.defaultProps = {
  InputField: "Enter a label name",
  placeholder: "Change the place holder"
};
