import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import StaffList from "./StaffListComponent";
import { STAFFS } from "../shared/staffs";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default Main;
