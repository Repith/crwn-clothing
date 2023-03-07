import { USER_ACTION_TYPES } from "./user.types";

export const USER_INITIAL_STATE = {
  currentUser: null,
};
//Setting state default to INITIAL_STATE for first time running
//than reducers are gonna pass state.
//That's different than it was in userContext where hook was used.
//Receives every single action that is dispatched.
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    //Reducer returning state as an object - if it refers to the same memory allocation
    //the reducer does not need to update (so no need to re render).
    //Every reducer needs to return state by default if non of the cases
    //matches to the type.
    default:
      return state;
  }
};
