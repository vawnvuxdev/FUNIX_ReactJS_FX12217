import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import StaffList from "./staff/StaffList";
import StaffDetail from "./staff/StaffDetail";
import DepartmentList from "./department/DepartmentList";
import SalaryList from "./salary/SalaryList";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {
  constructor(props) {
    super(props)
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
            this.props.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
      );
    };

    const Staffs = () => {
      return (
        <StaffList staffs={this.props.staffs} departments={this.props.departments} />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/staffs" component={Staffs} />
          <Route path="/staffs/:staffId" component={StaffDetailById} />
          <Route exact path="/departments" component={() => (<DepartmentList departments={this.props.departments} />)} />
          <Route exact path="/salaries" component={() => <SalaryList staffs={this.props.staffs} />} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
