import React, { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import logo from "../../assets/react.svg";
import styled, { css, keyframes } from "styled-components";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";

const EMPTY_PLAYLIST = "플레이리스트가 비어 있습니다.";

export default function Sidebar(props) {
  const user = useSelector((state) => state.user.data);
  const [profilePhoto, setProfilePhoto] = useState(logo);
  const [nickname, setNickname] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [acceptPlaylist, setAcceptPlaylist] = useState([]);
  const [rejectPlaylist, setRejectPlaylist] = useState([]);

  useEffect(() => {
    console.log("User data:", user);

    if (user) {
      setProfilePhoto(user.profilePhoto);
      setNickname(user.nickname);
      setPlaylist(user.playlist.data);
      setAcceptPlaylist(user.acceptPlaylist.data);
      setRejectPlaylist(user.rejectPlaylist.musics);
    }
  }, []);

  return (
    <AnimationComponent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#241C40",
          width: "50vw",
          height: "100vh",
          position: "fixed",
          left: 0,
          padding: 20,
        }}
      >
        <X
          size="40"
          style={{
            cursor: "pointer",
            color: "white",
            alignSelf: "flex-end",
            marginBottom: 20,
          }}
          onClick={() => props.setSidebarVisible(false)}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={profilePhoto} style={{ flex: 1, width: "10px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 2,
              marginLeft: "10%",
            }}
          >
            <span style={{ color: "white" }}>{nickname}</span>
            <span style={{ color: "#C5C5C5" }}>노래 등록 성공률</span>
          </div>
        </div>
        <Accordion className="mt-3" defaultActiveKey="0">
          {/* <Accordion.Item eventKey="0">
            <Accordion.Header>나의 플레이리스트</Accordion.Header>
            <Accordion.Body>
              {playlist.length == 0
                ? EMPTY_PLAYLIST
                : playlist.map((pl) => {
                    return <div key={pl}>{pl}</div>;
                  })}
            </Accordion.Body>
          </Accordion.Item> */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>수락된 플레이리스트</Accordion.Header>
            <Accordion.Body>
              {acceptPlaylist.length == 0
                ? EMPTY_PLAYLIST
                : acceptPlaylist.map((pl) => {
                    return <div key={pl}>{pl}</div>;
                  })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>거절된 플레이리스트</Accordion.Header>
            <Accordion.Body>
              {rejectPlaylist.length == 0
                ? EMPTY_PLAYLIST
                : rejectPlaylist.map((pl) => {
                    return <div key={pl}>{pl}</div>;
                  })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </AnimationComponent>
  );
}

const slideAnimation = keyframes`
0% {
  width:0vw;
}

50% {
  width:25vw;
}

100%{
  width:50vw;
}
`;

const AnimationComponent = styled.div`
  animation: ${slideAnimation} infinite;
`;
