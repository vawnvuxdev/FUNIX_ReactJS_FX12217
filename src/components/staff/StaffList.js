import React from "react";
import {
  Card,
  CardText,
  CardImg,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderStaff({ staff }) {
  return (
    <Card className="mt-2 p-1" outline color="info">
      <Link to={`/staffs/${staff.id}`}>
        <CardImg top src={staff.image}></CardImg>
        <CardText className="text-center">
          {staff.id + 1} - {staff.name}
        </CardText>
      </Link>
    </Card>
  );
}

const StaffList = (props) => {
  const staffList = props.staffs.map((staff) => {
    return (
      <Col xs="6" md="4" lg="2" key={staff.id}>
        <RenderStaff staff={staff} />
      </Col>
    );
  });

  return (
    <div className="container">
      <Row>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Danh sách nhân viên</BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Row className="mb-3">{staffList}</Row>
    </div>
  );
};

export default StaffList;
