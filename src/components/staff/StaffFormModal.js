import React from "react";
import {
  Row,
  Col,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= len;
const isNull = (val) => !(val === "");
const validDoB = (val) => !(new Date(val).getFullYear() > 2003);
const validStartDate = (val) => !(new Date(val).getFullYear() < 2010);

const StaffFormModal = (props) => {
  return (
    <Modal
      toggle={props.toggle}
      isOpen={props.isOpen}
      fullscreen="sm"
      size="lg"
    >
      <ModalHeader toggle={props.toggle}>Thêm Nhân Viên Mớis</ModalHeader>
      <LocalForm
        onSubmit={(formData) => props.onSubmit(formData)}
        initialState={props.initialState}
      >
        <ModalBody>
          <Row className="form-group">
            <Label md={3} lg={4} htmlFor="name">
              Tên
            </Label>
            <Col md={9} lg={8}>
              <Control.text
                className="form-control"
                model=".name"
                id="name"
                name="name"
                validators={{
                  required,
                  minLength: minLength(4),
                }}
              />
            </Col>
            <Errors
              className="text-danger ml-2"
              model=".name"
              show="touched"
              messages={{
                required: "Vui lòng điền thông tin !!",
                minLength: "Tên phải có ít nhất 4 ký tự !!",
              }}
            />
          </Row>
          <Row className="form-group">
            <Label md={3} lg={4} htmlFor="doB">
              Ngày sinh
            </Label>
            <Col md={9} lg={8}>
              <Control.input
                type="date"
                className="form-control"
                model=".doB"
                id="doB"
                name="doB"
                validators={{
                  validDoB,
                }}
              />
            </Col>
            <Errors
              className="text-danger ml-2"
              model=".doB"
              show="touched"
              messages={{
                validDoB: "Năm sinh của nhân viên không được nhỏ hơn 2003",
              }}
            />
          </Row>
          <Row className="form-group">
            <Label md={3} lg={4} htmlFor="startDate">
              Ngày vào công ty
            </Label>
            <Col md={9} lg={8}>
              <Control.input
                type="date"
                className="form-control"
                model=".startDate"
                id="startDate"
                name="startDate"
                validators={{
                  validStartDate,
                }}
              />
            </Col>
            <Errors
              className="text-danger ml-2"
              model=".startDate"
              show="touched"
              messages={{
                validStartDate: "Nhân viên không thể vào công ty trước 2010 !!",
              }}
            />
          </Row>
          <Row className="form-group">
            <Label md={3} lg={4} htmlFor="department">
              Phòng ban
            </Label>
            <Col md={9} lg={8}>
              <Control.select
                className="form-control"
                model=".departmentId"
                id="departmentId"
                name="departmentId"
                validators={{
                  isNull,
                }}
              >
                <option value="">Chọn phòng ban</option>
                <option value="Dept01">1. Sale</option>
                <option value="Dept02">2. HR</option>
                <option value="Dept03">3. Marketing</option>
                <option value="Dept04">4. IT</option>
                <option value="Dept05">5. Finance</option>
              </Control.select>
            </Col>
            <Errors
              className="text-danger ml-2"
              model=".departmentId"
              show="touched"
              messages={{
                isNumber: "Vui lòng chọn phòng ban !! ",
              }}
            />
          </Row>
          <Row className="form-group">
            <Label md={3} lg={4} htmlFor="salaryScale">
              Hệ số lương
            </Label>
            <Col md={9} lg={8}>
              <Control.input
                type="number"
                className="form-control"
                model=".salaryScale"
                id="salaryScale"
                name="salaryScale"
                defaultValue={props.initialState.salaryScale === "" ? 1 : props.initialState.salaryScale }
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
              <Control.input
                type="number"
                className="form-control"
                model=".annualLeave"
                id="annualLeave"
                name="annualLeave"
                defaultValue={props.initialState.annualLeave === "" ? 10 : props.initialState.annualLeave }
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
              <Control.input
                type="number"
                className="form-control"
                model=".overTime"
                id="overTime"
                name="overTime"
                defaultValue={props.initialState.overTime === "" ? 0 : props.initialState.overTime }
                min={0}
                step={1}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row className="form-group">
            <Button color="primary" type="submit" className="mr-2">
              {props.submitType === "edit" ? "Sửa" : "Thêm mới"}
            </Button>
          </Row>
        </ModalFooter>
      </LocalForm>
    </Modal>
  );
};

export default StaffFormModal;
