import React, { Component } from "react";
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
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from "react-router-dom";

function RenderStaff({ staff }) {
  return (
    <Card className="mt-2 p-1" outline color="info">
      <Link to={`/staffs/${staff.id}`}>
        <CardImg top src={staff.image}></CardImg>
        <CardText className="text-center" tag="h6">
          {staff.id + 1} - {staff.name}
        </CardText>
      </Link>
      <Button size="sm">
        <i className="fa fa-edit"></i>
      </Button>
    </Card>
  );
}

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validDoB = (val) => !((new Date(val)).getFullYear() > 2000);
const validStartDate = (val) => !((new Date(val)).getFullYear() < 2010);

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: this.props.staffs,
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleFormSubmit(values) {
    const newStaff = {
      id: this.props.staffs.length,
      name: values.name,
      doB: values.doB,
      salaryScale: values.salaryScale,
      startDate: values.startDate,
      department: this.props.departments[Number(values.department)],
      annualLeave: values.annualLeave,
      overTime: values.overTime,
      salary: "",
      image: '/assets/images/alberto.png',
    }

    this.props.staffs.push(newStaff);
    this.props.departments[Number(values.department)].numberOfStaff++;
    this.toggleModal();
  }

  handleSearchSubmit(event) {
    const searchResults = this.props.staffs.filter((staff) =>
      staff.name.toLowerCase().includes(this.keyword.value.toLowerCase())
    );
    this.setState({ staffs: searchResults });
    event.preventDefault();
  }

  render() {
    const staffList = this.state.staffs.map((staff) => {
      return (
        <Col xs={6} md={4} lg={2} key={staff.id}>
          <RenderStaff staff={staff} />
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
            <Button onClick={this.toggleModal} className="mt-1">
              <i className="fa fa-plus"></i>
            </Button>
          </Col>

          <Col lg={6} xs={12} md={5}>
            <Form inline className="m-1" onSubmit={this.handleSearchSubmit}>
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

        <Row className="mb-3">{staffList}</Row>

        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.isModalOpen}
          fullscreen="sm"
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>
            Thêm Nhân Viên Mới
          </ModalHeader>
          <LocalForm onSubmit={(values) => this.handleFormSubmit(values)}>
            <ModalBody>
              <Row className="form-group">
                <Label md={3} lg={4} htmlFor="name">
                  Tên
                </Label>
                <Col md={9} lg={8}>
                  <Control.text className="form-control"
                    model=".name"
                    id="name"
                    name="name"
                    validators={{
                      required, minLength: minLength(4)
                    }}
                  />
                </Col>
                <Errors
                  className="text-danger ml-2"
                  model=".name"
                  show="touched"
                  messages={{
                    required: 'Vui lòng điền thông tin !!',
                    minLength: 'Tên phải có ít nhất 4 ký tự !!',
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label md={3} lg={4} htmlFor="doB">
                  Ngày sinh
                </Label>
                <Col md={9} lg={8}>
                  <Control type="date" className="form-control"
                    model=".doB"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    validators={{
                      validDoB
                    }}
                  />
                </Col>
                <Errors
                  className="text-danger ml-2"
                  model=".doB"
                  show="touched"
                  messages={{
                    validDoB: 'Năm sinh của nhân viên không được nhỏ hơn 2000'
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label md={3} lg={4} htmlFor="startDate">
                  Ngày vào công ty
                </Label>
                <Col md={9} lg={8}>
                  <Control type="date" className="form-control"
                    model=".startDate"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    validators={{
                      validStartDate
                    }}
                  />
                </Col>
                <Errors
                  className="text-danger ml-2"
                  model=".startDate"
                  show="touched"
                  messages={{
                    validStartDate: 'Nhân viên không thể vào công ty trước 2010 !!'
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label md={3} lg={4} htmlFor="department">
                  Phòng ban
                </Label>
                <Col md={9} lg={8}>
                  <Control.select className="form-control"
                    model=".department"
                    id="department"
                    name="department"
                    validators={{
                      isNumber
                    }}
                  >
                    <option value="">Chọn phòng ban</option>
                    <option value="0">1. Sale</option>
                    <option value="1">2. HR</option>
                    <option value="2">3. Marketing</option>
                    <option value="3">4. IT</option>
                    <option value="4">5. Finance</option>
                  </Control.select>
                </Col>
                <Errors
                  className="text-danger ml-2"
                  model=".department"
                  show="touched"
                  messages={{
                    isNumber: 'Vui lòng chọn phòng ban !! '
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label md={3} lg={4} htmlFor="salaryScale">
                  Hệ số lương
                </Label>
                <Col md={9} lg={8}>
                  <Control className="form-control"
                    model=".salaryScale"
                    type="number"
                    id="salaryScale"
                    name="salaryScale"
                    defaultValue={1}
                    min={1}
                    step={0.1}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={3} lg={4} htmlFor="annualLeave">
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={9} lg={8}>
                  <Control type="number" className="form-control"
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    defaultValue={12}
                    min={0}
                    max={12}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={3} lg={4} htmlFor="overTime">
                  Số ngày đã làm thêm
                </Label>
                <Col md={9} lg={8}>
                  <Control type="number" className="form-control"
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    defaultValue={0}
                    min={0}
                    step={1}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Row className="form-group">
                <Button color="primary" type="submit" className="mr-2" >
                  Thêm
                </Button>
              </Row>
            </ModalFooter>
          </LocalForm>
        </Modal>
      </div>
    );
  }
}

export default StaffList;
