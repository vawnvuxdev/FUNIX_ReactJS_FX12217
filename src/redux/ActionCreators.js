import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const loadStaffs = (staffs) => ({
  type: ActionTypes.LOAD_STAFFS,
  payload: staffs,
});

export const staffsFailed = (errMess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errMess,
});

export const fetchStaffs = () => (dispatch) => {
  return fetch(baseUrl + "staffs")
    .then((response) => response.json())
    .then((reposne) => dispatch(loadStaffs(reposne)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const postStaff =
  (newStaff) =>
    (dispatch) => {
      newStaff.salary = Math.round(newStaff.salaryScale * 3000000 + newStaff.overTime * 200000);
      newStaff.image = "/asset/images/alberto.png";

      return fetch(baseUrl + "staffs", {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((staffs) => dispatch(loadStaffs(staffs)))
        .catch((error) => {
          console.log("post new staff", error.message);
          alert("Error: " + error.message);
        });
    };

export const fetchDeleteStaff = (id) => (dispatch) => {
  fetch(baseUrl + "staffs/" + id, {
    method: "DELETE",
    statusCode: 204,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((reposne) => dispatch(loadStaffs(reposne)))
    .catch((error) => { console.log(error.message) });
};

export const fetchEditStaff = (editStaff) => (dispatch) => {
  editStaff.salary = Math.round(
    editStaff.salaryScale * 3000000 + editStaff.overTime * 200000
  );

  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(editStaff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((response) => dispatch(loadStaffs(response)))
    .catch((error) => {
      console.log("Edit staff", error.message);
      alert("Error: " + error.message);
    });
};

export const loadDepartments = (departments) => ({
  type: ActionTypes.LOAD_DEPARTMENTS,
  payload: departments,
});

export const departmentsFailed = (errMess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errMess,
});

export const fetchDepartments = () => (dispatch) => {
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((reposne) => dispatch(loadDepartments(reposne)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};
