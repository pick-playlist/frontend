import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGuestLogIn,
  fetchLogIn,
  fetchSignUp,
  fetchUser,
} from "~/lib/api/user";

const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const PENDING = "pending";

const initialState = {
  isLoggedIn: false,
  data: null,
  loading: "idle",
  inRoom: false,
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
      state.isLoggedIn = true;
    },
    setIsLoggedInFalse(state, action) {
      state.isLoggedIn = false;
      state.data = null;
    },
    setInRoomTrue(state, action) {
      state.inRoom = true;
    },
    setInRoomFalse(state, action) {
      state.inRoom = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log("fulfilled signup");
      console.log(action);
      state.loading = FULFILLED;
    });

    builder
      .addCase(signUp.pending, (state, action) => {
        console.log("pending signup");
        console.log(action);
        state.loading = PENDING;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log("rejected signup");
        console.log(action);
        state.loading = REJECTED;
      });

    builder.addCase(logIn.fulfilled, (state, action) => {
      console.log("fulfilled login");
      console.log(action);

      state.data = action.payload;
      state.loading = FULFILLED;
    });

    builder
      .addCase(logIn.pending, (state, action) => {
        console.log("pending login");
        console.log(action);
        state.loading = PENDING;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log("rejected login");
        console.log(action);
        state.loading = REJECTED;
      });

    builder.addCase(guestLogIn.fulfilled, (state, action) => {
      console.log("fulfilled guestLogIn");
      console.log(action);

      state.data = action.payload;
      state.loading = FULFILLED;
    });

    builder
      .addCase(guestLogIn.pending, (state, action) => {
        console.log("pending guestLogIn");
        console.log(action);
        state.loading = PENDING;
      })
      .addCase(guestLogIn.rejected, (state, action) => {
        console.log("rejected guestLogIn");
        console.log(action);
        state.loading = REJECTED;
      });

    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log("fulfilled getUser");
      console.log(action);

      state.data = action.payload;
      state.loading = FULFILLED;
    });

    builder
      .addCase(getUser.pending, (state, action) => {
        console.log("pending getUser");
        console.log(action);
        state.loading = PENDING;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("rejected getUser");
        console.log(action);
        state.loading = REJECTED;
      });
  },
});

export const {
  setIsLoggedInTrue,
  setIsLoggedInFalse,
  setInRoomTrue,
  setInRoomFalse,
} = userSlice.actions;
export { signUp, logIn, guestLogIn, getUser, FULFILLED, REJECTED, PENDING };
export default userSlice.reducer;
