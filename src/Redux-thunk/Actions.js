import * as actionTypes from "./ActionTypes";

export const createTodoList = (payload) => (dispatch, getState) => {
  const { todoListData } = getState();
  const updatedList = [...todoListData, payload];
  dispatch({
    type: actionTypes.CREATE_TODO_LIST,
    payload: updatedList,
  });
};

export const deleteTodoItem = (id) => (dispatch, getState) => {
  const { todoListData } = getState();
  const itemDeletedList = todoListData.filter((item) => item.id !== id);
  dispatch({
    type: actionTypes.DELETE_TODO_ITEM,
    payload: itemDeletedList,
  });
};

export const updateTodoItem = (data) => (dispatch, getState) => {
  const { todoListData } = getState();
  const tempList = [...todoListData];
  tempList.map((item, index) => {
    if (item.id === data.id) {
      tempList[index] = data;
    }
  });
  dispatch({
    type: actionTypes.UPDATE_TODO_ITEM,
    payload: tempList,
  });
};
