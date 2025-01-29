import {
  GET_LOGIN_FETCHING,
  GET_LOGIN_REJECTED,
  GET_LOGIN_RESOLVED,
  LOG_OUT,
} from "@/utils/constants";

export type Login = {
  token: string;
};

export type GetLoginFetchingAction = {
  type: typeof GET_LOGIN_FETCHING;
};

export type GetLoginRejectedAction = {
  type: typeof GET_LOGIN_REJECTED;
};

export type GetLoginResolvedAction = {
  type: typeof GET_LOGIN_RESOLVED;
  payload: Login;
};

export type LogOutAction = {
  type: typeof LOG_OUT;
};

export type LoginActionTypes =
  | GetLoginFetchingAction
  | GetLoginRejectedAction
  | GetLoginResolvedAction
  | LogOutAction;

export type GetLoginParams = {
  email: string;
  password: string;
};
