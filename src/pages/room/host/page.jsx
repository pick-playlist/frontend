import React, { useState } from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";
import "./styles.css";
import { useLocation } from "react-router-dom";
import RoomInfo from "~/components/roomInfo/roomInfo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";

export default function RoomHostPage() {
  const [currentVideoKey, setCurrencVideoKey] = useState("first");
  const [currentMusicId, setCurrentMusicId] = useState("");

  const location = useLocation();
  const video = {
    key: currentVideoKey,
    currentMusicId: currentMusicId,
  };

  const room = useSelector((state) => state.room.data);
  const playlist = room.remainPlaylist.musics;

  useEffect(() => {
    if (playlist && playlist.length > 0) {
      const currentMusic = playlist[0];
      setCurrentMusicId(currentMusic._id);

      const url = new URL(currentMusic.link);
      const id = url.searchParams.get("v");
      setCurrencVideoKey(id);
    }
  }, [playlist]);

  return (
    <div style={{ width: "100%" }}>
      {playlist.length === 0 ? (
        // 플리에 music 없을 때

        <p>add music !!</p>
      ) : (
        <YoutubePlayer video={video} />
      )}

      <RoomInfo isHost={location.state.isCreateRoom} />
    </div>
  );
}
