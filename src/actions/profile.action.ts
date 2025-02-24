import axios from "axios";
import { AppDispatch } from "@/utils/store";
import config from "@/config";
import {
  ADD_PROFILE_FETCHING,
  ADD_PROFILE_RESOLVED,
  EDIT_PROFILE_FETCHING,
  EDIT_PROFILE_REJECTED,
  EDIT_PROFILE_RESOLVED,
  GET_PROFILE_FETCHING,
  GET_PROFILE_REJECTED,
  GET_PROFILE_RESOLVED,
  SERVER_ERROR,
} from "@/utils/constants";
import { EditProfileParams, SignupParams } from "./type.profile";

export const getProfile = (token: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: GET_PROFILE_FETCHING });
    try {
      const result = await axios.get(`${config.BASE_URL}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_PROFILE_RESOLVED, payload: result.data.body });
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: SERVER_ERROR });
        console.log("ERR_NETWORK", error);
      }

      if (error.code === "ERR_BAD_REQUEST") {
        dispatch({ type: GET_PROFILE_REJECTED });
        console.log("ERR_BAD_REQUEST", error);
      }
    }
  };
};

export const editProfile = (token: string, data: EditProfileParams) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: EDIT_PROFILE_FETCHING });
    try {
      const result = await axios.put(`${config.BASE_URL}/api/v1/user/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: EDIT_PROFILE_RESOLVED, payload: result.data.body });
    } catch (error) {
      dispatch({ type: EDIT_PROFILE_REJECTED });
      console.log(error);
    }
  };
};

export const addProfile = (data: SignupParams) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ADD_PROFILE_FETCHING });
    try {
      const result = await axios.post(`${config.BASE_URL}/api/v1/user/signup`, data);
      dispatch({ type: ADD_PROFILE_RESOLVED, payload: result.data.body });
    } catch (error) {
      console.log(error);
    }
  };
};
