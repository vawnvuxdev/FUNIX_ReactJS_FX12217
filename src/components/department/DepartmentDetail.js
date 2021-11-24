import React from 'react';
import RenderStaff from '../staff/StaffList';

const DepartmentDetail = (props) => {
    const Department = () => {
        return (
            <div>Department</div>
        )
    }

    const StaffsByDepartment = () => {
        return (
            <div>Staffs</div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                {Department}
            </div>
            <div className="row">
                {StaffsByDepartment}
            </div>
        </div>
    )
}

export default DepartmentDetail;