import * as ActionTypes from "./ActionTypes";

export const Staffs = (state = { errMess: null, staffs: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        errMess: null,
        staffs: action.payload,
      };

    case ActionTypes.ADD_STAFF:
      var newStaff = action.payload;
      return {
        ...state,
        staffs: [...state.staffs, newStaff],
      };

    case ActionTypes.STAFFS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.DELETE_STAFF:
      var deleteStaffId = action.payload;
      return {
        ...state,
        staffs: state.staffs.filter((staff) => staff.id !== deleteStaffId),
      };

    case ActionTypes.UPDATE_STAFF:
      var editStaff = action.payload;
      return {
        ...state,
        staffs: state.staffs.map((staff) => {
          if (staff.id === editStaff.id) {
            return {
              ...staff,
              ...editStaff,
            }
          } else {
            return staff;
          }
        })
      };

    default:
      return state;
  }
};
