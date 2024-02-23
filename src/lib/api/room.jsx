import axios from "axios";

export async function createRoom(userId) {
  try {
    const data = { userId };
    const response = await axios.post("/api/room/create", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getRoomInfoWithId(roomId) {
  try {
    const response = await axios.get("/api/room/info/id/" + roomId);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getRoomInfoWithCode(roomCode) {
  try {
    const response = await axios.get("/api/room/info/code/" + roomCode);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
