import React, { Component } from "react";
import {
  Card,
  CardText,
  CardTitle,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem, ButtonGroup, Button
} from "reactstrap";
import { Link } from "react-router-dom";

const RenderStaffSalary = ({ staff }) => {

  const salary = Math.round(staff.salaryScale * 3000000 + staff.overTime * 200000);

  return (
    <Card color="info" outline className="m-2 p-2">
      <CardTitle tag="h5" className="text-center">
        {staff.name}
      </CardTitle>
      <div className="m-2">
        <p>Mã nhân viên: {staff.id}</p>
        <p>Hệ số lương: {staff.salaryScale}</p>
        <p>Số giờ làm thêm: {staff.overTime}</p>
      </div>
      <Card color="info" inverse className="p-2 m-2">
        <CardText>
          Lương: {salary} VND
        </CardText>
      </Card>
    </Card>
  );
}


class SalaryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sortBy: null,
    }
  }

  SortStaffs(staffs, sortBy) {
    return staffs.sort((s1, s2) => {
      if (sortBy === "salary") {
        const salary1 = Math.round(s1.salaryScale * 3000000 + s1.overTime * 200000);
        const salary2 = Math.round(s2.salaryScale * 3000000 + s2.overTime * 200000);
        return salary1 - salary2;
      } else {
        return s1[sortBy] - s2[sortBy];
      }
    })
  }

  render() {
    const salaryList = this.SortStaffs(this.props.staffs, this.state.sortBy).map((staff) => {
      return (
        <Col md={6} lg={4} key={staff.id}>
          <RenderStaffSalary staff={staff}></RenderStaffSalary>
        </Col>
      );
    });
    return (
      <div className="container" >
        <Row>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/salaries">Bảng Lương</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Danh sách lương nhân viên</BreadcrumbItem>
          </Breadcrumb>
        </Row>
        <Row>
          <h5>Sắp xếp theo</h5>
          <ButtonGroup size="sm" className="ml-1">
            <Button
              onClick={() => this.setState({ sortBy: "id" })}
            >
              Mặc định
            </Button>
            <Button
              onClick={() => this.setState({ sortBy: "salary" })}
            >
              Lương
            </Button>
            <Button
              onClick={() => this.setState({ sortBy: "overTime" })}
            >
              Giờ làm thêm
            </Button>
          </ButtonGroup>
        </Row>
        <Row className="mb-2">{salaryList}</Row>
      </div>
    );

  }
};

export default SalaryList;
