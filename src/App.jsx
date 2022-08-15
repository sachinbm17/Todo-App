import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./Redux-thunk/Store";
import TodoList from "./TODO/index";
const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default App;
