import axios from "axios";
import { AppDispatch } from "@/utils/store";
import config from "@/config";
import {
  GET_LOGIN_FETCHING,
  GET_LOGIN_REJECTED,
  GET_LOGIN_RESOLVED,
  LOG_OUT,
} from "@/utils/constants";
import { GetLoginParams } from "./type.login";

export const getLogin = (data: GetLoginParams) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: GET_LOGIN_FETCHING });
    try {
      const result = await axios.post(`${config.BASE_URL}/api/v1/user/login`, data);
      dispatch({ type: GET_LOGIN_RESOLVED, payload: result.data.body });
    } catch (error) {
      dispatch({ type: GET_LOGIN_REJECTED });
      console.log(error);
    }
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: LOG_OUT });
  };
};
