import React, { useState } from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";
import "./styles.css";
import { MusicNoteList, PlusCircleFill, XLg } from "react-bootstrap-icons";
import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ButtonInPages } from "~/components/styled/globalComponent";
import styled, { keyframes } from "styled-components";
import { getLinkInfo } from "~/lib/api/search";
import { createMusic } from "~/lib/api/music";
import { addMusicInPlaylist } from "~/lib/api/playlist";

export default function RoomHostPage() {
  const video = {
    key: "mFbILexYSQg",
  };

  const clickAddButton = async (link, playlistId) => {
    const linkInfoResp = await getLinkInfo(link);

    const title = linkInfoResp.title;
    const artist = "none";
    // 아래 넣어주세용
    const comment = "put comment";
    const userId = "65d6f115b32758d2cd0559fd";

    const musicResp = await createMusic(title, artist, comment, userId, link);
    const createdMusicId = musicResp._id;

    const playlistResp = await addMusicInPlaylist(createdMusicId, playlistId);
    return playlistResp;
  };

  return (
    <div>
      <YoutubePlayer video={video} />
      <RoomInfo />
    </div>
  );
}
