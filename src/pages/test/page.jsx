import React from "react";
import { createMusic, getMusicInfo, updateVote } from "~/lib/api/music";
import {
  getPlaylistInfo,
  addMusicInPlaylist,
  deleteMusicInPlaylist,
} from "~/lib/api/playlist";
import {
  createRoom,
  getRoomInfoWithId,
  getRoomInfoWithCode,
  addUserInRoom,
  deleteUserInRoom,
} from "~/lib/api/room";
import { useState, useEffect } from "react";

export default function page() {
  useEffect(() => {
    deleteUserInRoom(
      "65d6f6598a9174603ee342ac",
      "65d82a72a2544e972c41e304"
    ).then((resp) => {
      console.log("resp: ", resp);
    });
  }, []);

  return (
    <div>
      <p>test page</p>
    </div>
  );
}
