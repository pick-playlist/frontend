import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRoom as reqCreateRoom } from "~/lib/api/room";

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
  },
});

export { createRoom };
export default roomSlice.reducer;
