import axios from "axios";

export async function getPlaylistInfo(playlistId) {
  try {
    const response = await axios.get("/api/playlist/info/" + playlistId);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
