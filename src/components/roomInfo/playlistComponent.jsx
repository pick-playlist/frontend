import React from "react";
import { Accordion } from "react-bootstrap";

export default function PlaylistComponent({ music }) {
  return (
    <Accordion.Body
      style={{
        fontFamily: "IBMPlexSansKR-Regular",
      }}
    >
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
          }}
        />
        {music.title}
      </div>
    </Accordion.Body>
  );
}
