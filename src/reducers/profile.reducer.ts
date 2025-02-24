import { Profile, ProfileActionTypes } from "@/actions/type.profile";
import {
  GET_PROFILE_FETCHING,
  GET_PROFILE_REJECTED,
  GET_PROFILE_RESOLVED,
  EDIT_PROFILE_FETCHING,
  EDIT_PROFILE_REJECTED,
  EDIT_PROFILE_RESOLVED,
  ADD_PROFILE_FETCHING,
  ADD_PROFILE_REJECTED,
  ADD_PROFILE_RESOLVED,
  LOG_OUT,
  SERVER_ERROR,
} from "@/utils/constants";

export type ProfileState = {
  data: Profile | null;
  isLoading: boolean;
  hasAuthenticationFailed: boolean;
  hasServerError: boolean;
};

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  hasAuthenticationFailed: false,
  hasServerError: false,
};

export default function profileReducer(state = initialState, action: ProfileActionTypes) {
  switch (action.type) {
    case GET_PROFILE_FETCHING:
      return { ...state, isLoading: true };
    case GET_PROFILE_RESOLVED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        hasAuthenticationFailed: false,
      };
    case GET_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasAuthenticationFailed: true,
      };
    case SERVER_ERROR:
      return {
        ...state,
        hasServerError: true,
      };
    case LOG_OUT:
      return { ...state, data: null, isLoading: false };
    case EDIT_PROFILE_FETCHING:
      return { ...state, isLoading: true };
    case EDIT_PROFILE_RESOLVED:
      return { ...state, data: action.payload, isLoading: false };
    case EDIT_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasAuthenticationFailed: true,
      };
    case ADD_PROFILE_FETCHING:
      return { ...state, isLoading: true };
    case ADD_PROFILE_RESOLVED:
      return { ...state, data: action.payload, isLoading: false };
    case ADD_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasAuthenticationFailed: true,
      };
    default:
      return state;
  }
}
