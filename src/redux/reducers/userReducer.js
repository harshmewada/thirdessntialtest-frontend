import { userTypes, authTypes } from "../types";
import setToken from "../../helpers/setToken";
import removeToken from "../../helpers/removeToken";

const initialstate = {
  isLogged: false,

  isLoading: false,

  token: undefined,
};

const userReducer = (state = initialstate, action) => {
  const getData = () => action?.payload?.data;

  switch (action.type) {
    case authTypes.LOGIN_USER:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };

    case authTypes.LOGIN_USER_SUCCESS:
      setToken(getData().token, getData().loginType, getData()?.user?.id);
      return {
        ...state,

        token: getData().token,
        isLoading: false,
        isLogged: true,
        ...getData().user,
      };

    case authTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        error: {
          message: action?.error?.response?.data?.message,
          status: "error",
        },
      };

    case authTypes.SET_LOCAL_LOGIN:
      return {
        ...state,
        isLogged: true,
      };

    case authTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        token: getData().token,

        ...getData()?.user,
      };

    case userTypes.GET_USER_DETAILS_FAIL:
      return {
        ...state,
        isLogged: false,

        isLoading: false,
      };

    case authTypes.LOGOUT_USER:
      removeToken();
      return initialstate;

    default:
      return state;
  }
};

export default userReducer;
