import authApi from "../api/authApi";
import userApi from "../api/userApi";
import { authTypes, userTypes } from "../types";

export const getUsers = () => {
  return {
    type: userTypes.GET_USERS,
    payload: {
      request: {
        url: userApi.GET_USERS,
        method: "get",
      },
    },
  };
};

export const loginUser = (data, cb, errorCb) => {
  return {
    type: authTypes.LOGIN_USER,
    payload: {
      request: {
        url: authApi.LOGIN_USER,
        method: "post",
        data: data,
      },
      enableMessage: true,

      successMessage: "Login Succcess",
      errorMessage: "Failed to Login",
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const registerUser = (data, cb, errorCb) => {
  return {
    type: userTypes.CREATE_USER,
    payload: {
      request: {
        url: authApi.REGISTER_USER,
        method: "post",
        data: data,
      },
      enableMessage: true,
      successMessage: "User registered successfully",
      errorMessage: "Failed to register user",

      cb: cb,
      errorCb: errorCb,
    },
  };
};
export const updateUser = (data, cb, errorCb) => {
  return {
    type: userTypes.UPDATE_USER,
    payload: {
      request: {
        url: userApi.UPDATE_USER,
        method: "put",
        data: data,
      },
      enableMessage: true,
      successMessage: "User updated successfully",
      errorMessage: "Failed to update user",

      cb: cb,
      errorCb: errorCb,
    },
  };
};
export const deleteUser = (data, cb, errorCb) => {
  return {
    type: userTypes.DELETE_USER,
    payload: {
      request: {
        url: userApi.REMOVE_USER,
        method: "delete",
        data: data,
      },
      enableMessage: true,
      successMessage: "User deleted successfully",
      errorMessage: "Failed to delete user",

      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const getUserDetails = (data, cb, errorCb) => {
  return {
    type: authTypes.GET_USER_DETAILS,
    payload: {
      request: {
        url: authApi.GET_USER_DETAILS,
        method: "get",
        data: data,
      },
      successMessage: "Login Succcess",
      errorMessage: "Failed to Login",
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const logOutUser = (cb, errorCb) => {
  return {
    type: authTypes.LOGOUT_USER,
    payload: {
      request: {
        url: authApi.LOGOUT_USER,
        method: "get",
      },
      successMessage: "Logged out",
      errorMessage: "Failed to logout",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const getActivity = (userId, cb, errorCb) => {
  return {
    type: userTypes.GET_ACTIVITY,
    payload: {
      request: {
        url: `${userApi.GET_ACTIVITY}`,
        method: "get",
        params: {
          id: userId,
        },
      },
      successMessage: "Logged out",
      errorMessage: "Failed to logout",
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

// export const logoutUser = () => {
//   return {
//     type: authTypes.LOGOUT_USER,
//   };
// };

export const setLocalLogin = ({ loginType }) => {
  return {
    type: authTypes.SET_LOCAL_LOGIN,
    payload: loginType,
  };
};
