import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="col-12 col-md-5 m-1 p-1">
          <Card className="bg-secondary text-white">
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
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <Card
          key={staff.id}
          className="col-12 col-md-5 m-1 col-lg-3 m-lg-2"
          onClick={() => this.onStaffSelect(staff)}
        >
          {staff.name}
        </Card>
      );
    });

    return (
      <div className="container">
        <h2 className="text-center m-1">Danh sách nhân viên</h2>
        <div className="row">{staffList}</div>
        <h2 className="text-center m-1">Bấm vào tên để xem thông tin</h2>
        <div className="row">{this.renderStaff(this.state.selectedStaff)}</div>
      </div>
    );
  }
}

export default StaffList;
