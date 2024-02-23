import React from "react";
import {
  createMusic,
  getMusicInfo,
  increaseAgree,
  increaseReject,
} from "~/lib/api/music";
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
    increaseReject("65d80680b329663c00715622").then((resp) => {
      console.log("resp: ", resp);
    });
  }, []);

  return (
    <div>
      <p>test page</p>
    </div>
  );
}
