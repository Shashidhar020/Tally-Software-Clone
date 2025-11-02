// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import counterReducer from "./counterSlice";
// Step 1: Load the persisted state from localStorage (if exists)
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};
const counterState = localStorage.getItem("counterState")?JSON.parse(localStorage.getItem("counterState")):{};
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    counter:counterReducer,
  },
  preloadedState:{
    dashboard:persistedState,
    counter:counterState
  }
},
);


store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem("reduxState", JSON.stringify(state.dashboard));
  localStorage.setItem("counterState",JSON.stringify(state.counter))
 
});

export default store;
