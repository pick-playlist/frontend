import React from "react";
import { postMusic, getMusicInfo, putVote } from "~/lib/api/music";
import { getPlaylistInfo } from "~/lib/api/playlist";
import { useState, useEffect } from "react";

export default function page() {
  useEffect(() => {
    getPlaylistInfo("65d6e1eccc7eab58fc815299").then((resp) => {
      console.log("resp: ", resp);
    });
  }, []);

  return (
    <div>
      <p>test page</p>
    </div>
  );
}
