import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createRoom as reqCreateRoom,
  getRoomInfoWithCode as reqGetRoomInfoWithCode,
} from "~/lib/api/room";

const initialState = {
  data: null,
};

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      console.log("fulfilled createRoom");
      console.log(action);
      state.data = action.payload;
    });

    builder
      .addCase(createRoom.pending, (state, action) => {
        console.log("pending createRoom");
        console.log(action);
      })
      .addCase(createRoom.rejected, (state, action) => {
        console.log("rejected createRoom");
        console.log(action);
      });

    builder.addCase(getRoomInfoWithCode.fulfilled, (state, action) => {
      console.log("fulfilled getRoomInfoWithCode");
      console.log(action);
      state.data = action.payload;
    });

    builder
      .addCase(getRoomInfoWithCode.pending, (state, action) => {
        console.log("pending getRoomInfoWithCode");
        console.log(action);
      })
      .addCase(getRoomInfoWithCode.rejected, (state, action) => {
        console.log("rejected getRoomInfoWithCode");
        console.log(action);
      });
  },
});

export { createRoom, getRoomInfoWithCode };
export default roomSlice.reducer;
