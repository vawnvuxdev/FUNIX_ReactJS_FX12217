import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

function RenderStaffDetail({ staff, departments }) {
  return (
    <Card outline color="info" className="mb-2">
      <Row className="p-2">
        <Col md="4" lg="3">
          <CardImg src={staff.image}></CardImg>
        </Col>
        <Col md="8" lg="9" className="mt-2">
          <CardTitle tag="h4">Họ và tên: {staff.name}</CardTitle>
          <div>
            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")} </p>
            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
            <p>Phòng ban: {(departments.filter((department) => department.id === staff.departmentId))[0].name}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày đã làm thêm: {staff.overTime}</p>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

const StaffDetail = (props) => {
  return (
    <div className="container">
      <Row>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <RenderStaffDetail staff={props.staff} departments={props.departments} />
    </div>
  );
};

export default StaffDetail;
