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
