import { createSlice } from "@reduxjs/toolkit";
e;

const initialState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "isLoggedIn",
  initialState: initialState,
  reducer: {
    setIsLoggedInTrue(state) {
      state.isLoggedIn = true;
    },
    setIsLoggedInFalse(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { setIsLoggedInTrue, setIsLoggedInFalse } = userSlice.actions;

export default userSlice.reducer;
