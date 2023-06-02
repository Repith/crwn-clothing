import { AnyAction } from "redux";

import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signOutSuccess,
  signOutFailed,
  signInFailed,
  signUpFailed,
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};
//Setting state default to INITIAL_STATE for first time running
//than reducers are gonna pass state.
//That's different than it was in userContext where hook was used.
//Receives every single action that is dispatched.
export const userReducer = (
  state = USER_INITIAL_STATE,
  action = {} as AnyAction
) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }
  //Reducer returning state as an object - if it refers to the same memory allocation
  //the reducer does not need to update (so no need to re render).
  //Every reducer needs to return state by default if non of the cases
  //matches to the type.
  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (
    signUpFailed.match(action) ||
    signOutFailed.match(action) ||
    signInFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
};
