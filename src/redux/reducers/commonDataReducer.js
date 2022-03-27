import { authTypes, productTypes, userTypes } from "../types";

const initialstate = {
  users: [],
  products: [],
};

const commonReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data.data;
  switch (action.type) {
    case userTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: getData(),
      };

    case productTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: getData(),
      };
    case authTypes.LOGOUT_USER:
      return initialstate;
    default:
      return state;
  }
};

export default commonReducer;
