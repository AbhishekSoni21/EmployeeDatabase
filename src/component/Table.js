import React, { Component } from "react";
import "./table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: []
    };
  }

  generateHeaders = data => {
    let tempHeaders = [];
    let headers = Object.keys(data[0]);
    headers.map((value, index) => {
      tempHeaders.push(
        <div className="header-cell" key={index}>
          {value === "emp_id"
            ? "Employee Id"
            : value.charAt(0).toUpperCase() + value.slice(1)}
        </div>
      );
      return true;
    });
    return tempHeaders;
  };

  generateBody = data => {
    console.log("generating body");

    let tempBody = [];
    let tempRow = [];

    data.map((value, index) => {
      let row = Object.values(value);
      let tempVal = [];
      row.map((a, i) =>
        tempVal.push(
          <div className="body-cell" key={i}>
            {a}
          </div>
        )
      );
      tempRow.push(
        <div className="row-container" key={index}>
          {tempVal}
        </div>
      );
    });
    tempBody.push(<div key={tempRow}>{tempRow}</div>);
    return tempBody;
  };

  render() {
    return (
      <div>
        <div className="table-containers">
          <div className="table-header-container">
            {this.props.data.length > 0 ? (
              this.generateHeaders(this.props.data)
            ) : (
              <div />
            )}
          </div>
          <div className="table-body-container">
            {this.props.data.length > 0 ? (
              this.generateBody(this.props.data)
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Table;

Table.defaultProps = {
  data: [
    {
      emp_id: 1,
      name: "Sourav Ganguly",
      age: 30,
      designation: "All rounder",
      salary: 50000,
      address: "Kolkata"
    },
    {
      emp_id: 2,
      name: "Ajit Agarkar",
      age: 25,
      designation: "Bowler",
      salary: 30000,
      address: "Mumbai"
    },
    {
      emp_id: 3,
      name: "Sanjay Bangar",
      age: 30,
      designation: "Batsman",
      salary: 30000,
      address: "Mumbai"
    },
    {
      emp_id: 4,
      name: "Rahul Dravid",
      age: 30,
      designation: "Wicket Keeper",
      salary: 40000,
      address: "Mumbai"
    }
  ]
};
