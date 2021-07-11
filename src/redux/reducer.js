import { createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
  name: "username",
  initialState: null,
  reducers: {
    updateUsername: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
