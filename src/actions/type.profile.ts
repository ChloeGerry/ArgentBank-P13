import {
  ADD_PROFILE_FETCHING,
  ADD_PROFILE_REJECTED,
  ADD_PROFILE_RESOLVED,
  EDIT_PROFILE_FETCHING,
  EDIT_PROFILE_REJECTED,
  EDIT_PROFILE_RESOLVED,
  GET_PROFILE_FETCHING,
  GET_PROFILE_REJECTED,
  GET_PROFILE_RESOLVED,
} from "@/utils/constants";
import { LogOutAction, ServerErrorAction } from "./type.login";

export type Profile = {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export type GetProfileFetchingAction = {
  type: typeof GET_PROFILE_FETCHING;
};

export type GetProfileRejectedAction = {
  type: typeof GET_PROFILE_REJECTED;
};

export type GetProfileResolvedAction = {
  type: typeof GET_PROFILE_RESOLVED;
  payload: Profile;
};

export type EditProfileFetchingAction = {
  type: typeof EDIT_PROFILE_FETCHING;
};

export type EditProfileRejectedAction = {
  type: typeof EDIT_PROFILE_REJECTED;
};

export type EditProfileResolvedAction = {
  type: typeof EDIT_PROFILE_RESOLVED;
  payload: Profile;
};

export type AddProfileFetchingAction = {
  type: typeof ADD_PROFILE_FETCHING;
};

export type AddProfileRejectedAction = {
  type: typeof ADD_PROFILE_REJECTED;
};

export type AddProfileResolvedAction = {
  type: typeof ADD_PROFILE_RESOLVED;
  payload: Profile;
};

export type ProfileActionTypes =
  | GetProfileFetchingAction
  | GetProfileRejectedAction
  | GetProfileResolvedAction
  | LogOutAction
  | EditProfileFetchingAction
  | EditProfileRejectedAction
  | EditProfileResolvedAction
  | AddProfileFetchingAction
  | ServerErrorAction
  | AddProfileRejectedAction
  | AddProfileResolvedAction;

export type EditProfileParams = {
  firstName: string;
  lastName: string;
};

export type SignupParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
