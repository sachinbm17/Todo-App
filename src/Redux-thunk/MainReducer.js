import { handle } from "redux-pack";
import * as actionTypes from "./ActionTypes";

const initialState = {
  todoListData: [],
  errors: {
    error: "",
  },
  loaders: {
    isLoading: false,
  },
};

const todoReducer = (state = initialState, action = "") => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_TODO_LIST:
      return {
        todoListData: payload,
      };
    case actionTypes.DELETE_TODO_ITEM:
      return { ...state, todoListData: payload };
    case actionTypes.UPDATE_TODO_ITEM:
      return { ...state, todoListData: payload };
    default:
      return state;
  }
};

export default todoReducer;
