import React, { useState } from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";
import "./styles.css";
import RoomInfo from "~/components/roomInfo/roomInfo";

export default function RoomHostPage() {
  const video = {
    key: "mFbILexYSQg",
  };
  return (
    <div>
      <YoutubePlayer video={video} />
      <RoomInfo />
    </div>
  );
}
