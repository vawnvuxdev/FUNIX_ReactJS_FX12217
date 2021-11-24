import * as ActionTypes from './ActionTypes';

export const StaffsSalary = (state = { isLoading: true, errMess: null, staffs: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFS:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                staffsSalary: action.payload
            }

        case ActionTypes.STAFFS_LOADING:
            return { ...state, isLoading: true, errMess: null, staffs: [] };

        case ActionTypes.STAFFS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
}