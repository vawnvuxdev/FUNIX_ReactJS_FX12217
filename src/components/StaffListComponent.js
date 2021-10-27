import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "reactstrap";
import dateFormat from "dateformat";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      lgCol: 4,
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  renderStaffList(lgCol) {
    return (
      <Row>
        {this.props.staffs.map((staff) => {
          return (<Col md="6" lg={lgCol}>
          <Card
            className="mt-1 p-1"
            outline
            color="info"
            key={staff.id}
            onClick={() => this.onStaffSelect(staff)}
          >
            {staff.name}
          </Card>
        </Col>);
        })}
      </Row>
    );
  }

  renderSelectedStaff(staff) {
    if (staff != null) {
      return (
        <Col>
          <Card outline color="success">
            <CardBody>
              <CardTitle className="text-primary">
                Họ và tên: {staff.name}
              </CardTitle>
              <CardText>
                <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")} </p>
                <p>
                  Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                </p>
                <p>Phòng ban: {staff.department.name}</p>
                <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                <p>Số ngày đã làm thêm: {staff.overTime}</p>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h2>Danh sách nhân viên</h2>
          <ButtonGroup>
            <Button size="sm" onClick={() => {this.setState({lgCol: 6})}}>
              2
            </Button>
            <Button size="sm" onClick={() => {this.setState({lgCol: 4})}}>
              3
            </Button>
            <Button size="sm" onClick={() => {this.setState({lgCol: 3})}}>
              4
            </Button>
            <Button size="sm" onClick={() => {this.setState({lgCol: 2})}}>
              6
            </Button>
          </ButtonGroup>
          <small> Columns for Desktop</small>
        </div>
        {this.renderStaffList(this.state.lgCol)}
        <h2 className="text-center m-1">Bấm vào tên để xem thông tin</h2>
        <Row>{this.renderSelectedStaff(this.state.selectedStaff)}</Row>
      </div>
    );
  }
}

export default StaffList;
