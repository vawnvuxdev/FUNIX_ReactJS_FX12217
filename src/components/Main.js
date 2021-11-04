import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import StaffList from "./staff/StaffList";
import StaffDetail from "./staff/StaffDetail";
import DepartmentList from "./department/DepartmentList";
import SalaryList from "./salary/SalaryList";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Route, Switch, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    const HomePage = () => {
      return (
        <div className="text-center">
          <h1>Welcome to ASsignment 02</h1>
        </div>
      );
    };

    const StaffDetailById = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/staffs"
            component={() => <StaffList staffs={this.state.staffs} />}
          />
          <Route path="/staffs/:staffId" component={StaffDetailById} />
          <Route
            exact
            path="/departments"
            component={() => (
              <DepartmentList departments={this.state.departments} />
            )}
          />
          <Route
            exact
            path="/salaries"
            component={() => <SalaryList staffs={this.state.staffs}/>}
          />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
