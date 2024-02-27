import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createRoom as reqCreateRoom,
  getRoomInfoWithCode as reqGetRoomInfoWithCode,
} from "~/lib/api/room";

const initialState = {
  data: null,
  loading: "idle",
};

const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const PENDING = "pending";

const createRoom = createAsyncThunk(
  "room/createRoom",
  async ({ userId }, thunkAPI) => {
    const response = await reqCreateRoom(userId);
    return response;
  }
);

const getRoomInfoWithCode = createAsyncThunk(
  "room/getRoomInfoWithCode",
  async ({ roomCode }, thunkAPI) => {
    const response = await reqGetRoomInfoWithCode(roomCode);
    return response;
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: initialState,
  reducers: {
    setRoomNull(state, action) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      console.log("fulfilled createRoom");
      console.log(action);
      state.data = action.payload;
      state.loading = FULFILLED;
    });

    builder
      .addCase(createRoom.pending, (state, action) => {
        console.log("pending createRoom");
        console.log(action);
        state.loading = PENDING;
      })
      .addCase(createRoom.rejected, (state, action) => {
        console.log("rejected createRoom");
        console.log(action);
        state.loading = REJECTED;
      });

    builder.addCase(getRoomInfoWithCode.fulfilled, (state, action) => {
      console.log("fulfilled getRoomInfoWithCode");
      console.log(action);
      state.data = action.payload;
      state.loading = FULFILLED;
    });

    builder
      .addCase(getRoomInfoWithCode.pending, (state, action) => {
        console.log("pending getRoomInfoWithCode");
        console.log(action);
        state.loading = PENDING;
      })
      .addCase(getRoomInfoWithCode.rejected, (state, action) => {
        console.log("rejected getRoomInfoWithCode");
        console.log(action);
        state.loading = REJECTED;
      });
  },
});

export const { setRoomNull } = roomSlice.actions;
export { createRoom, getRoomInfoWithCode, FULFILLED, REJECTED, PENDING };
export default roomSlice.reducer;
