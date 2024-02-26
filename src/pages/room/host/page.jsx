import React, { useState } from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";
import "./styles.css";
import { useLocation } from "react-router-dom";
import RoomInfo from "~/components/roomInfo/roomInfo";

export default function RoomHostPage() {
  const location = useLocation();
  const video = {
    key: "mFbILexYSQg",
  };

  return (
    <div>
      <YoutubePlayer video={video} />
      <RoomInfo isHost={location.state.isCreateRoom} />
    </div>
  );
}
