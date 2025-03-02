export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
};

export const GET_LOGIN_FETCHING = "GET_LOGIN_FETCHING";
export const GET_LOGIN_RESOLVED = "GET_LOGIN_RESOLVED";
export const GET_LOGIN_REJECTED = "GET_LOGIN_REJECTED";
export const SERVER_ERROR = "SERVER_ERROR";
export const LOG_OUT = "LOG_OUT";

export const GET_PROFILE_FETCHING = "GET_PROFILE_FETCHING";
export const GET_PROFILE_RESOLVED = "GET_PROFILE_RESOLVED";
export const GET_PROFILE_REJECTED = "GET_PROFILE_REJECTED";
export const EDIT_PROFILE_FETCHING = "EDIT_PROFILE_FETCHING";
export const EDIT_PROFILE_RESOLVED = "EDIT_PROFILE_RESOLVED";
export const EDIT_PROFILE_REJECTED = "EDIT_PROFILE_REJECTED";
export const ADD_PROFILE_FETCHING = "ADD_PROFILE_FETCHING";
export const ADD_PROFILE_RESOLVED = "ADD_PROFILE_RESOLVED";
export const ADD_PROFILE_REJECTED = "ADD_PROFILE_REJECTED";

export const ONE_HOUR = 1000 * 60 * 60;

export const charactersRegex = /^[A-Za-z]+$/;

export const containThreeElementsRegex = /^.{3,}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export enum ERROR_TYPE {
  ERR_NETWORK = "ERR_NETWORK",
  ERR_BAD_REQUEST = "ERR_BAD_REQUEST",
}
