import {
  GET_LOGIN_FETCHING,
  GET_LOGIN_REJECTED,
  GET_LOGIN_RESOLVED,
  LOG_OUT,
  SERVER_ERROR,
} from "@/utils/constants";
import { Login, LoginActionTypes } from "@/actions/type.login";

export type LoginState = {
  data: Login | null;
  isLoading: boolean;
  hasAuthenticationFailed: boolean;
  hasServerError: boolean;
};

const initialState: LoginState = {
  data: null,
  isLoading: false,
  hasAuthenticationFailed: false,
  hasServerError: false,
};

export default function userReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case GET_LOGIN_FETCHING:
      return { ...state, isLoading: true };
    case GET_LOGIN_RESOLVED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        hasAuthenticationFailed: false,
      };
    case GET_LOGIN_REJECTED:
      return { ...state, hasAuthenticationFailed: true };
    case SERVER_ERROR:
      return { ...state, hasServerError: true };
    case LOG_OUT:
      return { ...state, data: null, isLoading: false };
    default:
      return state;
  }
}
