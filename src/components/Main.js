import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import StaffList from "./staff/StaffList";
import StaffDetail from "./staff/StaffDetail";
import DepartmentList from "./department/DepartmentList";
import SalaryList from "./salary/SalaryList";
import DepartmentDetail from "./department/DepartmentDetail";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  fetchStaffs,
  fetchDepartments,
  postStaff,
  fetchDeleteStaff,
  fetchEditStaff,
} from "../redux/ActionCreators";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }

  render() {
    const HomePage = () => {
      return (
        <div className="text-center">
          <h1>Welcome to React !!</h1>
        </div>
      );
    };

    const StaffDetailById = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          departments={this.props.departments.departments}
        />
      );
    };

    const DepartmentById = ({ match }) => {
      return (
        <DepartmentDetail
          department={
            this.props.departments.departments.filter(
              (department) => department.id === match.params.departmentId
            )[0]
          }
          staffsByDepartment={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.departmentId
          )}
        />
      );
    };

    const Staffs = () => {
      return (
        <StaffList
          staffs={this.props.staffs.staffs}
          departments={this.props.departments.departments}
          postStaff={this.props.postStaff}
          deleteStaff={this.props.deleteStaff}
          editStaff={this.props.editStaff}
        />
      );
    };

    if (this.props.departments.errMess || this.props.staffs.errMess) {
      return <div>Error</div>;
    } else {
      return (
        <div>
          <Header />
          <TransitionGroup>
            <CSSTransition
              key={this.props.location.key}
              classNames="page"
              timeout={300}
            >
              <Switch location={this.props.location}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/staffs" component={Staffs} />
                <Route path="/staffs/:staffId" component={StaffDetailById} />
                <Route
                  exact
                  path="/departments"
                  component={() => (
                    <DepartmentList
                      departments={this.props.departments.departments}
                    />
                  )}
                />
                <Route
                  path="/departments/:departmentId"
                  component={DepartmentById}
                />
                <Route
                  exact
                  path="/salaries"
                  component={() => (
                    <SalaryList staffs={this.props.staffs.staffs} />
                  )}
                />
                <Redirect to="/" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postStaff: (newStaff) => {
    dispatch(postStaff(newStaff));
  },
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  deleteStaff: (staffId) => {
    dispatch(fetchDeleteStaff(staffId));
  },
  editStaff: (editStaff) => {
    dispatch(fetchEditStaff(editStaff));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
