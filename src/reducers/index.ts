import { combineReducers } from "@reduxjs/toolkit";
import loginReducer, { LoginState } from "./login.reducer";
import profileReducer, { ProfileState } from "./profile.reducer";

export interface RootState {
  loginReducer: LoginState;
  profileReducer: ProfileState;
}

const rootReducer = combineReducers({
  loginReducer,
  profileReducer,
});

export default rootReducer;
