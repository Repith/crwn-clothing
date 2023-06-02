import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

//Persist library helps
//BL 'user' to avoid conflict with AuthStateListener
const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//.filter prevents from returning false as middleWares, and returns logger if dev mode is on
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

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

//After store has been instantiated with sagaMiddleware iside we run it again with rootSaga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
