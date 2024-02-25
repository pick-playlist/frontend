import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSignUp } from "~/lib/api/user";
const initialState = {
  isLoggedIn: false,
  userData: null,
  token: null,
};

const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, nickname, password }, thunkAPI) => {
    console.log(email, nickname, password);
    const response = fetchSignUp(email, nickname, password);
    return response;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log("fulfilled signup");
      console.log(action);

      state.userData = action.payload;
    });

    builder
      .addCase(signUp.pending, (state, action) => {
        console.log("pending signup");
        console.log(action);
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log("rejected signup");
        console.log(action);
      });
  },
});

export const { setIsLoggedInTrue, setIsLoggedInFalse } = userSlice.actions;
export { signUp };
export default userSlice.reducer;
