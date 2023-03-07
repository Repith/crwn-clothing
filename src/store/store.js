import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// const logger = createLogger();

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

//For middleware to work it's needed to compose it (spread ico other middlewares)
const composedEnhancers = compose(applyMiddleware(...middleWares));

//createStore takes 3 arguments: 1) rootReducer (!)
// 2) additional default state
// 3) logger = shows state before a after action is dispatched, action itself, state  turn after
export const store = createStore(rootReducer, undefined, composedEnhancers);
