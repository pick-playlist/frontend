import React, { useState } from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";
import "./styles.css";
import { useLocation } from "react-router-dom";
import RoomInfo from "~/components/roomInfo/roomInfo";
import { useSelector } from "react-redux";
import { getMusicInfo } from "~/lib/api/music";

export default function RoomHostPage() {
  const location = useLocation();
  const video = {
    key: "MAhi-BPFjMc",
  };

  const room = useSelector((state) => state.room.data);
  const playlist = room.remainPlaylist.musics;

  if (playlist && playlist.length > 0) {
    const currentMusicId = playlist[0];
    const currentMusicInfo = getMusicInfo(currentMusicId);
    console.log("currencmusicinfo: ", currentMusicInfo);
  }

  // const url = new URL(youtubeLink);
  // const id = url.searchParams.get("v");

  return (
    <div>
      <YoutubePlayer video={video} />
      <RoomInfo isHost={location.state.isCreateRoom} />
    </div>
  );
}
