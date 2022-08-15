import { applyMiddleware, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import { default as reduxThunk } from "redux-thunk";
import todoReducer from "./MainReducer";
import { middleware as reduxPackMiddleware } from "redux-pack";
import { compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const store = configureStore({
  reducer: todoReducer,
  initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxPackMiddleware),
});

export default store;
