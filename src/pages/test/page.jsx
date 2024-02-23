import React from "react";
import { createMusic, getMusicInfo, updateVote } from "~/lib/api/music";
import { getPlaylistInfo, addMusicInPlaylist } from "~/lib/api/playlist";
import { useState, useEffect } from "react";

export default function page() {
  useEffect(() => {
    addMusicInPlaylist(
      "65d806a0b329663c00715624",
      "65d6e1eccc7eab58fc815299"
    ).then((resp) => {
      console.log("resp: ", resp);
    });
  }, []);

  return (
    <div>
      <p>test page</p>
    </div>
  );
}
