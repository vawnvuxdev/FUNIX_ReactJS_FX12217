import React, { useState } from "react";
import {
  Card,
  CardText,
  CardImg,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Input,
  Form,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import StaffFormModal from "./StaffFormModal";

const RenderStaff = ({ staff, deleteStaff, editStaff }) => {
  return (
    <Card className="mt-2 p-1" outline color="info">
      <Link to={`/staffs/${staff.id}`}>
        <CardImg top src={staff.image}></CardImg>
        <CardText className="text-center" tag="h6">
          {staff.name}
        </CardText>
      </Link>
      <ButtonGroup size="sm" className="mt-1 justify-content-center row">
        <Button color="warning" className="col-5" onClick={editStaff}>
          <i className="fa fa-edit"></i>
        </Button>
        <Button color="danger" className="col-5" onClick={deleteStaff}>
          <i className="fa fa-trash"></i>
        </Button>
      </ButtonGroup>
    </Card>
  );
};

const StaffList = (props) => {
  const [isStaffFormOpen, setIsStaffFormOpen] = useState(false);
  const [staffs, setStaffs] = useState(props.staffs);

  const toggleModal = () => {
    setIsStaffFormOpen(!isStaffFormOpen);
  };

  const handleFormSubmit = (values) => {
    console.log(JSON.stringify(values));
    props.postStaff(
      values.name,
      values.doB,
      values.salaryScale,
      values.startDate,
      values.departmentId,
      values.annualLeave,
      values.overTime
    );
    toggleModal();
  };

  const handleSearchSubmit = (event) => {
    const searchResults = props.staffs.filter((staff) =>
      staff.name.toLowerCase().includes(this.keyword.value.toLowerCase())
    );
    setStaffs(searchResults);
    event.preventDefault();
  };

  const staffList = staffs.map((staff) => {
    return (
      <Col xs={6} md={4} lg={2} key={staff.id}>
        <RenderStaff
          staff={staff}
          deleteStaff={() => props.deleteStaff(staff.id)}
          editStaff= {() => props.editStaff(staff)}
        />
      </Col>
    );
  });

  return (
    <div className="container">
      <Row>
        <Col lg={5} xs={10} md={6}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân Viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Danh sách nhân viên</BreadcrumbItem>
          </Breadcrumb>
        </Col>

        <Col lg={1} xs={2} md={1}>
          <Button onClick={toggleModal} className="mt-1">
            <i className="fa fa-plus"></i>
          </Button>
        </Col>

        <Col lg={6} xs={12} md={5}>
          <Form inline className="m-1" onSubmit={handleSearchSubmit}>
            <Input
              className="col col-9 m-1 col-md-9"
              type="text"
              name="keyword"
              id="keyword"
              innerRef={(input) => (this.keyword = input)}
            />
            <Button
              color="primary"
              className="col col-2 col-md-2"
              type="submit"
            >
              <i className="fa fa-search"></i>
            </Button>
          </Form>
        </Col>
      </Row>

      <div className="row mb-3">{staffList}</div>
      <StaffFormModal
        isOpen={isStaffFormOpen}
        toggle={toggleModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default StaffList;
