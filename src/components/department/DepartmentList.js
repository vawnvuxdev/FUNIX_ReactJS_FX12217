import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDepartment({ department }) {
  return (
    <Card className="mb-2 p-1" outline color="info" key={department.id}>
      <Link to={`/departments/${department.id}`} >
        <CardBody>
          <CardTitle>Phòng: {department.name}</CardTitle>
          <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </CardBody>
      </Link>
    </Card>
  );
}

const Department = (props) => {

  return (
    <div className="container">
      <Row>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/departments">Phòng Ban</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Danh sách phòng ban</BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Row className="m-2">
        {props.departments.map((department) => {
          return (
            <Col md="6" lg="4" key={department.id}>
              <RenderDepartment department={department} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Department;
