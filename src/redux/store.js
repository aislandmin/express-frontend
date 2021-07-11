import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./reducer";

export default configureStore({
  reducer: { username: usernameReducer },
});
