import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGuestLogIn,
  fetchLogIn,
  fetchSignUp,
  fetchUser,
} from "~/lib/api/user";
const initialState = {
  isLoggedIn: false,
  data: null,
};

const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, nickname, password }, thunkAPI) => {
    const response = await fetchSignUp(email, nickname, password);
    return response;
  }
);

const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }, thunkAPI) => {
    const response = await fetchLogIn(email, password);
    return response;
  }
);

const guestLogIn = createAsyncThunk(
  "user/guestLogIn",
  async ({ nickname }, thunkAPI) => {
    const response = await fetchGuestLogIn(nickname);
    return response;
  }
);

const getUser = createAsyncThunk(
  "user/getUser",
  async ({ userId }, thunkAPI) => {
    const response = await fetchUser(userId);
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

      state.data = action.payload;
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

    builder.addCase(guestLogIn.fulfilled, (state, action) => {
      console.log("fulfilled guestLogIn");
      console.log(action);

      state.data = action.payload;
    });

    builder
      .addCase(guestLogIn.pending, (state, action) => {
        console.log("pending guestLogIn");
        console.log(action);
      })
      .addCase(guestLogIn.rejected, (state, action) => {
        console.log("rejected guestLogIn");
        console.log(action);
      });

    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log("fulfilled getUser");
      console.log(action);

      state.data = action.payload;
    });

    builder
      .addCase(getUser.pending, (state, action) => {
        console.log("pending getUser");
        console.log(action);
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("rejected getUser");
        console.log(action);
      });
  },
});

export const { setIsLoggedInTrue, setIsLoggedInFalse } = userSlice.actions;
export { signUp, logIn, guestLogIn, getUser };
export default userSlice.reducer;
