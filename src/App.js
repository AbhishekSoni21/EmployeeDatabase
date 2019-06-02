import React, { Component } from "react";
import Dropdown from "./component/Dropdown";
import InputField from "./component/InputField";
import Button from "./component/Button";
import Table from "./component/Table";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designationData: [],
      salaryData: [],
      addressData: [],
      name: "",
      age: "",
      selectedDesignation: [],
      selectedSalary: [],
      selectedPlace: [],
      mainData: [],
      tableData: []
    };
  }

  handleNameChange = value => {
    this.setState({
      name: value
    });
  };

  handleAgeChange = value => {
    this.setState({
      age: value
    });
  };

  handleDesignationChange = value => {
    this.setState({
      selectedDesignation: value
    });
  };

  handleSalaryChange = value => {
    this.setState({
      selectedSalary: value
    });
  };

  handlePlaceChange = value => {
    this.setState({
      selectedPlace: value
    });
  };

  handleClear = () => {
    this.setState(
      {
        name: "",
        age: "",
        selectedDesignation: [],
        selectedSalary: [],
        selectedPlace: [],
        isSubmitClicked: false
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleSubmit = () => {
    if (
      this.state.name.length !== 0 ||
      this.state.age.length !== 0 ||
      this.state.selectedDesignation.length !== 0 ||
      this.state.selectedPlace.length !== 0 ||
      this.state.selectedSalary.length !== 0
    ) {
      let tempObj = {};
      if (this.state.name.length !== 0) {
        tempObj["name"] = this.state.name;
      }
      if (this.state.age.length !== 0) {
        tempObj["age"] = this.state.age;
      }
      if (this.state.selectedDesignation.length !== 0) {
        tempObj["designation"] = this.state.selectedDesignation;
      }
      if (this.state.selectedPlace.length !== 0) {
        tempObj["address"] = this.state.selectedPlace;
      }
      if (this.state.selectedSalary.length !== 0) {
        tempObj["salary"] = this.state.selectedSalary;
      }

      let tempArr = this.state.mainData.filter(data => {
        return Object.keys(tempObj).every(item => {
          debugger;
          console.log("temprr", tempArr);
          if (tempObj[item].length < 2 || (item === "name" || item === "age")) {
            console.log("single value");

            var name = tempObj[item].toString().toLowerCase();
            if (
              data[item]
                .toString()
                .toLowerCase()
                .indexOf(name) > -1
            ) {
              return true;
            }
          } else {
            console.log("multiple value");

            var list = tempObj[item];
            console.log("list", list);
            return list.some(val => {
              if (
                val.toString().toLowerCase() ===
                data[item].toString().toLowerCase()
              ) {
                return true;
              }
            });
          }

          // if (item === "name") {
          //   var name = tempObj[item].toString().toLowerCase();
          //   if (
          //     data[item]
          //       .toString()
          //       .toLowerCase()
          //       .indexOf(name) > -1
          //   ) {
          //     return true;
          //   }
          // } else {
          //   if (tempObj[item].length === 1) {
          //     if (
          //       data[item].toString().toLowerCase() ===
          //       tempObj[item].toString().toLowerCase()
          //     ) {
          //       return true;
          //     }
          //   } else {
          //     tempObj[item].some(val => {
          //       console.log("val", val);
          //       if (
          //         data[item].toString().toLowerCase() ===
          //         val.toString().toLowerCase()
          //       ) {
          //         return true;
          //       }
          //     });
          //   }
          // }
        });
      });

      console.log("if part", tempObj);
      this.setState({
        isSubmitClicked: true,
        tableData: tempArr
      });
    } else {
      console.log("else part");

      this.setState({
        isSubmitClicked: true,
        tableData: this.state.mainData
      });
    }
    // let tempMainData = [];
    // if (this.state.mainData.length > 0) {
    //   //For name filter
    //   if (this.state.name.length > 0) {
    //     console.log("name filter", this.state.name);

    //     this.state.mainData.map(data => {
    //       if (
    //         data.name.toLowerCase().indexOf(this.state.name.toLowerCase()) > -1
    //       ) {
    //         tempMainData.push(data);
    //       }
    //     });
    //     this.setState({
    //       mainData: tempMainData,
    //       isSubmitClicked: true
    //     });
    //   }

    //   //For age filter
    //   else if (this.state.age.length > 0) {
    //     let age = this.state.age;
    //     console.log("age filter", this.state.age);

    //     this.state.mainData.map(data => {
    //       if (data.age.toString() === this.state.age) {
    //         tempMainData.push(data);
    //       }
    //     });
    //     this.setState({
    //       mainData: tempMainData,
    //       isSubmitClicked: true
    //     });
    //   }

    //   //for designation filter
    //   else if (this.state.selectedDesignation.length > 0) {
    //     console.log(
    //       "selectedDesignation filter",
    //       this.state.selectedDesignation
    //     );
    //     let selectedDesignation = this.state.selectedDesignation;

    //     selectedDesignation.map(data =>
    //       this.state.mainData.map(value => {
    //         if (value.designation.toLowerCase() === data.toLowerCase()) {
    //           tempMainData.push(value);
    //         }
    //       })
    //     );
    //     this.setState({
    //       mainData: tempMainData,
    //       isSubmitClicked: true
    //     });

    //     // this.state.mainData.map(data => {
    //     //   if (data.age.toString() === age) {
    //     //     tempMainData.push(data);
    //     //   }
    //     // });
    //     // this.setState({
    //     //   mainData: tempMainData,
    //     //   isSubmitClicked: true
    //     // });
    //   }

    //   //for Salary filter
    //   else if (this.state.selectedSalary.length > 0) {
    //     console.log("selectedSalary filter", this.state.selectedSalary);
    //     let selectedSalary = this.state.selectedSalary;

    //     selectedSalary.map(data =>
    //       this.state.mainData.map(value => {
    //         if (value.salary === data) {
    //           tempMainData.push(value);
    //         }
    //       })
    //     );
    //     this.setState({
    //       mainData: tempMainData,
    //       isSubmitClicked: true
    //     });
    //   }

    //   //for Place filter
    //   else if (this.state.selectedPlace.length > 0) {
    //     console.log("selectedPlace filter", this.state.selectedPlace);
    //     let selectedPlace = this.state.selectedPlace;

    //     selectedPlace.map(data =>
    //       this.state.mainData.map(value => {
    //         if (value.address.toLowerCase() === data.toLowerCase()) {
    //           tempMainData.push(value);
    //         }
    //       })
    //     );
    //     this.setState({
    //       mainData: tempMainData,
    //       isSubmitClicked: true
    //     });
    //   } else {
    //     this.setState({
    //       isSubmitClicked: true
    //     });
    //   }
    // }
  };

  fetchData = async () => {
    let tempDesignationData = [],
      tempSalaryData = [],
      tempAddressData = [];

    let resposne = await fetch("./json/employee.json");
    let data = await resposne.json();

    data.map(value => {
      if (tempDesignationData.indexOf(value.designation) === -1) {
        tempDesignationData.push(value.designation);
      }
      if (tempSalaryData.indexOf(value.salary) === -1) {
        tempSalaryData.push(value.salary);
      }
      if (tempAddressData.indexOf(value.address) === -1) {
        tempAddressData.push(value.address);
      }
      return true;
    });
    this.setState({
      mainData: data,
      designationData: tempDesignationData,
      salaryData: tempSalaryData,
      addressData: tempAddressData
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="">
        <div className="filter-Container">
          <h2 className="header-label">Employee Database</h2>
          <div className="dashboard-wrapper">
            <div className="col1">
              <InputField
                inputField={"Name"}
                handleChange={this.handleNameChange}
                placeholder="Enter a name"
                value={this.state.name}
              />
              <InputField
                inputField={"Age"}
                handleChange={this.handleAgeChange}
                placeholder="Enter a age"
                value={this.state.age}
              />
              <Dropdown
                dropDownName={"Designation"}
                filterValue={this.state.designationData}
                selectedValue={this.state.selectedDesignation}
                handleFilterSelection={this.handleDesignationChange}
              />
            </div>
            <div className="col2">
              <Dropdown
                dropDownName={"Salary"}
                filterValue={this.state.salaryData}
                selectedValue={this.state.selectedSalary}
                handleFilterSelection={this.handleSalaryChange}
              />
              <Dropdown
                dropDownName={"Place"}
                filterValue={this.state.addressData}
                selectedValue={this.state.selectedPlace}
                handleFilterSelection={this.handlePlaceChange}
              />
            </div>
          </div>
          <div className="button-container-wrapper">
            <Button name={"Clear"} handleClick={this.handleClear} />
            <Button name={"Submit"} handleClick={this.handleSubmit} />
          </div>
        </div>
        <div className="table-container-wrapper">
          {console.log(
            "this.state.isSubmitClicked",
            this.state.isSubmitClicked
          )}
          {console.log("this.state.tableData", this.state.tableData)}
          {this.state.isSubmitClicked ? (
            this.state.tableData.length === 0 ? (
              "No Data Found"
            ) : (
              <Table data={this.state.tableData} />
            )
          ) : (
            ""
          )}
          {/* <Table data={this.state.mainData} /> */}
        </div>
      </div>
    );
  }
}

export default App;
