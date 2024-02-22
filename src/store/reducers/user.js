import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setIsLoggedInTrue(state, action) {
      console.log("true");
      state.isLoggedIn = true;
    },
    setIsLoggedInFalse(state, action) {
      state.isLoggedIn = false;
    },
  },
});

export const { setIsLoggedInTrue, setIsLoggedInFalse } = userSlice.actions;

export default userSlice.reducer;
