import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <button onClick={this.handleClick} className="button">
        {this.props.name}
      </button>
    );
  }
}

export default Button;
