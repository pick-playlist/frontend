import React from "react";
import { createMusic, getMusicInfo, updateVote } from "~/lib/api/music";
import {
  getPlaylistInfo,
  addMusicInPlaylist,
  deleteMusicInPlaylist,
} from "~/lib/api/playlist";
import { createRoom } from "~/lib/api/room";
import { useState, useEffect } from "react";

export default function page() {
  useEffect(() => {
    createRoom("65d6f115b32758d2cd0559fd").then((resp) => {
      console.log("resp: ", resp);
    });
  }, []);

  return (
    <div>
      <p>test page</p>
    </div>
  );
}
