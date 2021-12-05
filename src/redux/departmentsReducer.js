import * as ActionTypes from "./ActionTypes";

export const Departments = (
  state = { errMess: null, departments: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_DEPARTMENTS:
      return {
        ...state,
        errMess: null,
        departments: action.payload,
      };

    case ActionTypes.DEPARTMENTS_FAILED:
      return { ...state, errMess: action.payload };

    default:
      return state;
  }
};
