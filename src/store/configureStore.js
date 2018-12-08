"use strict";

import { applyMiddleware, createStore } from "redux";
import config from '../config';

const { 
  isDebuggingInChrome,
  doComposeWithDevTools,
} = config.get()

// middleware
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from "~/src/middleware/promise";
import array from "~/src/middleware/array";
// import analytics from "./analytics";
import { createLogger } from 'redux-logger'

import rootReducer from "~/src/reducers";
import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage } from "react-native";
import { ensureCompatibility } from "./compatibility";

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

let appStore
if (doComposeWithDevTools) {
  // const composeEnhancers = composeWithDevTools({
  //   // Specify here name, actionsBlacklist, actionsCreators and other options
  // });
  // appStore = composeEnhancers(
  //   applyMiddleware(thunk, promise, array, logger)(
  //     createStore
  //   )
  // )
  appStore = applyMiddleware(thunk, promise, array, logger)(
    createStore
  );
}
else {
  appStore = applyMiddleware(thunk, promise, array, logger)(
    createStore
  );
}


async function configureStore(onComplete = () => null) {
  const didReset = await ensureCompatibility();
  const store = autoRehydrate()(appStore)(rootReducer);
  persistStore(store, { storage: AsyncStorage },() => onComplete(didReset));

  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;