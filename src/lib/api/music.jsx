import axios from "axios";

export async function createMusic(title, artist, comment, userId, link) {
  try {
    const data = { title, artist, comment, userId, link };
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

export async function updateVote(musicId, isAgreed) {
  try {
    const data = { musicId, isAgreed };
    const response = await axios.put("/api/music/vote", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
