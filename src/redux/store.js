import { legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import myReducer from "./reducer/reducer";

const store = legacy_createStore(myReducer,applyMiddleware(logger))

export default store