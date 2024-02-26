import axios from "axios";

export async function createMusic(title, thumbnail, comment, userId, link) {
  try {
    const data = { title, thumbnail, comment, userId, link };
    const response = await axios.post("/api/music", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMusicInfo(musicId) {
  try {
    const response = await axios.get("/api/music/info/" + musicId);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function increaseAgree(musicId) {
  try {
    const data = { musicId, isAgreed: true };
    const response = await axios.put("/api/music/vote", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function increaseReject(musicId) {
  try {
    const data = { musicId, isAgreed: false };
    const response = await axios.put("/api/music/vote", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
