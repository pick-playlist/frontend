import axios from "axios";

export async function getPlaylistInfo(playlistId) {
  try {
    const response = await axios.get("/api/playlist/info/" + playlistId);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addMusicInPlaylist(musicId, playlistId) {
  try {
    const data = { musicId, playlistId, isAdd: true };
    const response = await axios.put("/api/playlist/music", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteMusicInPlaylist(musicId, playlistId) {
  try {
    const data = { musicId, playlistId, isAdd: false };
    const response = await axios.put("/api/playlist/music", data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
