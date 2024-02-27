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
    <>
      {playlist.length === 0 ? (
        <div
          style={{
            width: "100%",
            alignSelf: "start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: window.innerHeight * 0.45,
            }}
          >
            아직 플레이리스트에 음악이 없어요. 음악을 추가해주세요!
          </div>

          <RoomInfo />
        </div>
      ) : (
        <div style={{ alignSelf: "start" }}>
          <YoutubePlayer video={video} />
          <RoomInfo />
        </div>
      )}
    </>
  );
}
