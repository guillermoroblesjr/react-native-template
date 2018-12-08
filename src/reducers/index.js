"use strict";

import { combineReducers } from "redux";
import activeRequests from '~/src/reducers/activeRequests'

const rootReducer = combineReducers({
  activeRequests,
});

export default rootReducer;