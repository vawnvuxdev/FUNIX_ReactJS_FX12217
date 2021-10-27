import "./App.css";
import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
// import Menu from "./components/MenuComponsent";
import StaffList from "./components/StaffListComponent";
import { DISHES } from "./shared/dishes";
import { STAFFS } from "./shared/staffs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      staffs: STAFFS,
    };
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container-fluid">
            <NavbarBrand href="/">ReactJS - Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        {/* <Menu dishes={this.state.dishes}/> */}
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
