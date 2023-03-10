import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//Persist library helps
//BL 'user' to avoid conflict with AuthStateListener
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//.filter prevents from returning false as middleWares, and returns logger if dev mode is on
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

//If ReduxDevTools are available for use
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
//For middleware to work it's needed to be composed (spread ico other middlewares)
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//createStore takes 3 arguments: 1) rootReducer (!)
// 2) additional default state
// 3) logger = shows state before a after action is dispatched, action itself, state  turn after
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
