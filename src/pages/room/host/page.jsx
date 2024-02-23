import React from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";

export default function RoomHostPage() {
  const video = {
    key: "dD88Hr9lDZU",
  };
  return (
    <>
      <h1>Room Host</h1>
      <YoutubePlayer video={video}></YoutubePlayer>
    </>
  );
}
