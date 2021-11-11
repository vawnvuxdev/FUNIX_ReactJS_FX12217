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
  FormGroup,
  FormFeedback,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
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

// function RenderNewStaffFormCoBan({ staff }) {
//   return (
//     <div></div>
//   )
// }
// function RenderNewStaffFormNangCao({ staff }) {
//   return (
//     <div></div>
//   )
// }

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: this.props.staffs,
      isModalOpen: false,
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "",
      annualLeave: 12,
      overTime: 0,
      touched: {
        name: false,
        doB: false,
        startDate: false,
        department: false,
      }
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  validate(name, doB, startDate, department) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      department: "",
    };

    let inputDoB = new Date(this.state.doB);
    let inputStartDate = new Date(this.state.startDate);
    let currentTime = new Date();

    if (this.state.touched.name && this.state.name.length < 5) {
      errors.name = "Tên bạn phải có ít nhất 5 kí tự !!";
    }

    if (this.state.touched.doB && inputDoB.getFullYear() > 2000) {
      errors.doB = "Năm sinh của nhân viên phải nhỏ hơn 2000 !!";
    }

    if (this.state.touched.startDate && inputStartDate > currentTime) {
      errors.startDate = "Thời gian bắt đầu làm tại công ty không hợp lệ !!";
    }

    if (this.state.touched.department && this.state.department === '') {
      errors.department = "Vui lòng chọn phòng ban mà bạn làm việc !!";
    }

    return errors;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleFormInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(event) {
    let newStaff = {
      id: this.state.staffs.length,
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: this.props.departments[Number(this.state.department)],
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: "/assets/images/alberto.png",
    };

    this.props.staffs.push(newStaff);

    event.preventDefault();

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

    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.department
    );

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
          <Form onSubmit={this.handleFormSubmit}>
            <ModalBody>
              <FormGroup row>
                <Label md={3} lg={4} htmlFor="name">
                  Tên
                </Label>
                <Col md={9} lg={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onChange={this.handleFormInputChange}
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} lg={4} htmlFor="doB">
                  Ngày sinh
                </Label>
                <Col md={9} lg={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleFormInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} lg={4} htmlFor="startDate">
                  Ngày vào công ty
                </Label>
                <Col md={9} lg={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleFormInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} lg={4} htmlFor="department">
                  Phòng ban
                </Label>
                <Col md={9} lg={8}>
                  <Input
                    type="select"
                    id="department"
                    name="department"
                    value={this.state.department}
                    valid={errors.department === ""}
                    invalid={errors.department !== ""}
                    onBlur={this.handleBlur("department")}
                    onChange={this.handleFormInputChange}
                  >
                    <option value="">Chọn phòng ban</option>
                    <option value="0">1. Sale</option>
                    <option value="1">2. HR</option>
                    <option value="2">3. Marketing</option>
                    <option value="3">4. IT</option>
                    <option value="4">5. Finance</option>
                  </Input>
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} lg={4} htmlFor="salaryScale">
                  Hệ số lương
                </Label>
                <Col md={9} lg={8}>
                  <Input
                    type="number"
                    min={1}
                    step={0.1}
                    id="salaryScale"
                    name="salaryScale"
                    onChange={this.handleFormInputChange}
                    value={this.state.salaryScale}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} lg={4} htmlFor="annualLeave">
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={9} lg={8}>
                  <Input
                    type="number"
                    id="annualLeave"
                    name="annualLeave"
                    onChange={this.handleFormInputChange}
                    value={this.state.annualLeave}
                    min={0}
                    max={12}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} lg={4} htmlFor="overTime">
                  Số ngày đã làm thêm
                </Label>
                <Col md={9} lg={8}>
                  <Input
                    type="number"
                    id="overTime"
                    name="overTime"
                    onChange={this.handleFormInputChange}
                    value={this.state.overTime}
                    min={0}
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <FormGroup row>
                <Button color="primary" type="submit" className="mr-2" >
                  Thêm
                </Button>
              </FormGroup>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default StaffList;
