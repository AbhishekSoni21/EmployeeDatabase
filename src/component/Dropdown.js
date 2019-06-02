import React, { Component } from "react";
import "./Dropdown.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      collapse: "hide",
      enableSearch: false,
      searchList: [],
      searchValue: "",
      mask: ""
    };
  }

  handleSelection = value => {
    let tempArray = this.props.selectedValue;
    if (this.props.selectedValue.indexOf(value) === -1) {
      tempArray.push(value);
    } else {
      tempArray = tempArray.filter(data => data !== value);
      // tempArray.splice(unSelectedValue, 1);
    }
    this.setState(
      {
        selectedValue: tempArray
      },
      this.props.handleFilterSelection(tempArray)
    );
  };

  handleAllClick = () => {
    var item = document.getElementsByName("filter");
    for (var i = 0; i < item.length; i++) {
      if (item[i].type === "checkbox") {
        item[i].checked = true;
      }
    }
    this.setState(
      {
        selectedValue: this.props.filterValue
      },
      this.props.handleFilterSelection(this.props.filterValue)
    );
  };

  handleClearAll = () => {
    var item = document.getElementsByName("filter");
    for (var i = 0; i < item.length; i++) {
      if (item[i].type === "checkbox") {
        item[i].checked = false;
      }
    }
    this.setState(
      {
        selectedValue: []
      },
      this.props.handleFilterSelection([])
    );
  };

  handleAllSelection = () => {
    if (this.props.selectedValue.length === this.props.filterValue.length) {
      console.log("if part of all selection");
      let item = document.getElementsByName("filter");
      for (let i = 0; i < item.length; i++) {
        if (item[i].type === "checkbox") {
          item[i].checked = false;
        }
      }
      this.setState(
        {
          selectedValue: []
        },
        this.props.handleFilterSelection([])
      );
    } else {
      console.log("else part of all selection");

      let item = document.getElementsByName("filter");
      for (let i = 0; i < item.length; i++) {
        if (item[i].type === "checkbox") {
          item[i].checked = true;
        }
      }
      this.setState(
        {
          selectedValue: this.props.filterValue
        },
        this.props.handleFilterSelection(this.props.filterValue)
      );
    }
  };

  handleDropdownToggle = () => {
    if (this.state.collapse.length > 0) {
      this.setState({ collapse: "", mask: "displayNone" });
    } else {
      this.setState({ collapse: "hide" });
    }
  };

  handleOutsideClick = () => {
    this.setState({
      collapse: "hide"
    });
  };

  handleSearch = event => {
    if (
      event.target.value.length > 0 ||
      this.state.searchValue === event.target.value
    ) {
      this.setState({
        enableSearch: true,
        searchValue: event.target.value
      });
    } else {
      this.setState({
        enableSearch: false,
        searchValue: event.target.value
      });
    }

    //   console.log("event", event.target.value);
    //   debugger;
    //   let tempArray = [];
    //   // let reg = "/" + event.target.value + "/gi";
    //   this.props.filterValue.forEach(value => {
    //     var res = value.indexOf(event.target.value);
    //     if (res > 0) {
    //       tempArray.push(value);
    //     }
    //   });
    //   this.setState({
    //     selectedValue: tempArray
    //   });
  };

  handleDomGeneration = () => {
    let tempArr = [];
    if (this.state.enableSearch) {
      this.props.filterValue.map((value, index) => {
        if (
          value.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1
        ) {
          tempArr.push(
            <label className="checkbox-container" key={index}>
              <span>
                <input
                  checked={
                    this.props.selectedValue.indexOf(value) > -1 ? true : false
                  }
                  readOnly
                  type="checkbox"
                  name="filter"
                  onClick={() => this.handleSelection(value)}
                />
                {value}
              </span>
            </label>
          );
        }
        return true;
      });
    } else {
      if (this.props.filterValue.length > 2) {
        tempArr.push(
          <span key="All">
            <input
              readOnly
              type="checkbox"
              name="filter"
              onClick={() => this.handleAllSelection()}
              checked={
                this.props.selectedValue.length ===
                this.props.filterValue.length
                  ? true
                  : false
              }
            />
            {"All"}
          </span>
        );
      } else {
        tempArr.push(<span key="empty" />);
      }
      this.props.filterValue.map((value, index) => {
        tempArr.push(
          <label className="checkbox-container" key={index}>
            <span>
              <input
                checked={
                  this.props.selectedValue.indexOf(value) > -1 ? true : false
                }
                readOnly
                type="checkbox"
                name="filter"
                onClick={() => this.handleSelection(value)}
              />
              {value}
            </span>
          </label>
        );
      });
    }
    return tempArr;
  };

  render() {
    // console.log("this.state.selectedValue", this.state.selectedValue);
    console.log("selectedValue", this.props.selectedValue);

    return (
      <div className="app">
        <div className="label-container">{this.props.dropDownName}</div>
        <div className="filter-value-container-wrapper">
          <div
            className="filter-value-container"
            onClick={this.handleDropdownToggle}
          >
            {this.props.selectedValue.length === this.props.filterValue.length
              ? "(All)"
              : this.props.selectedValue.length > 1
              ? "Multiple Values"
              : this.props.selectedValue.length === 0
              ? "Select a value"
              : this.props.selectedValue[0]}
            {this.state.collapse.length > 0 ? (
              <div className="uparrow">
                <img
                  src={"images/down.png"}
                  alt={"down arrow"}
                  width="20px"
                  height="20px"
                />
              </div>
            ) : (
              <div className="downarrow">
                <img
                  src={"images/up.png"}
                  alt={"up arrow"}
                  width="20px"
                  height="20px"
                />
              </div>
            )}
          </div>
          <div className={"filter-container " + this.state.collapse}>
            {
              <div>
                <input
                  className="search-container"
                  value={this.state.searchValue}
                  onChange={this.handleSearch}
                />
              </div>
            }
            {/* {this.props.filterValue.length > 2 ? (
              <span>
                <input
                  type="checkbox"
                  name="filter"
                  onClick={() => {
                    this.handleAllSelection();
                  }}
                  checked={
                    this.props.selectedValue.length ===
                    this.props.filterValue.length
                      ? true
                      : false
                  }
                />
                {"All"}
              </span>
            ) : (
              <span />
            )}
            {this.props.filterValue.map((value, index) => {
              return (
                <label className="checkbox-container" key={index}>
                  <span>
                    <input
                      type="checkbox"
                      name="filter"
                      onClick={() => this.handleSelection(value)}
                      checked={
                        this.props.selectedValue.indexOf(value) > -1
                          ? true
                          : false
                      }
                    />
                    {value}
                  </span>
                </label>
              );
            })} */}

            {this.handleDomGeneration()}

            <div className="button-container">
              <button onClick={this.handleAllClick}>Select All</button>
              <button onClick={this.handleClearAll}>Clear All</button>
            </div>
          </div>
        </div>
        <div
          className={"frame" + this.state.collapse}
          onClick={this.handleOutsideClick}
        />
      </div>
    );
  }
}

export default Dropdown;

Dropdown.defaultProps = {
  selectedValue: [],
  filterValue: [
    "Australia",
    "India",
    "Sri Lanka",
    "Bangladesh",
    "Nepal",
    "Afganistan",
    "Myanmar",
    "Bhutan",
    "China",
    "Korea",
    "Russia",
    "Israel",
    "South Africa",
    "Ireland",
    "England",
    "Japan"
  ],
  dropDownName: "Default Dropdown Name",
  handleFilterSelection: () => {}
};
