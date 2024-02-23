import React from "react";
import { Container } from "react-bootstrap";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";

export default function RoomHostPage() {
  const video = {
    key: "dD88Hr9lDZU",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <YoutubePlayer video={video} />
    </div>
  );
}
