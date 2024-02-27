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
  const response = await axios.get("/api/room/info/code/" + roomCode);
  return response.data;
}

export async function addUserInRoom(userId, roomId) {
  try {
    const data = { userId, roomId, isAdd: true };
    const response = await axios.put("/api/room/user", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUserInRoom(userId, roomId) {
  try {
    const data = { userId, roomId, isAdd: false };
    const response = await axios.put("/api/room/user", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateRoomTags(roomId, tags) {
  try {
    const data = { tags: tags };
    const response = await axios.put("/api/room/info/tags/" + roomId, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
  return response.data;
}
