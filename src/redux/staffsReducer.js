import * as ActionTypes from "./ActionTypes";

export const Staffs = (state = { errMess: null, staffs: [] }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_STAFFS:
      return {
        ...state,
        errMess: null,
        staffs: action.payload,
      };

    case ActionTypes.STAFFS_FAILED:
      return { ...state, errMess: action.payload };

    default:
      return state;
  }
};
