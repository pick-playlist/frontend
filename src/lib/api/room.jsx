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
