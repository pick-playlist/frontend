import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogIn, fetchSignUp } from "~/lib/api/user";
const initialState = {
  isLoggedIn: false,
  userData: null,
};

const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, nickname, password }, thunkAPI) => {
    const response = fetchSignUp(email, nickname, password);
    return response;
  }
);

const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }, thunkAPI) => {
    const response = fetchLogIn(email, password);
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

    builder.addCase(logIn.fulfilled, (state, action) => {
      console.log("fulfilled login");
      console.log(action);

      state.userData = action.payload;
    });

    builder
      .addCase(logIn.pending, (state, action) => {
        console.log("pending login");
        console.log(action);
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log("rejected login");
        console.log(action);
      });
  },
});

export const { setIsLoggedInTrue, setIsLoggedInFalse } = userSlice.actions;
export { signUp, logIn };
export default userSlice.reducer;
