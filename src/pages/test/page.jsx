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
} from "~/lib/api/room";
import { useState, useEffect } from "react";

export default function page() {
  useEffect(() => {
    getRoomInfoWithCode("7641").then((resp) => {
      console.log("resp: ", resp);
    });
  }, []);

  return (
    <div>
      <p>test page</p>
    </div>
  );
}
