import React from "react";
import { Accordion } from "react-bootstrap";

const EMPTY_PLAYLIST = "플레이리스트가 비어 있습니다.";

export default function PlaylistComponent({ music }) {
  return (
    <Accordion.Body
      style={{
        fontFamily: "IBMPlexSansKR-Regular",
      }}
    >
      {music !== undefined ? (
        <div
          key={music._id}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
            // maxHeight: "150px",
          }}
        >
          <img
            src={music.thumbnail}
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
              objectFit: "cover",
            }}
          />
          {music.title}
        </div>
      ) : (
        EMPTY_PLAYLIST
      )}
    </Accordion.Body>
  );
}
