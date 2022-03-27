import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import getToken from "../helpers/getToken";
import { BASEURL } from "../constants/index";
import { showSnackBar } from "./action/snackActions";

const getErrorMessage = (error) => {
  return typeof error?.response?.data?.message === "string"
    ? error?.response?.data?.message
    : undefined;
};

const options = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      ({ getState, dispatch, getSourceAction }, request) => {
        dispatch({ type: "SPINNER_START" });

        return request;
      },
    ],
    response: [
      {
        success: ({ getState, dispatch, getSourceAction }, response) => {
          let sourceAction = getSourceAction(response.config);

          if (sourceAction?.payload?.enableMessage) {
            const succMessage = (res) =>
              response.data.message || sourceAction?.payload?.successMessage;
            if (succMessage()) {
              dispatch(showSnackBar(succMessage(), "success"));
            }
          }
          if (sourceAction?.payload?.cb) {
            sourceAction?.payload?.cb(response);
          }
          // console.log('acc', response);
          dispatch({ type: "SPINNER_STOP" });

          return response;
        },
        error: ({ getState, dispatch, getSourceAction }, error) => {
          let sourceAction = getSourceAction(error.config);
          if (sourceAction?.payload?.enableMessage) {
            const errMessage = () => {
              if (getErrorMessage(error)) {
                return getErrorMessage(error);
              }
              return sourceAction?.payload?.errorMessage;
            };

            if (errMessage()) {
              dispatch(showSnackBar(errMessage(), "error"));
            }
          }

          if (sourceAction?.payload?.errorCb) {
            sourceAction?.payload?.errorCb(error);
          }

          dispatch({ type: "SPINNER_STOP" });

          if (error.message === "Network Error") {
            dispatch(
              showSnackBar(
                "Network Error, Please check your internet connection or contact developer",
                "error"
              )
            );
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};

const client = axios.create({
  baseURL: BASEURL,
});
client.interceptors.request.use(async (config) => {
  let token = getToken();

  if (token) {
    config.headers["Authorization"] = `${token}`;
  }

  return config;
});
export default axiosMiddleware(client, options);
