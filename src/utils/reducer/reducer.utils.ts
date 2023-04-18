import { AnyAction } from "redux";

export type ActionWithPayload<T, P> = {
  type: T;
  payload?: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

//void is needed to overload a function because it has to have the same number of parameters
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
