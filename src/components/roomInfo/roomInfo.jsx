import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import {
  MusicNoteList,
  PlusCircleFill,
  XLg,
  DoorOpenFill,
  MusicPlayerFill,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { ButtonInPages } from "~/components/styled/globalComponent";
import styled, { keyframes } from "styled-components";
import PartyUserIcon from "../partyUserIcon/partyUserIcon";
import { getLinkInfo } from "~/lib/api/search";
import { createMusic } from "~/lib/api/music";
import { addMusicInPlaylist } from "~/lib/api/playlist";
import { updateRoom } from "~/lib/util/room";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const COLOR_LIST = ["#3C308C", "#332973", "#2F2359"];

export default function RoomInfo({ isHost }) {
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);
  const roomLoading = useSelector((state) => state.room.loading);

  const dispatch = useDispatch();

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [isPlusBtnClicked, setIsPlusBtnClicked] = useState(false);
  const [hostNickName, setHostNickName] = useState("");
  const [userList, setUserList] = useState([]);
  const [remainPlaylist, setRemainPlayList] = useState([]);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const clickAddButton = async (link, playlistId) => {
    const linkInfoResp = await getLinkInfo(link);
    const title = linkInfoResp.title;
    const thumbnail = linkInfoResp.thumbnails.default.url;
    // 아래 넣어주세용
    const userId = user._id;
    const musicResp = await createMusic(
      title,
      thumbnail,
      comment,
      userId,
      link
    );

    const createdMusicId = musicResp._id;

    const playlistResp = await addMusicInPlaylist(createdMusicId, playlistId);

    updateRoom(room.code, dispatch);
    console.log("playlistResp: ", playlistResp);

    socket.emit("room_updated", room.room_id);
    return playlistResp;
  };

  useEffect(() => {
    socket.on("room_updated", (data) => {
      console.log("room_updated, data: ", data);
      dispatch(updateRoom(room.code));
    });
  }, []);

  useEffect(() => {
    socket.emit("room_updated", room.room_id);
  }, []);
  useEffect(() => {
    if (user && room) {
      if (isHost) {
        setHostNickName(user.nickname);
      }
    }
  }, [room]);
  // room 정보가 업데이트 되면

  useEffect(() => {
    if (room) {
      // user list 업데이트
      setUserList(room.users);
      setRemainPlayList(room.remainPlaylist.musics);
    }
  }, [room]);

  async function clickGoodButton() {}

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignSelf: "flex-start",
        width: "100%",
      }}
    >
      {isPlusBtnClicked ? (
        <StyledModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <XLg
              onClick={() => setIsPlusBtnClicked(false)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 18,
                top: 18,
                width: "20px",
                height: "20px",
              }}
            />
            <h3
              style={{
                alignSelf: "flex-start",
                fontFamily: "IBMPlexSansKR-Regular",
              }}
            >
              추가 할 유튜브 링크
            </h3>
            <Form>
              <Form.Control
                type="text"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                placeholder="유튜브 링크 주소를 입력해주세요."
                style={{
                  fontSize: "13px",
                  fontFamily: "IBMPlexSansKR-Regular",
                  width: "300px",
                  height: "50px",
                  backgroundColor: "#BDCAF2",
                  borderWidth: 0,
                  margin: 10,
                }}
              />
            </Form>
            <Form>
              <h3 style={{ fontFamily: "IBMPlexSansKR-Regular" }}>코멘트</h3>
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="코멘트를 입력해주세요."
                style={{
                  fontSize: "13px",
                  fontFamily: "IBMPlexSansKR-Regular",
                  width: "300px",
                  height: "50px",
                  backgroundColor: "#BDCAF2",
                  borderWidth: 0,
                  margin: 10,
                }}
              />
            </Form>
            <ButtonInPages
              onClick={() => {
                setIsPlusBtnClicked(false);
                clickAddButton(link, room.remainPlaylist._id);
              }}
            >
              추가하기
            </ButtonInPages>
          </div>
        </StyledModalContent>
      ) : null}
      <span
        style={{
          alignSelf: "center",
          fontFamily: "IBMPlexSansKR-Regular",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MusicPlayerFill style={{ marginRight: "2px" }} />
        {hostNickName}님의 공유 플레이리스트
      </span>
      {room ? (
        <SlideItem
          isCodeOpen={isCodeOpen}
          style={{
            fontFamily: "IBMPlexSansKR-Regular",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "3px",
              color: "#3C308C",
            }}
            onClick={() => setIsCodeOpen(!isCodeOpen)}
          >
            {/* <DoorOpenFill /> */}
            click!
          </div>

          {room.code}
        </SlideItem>
      ) : null}

      <div style={{ marginTop: "10px", fontFamily: "IBMPlexSansKR-Regular" }}>
        <span>현재 {userList.length}명이 참여중... </span>
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          {userList.map((u, i) => {
            return (
              <PartyUserIcon
                key={u._id}
                userNickName={u.nickname}
                color={COLOR_LIST[i % COLOR_LIST.length]}
                index={i}
              />
            );
          })}
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
            <MusicNoteList style={{ marginRight: "5px", width: "20px" }} />
            대기 중인 플레이리스트
          </div>
          <PlusCircleFill
            style={{ cursor: "pointer" }}
            onClick={() => setIsPlusBtnClicked(true)}
          />
        </h3>
        <div style={{ marginTop: "10px", marginBottom: "50px" }}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                Playlist
              </Accordion.Header>

              {remainPlaylist.length == 0 ? (
                <Accordion.Body style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                  아직 대기 중인 플레이리스트가 없습니다.
                </Accordion.Body>
              ) : (
                remainPlaylist.map((music) => {
                  return (
                    // TO DO : music 컴포넌트로 변경하기
                    <Accordion.Body
                      style={{ fontFamily: "IBMPlexSansKR-Regular" }}
                    >
                      <div
                        key={music._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          height: "50px",
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
                })
              )}
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledModalContent = styled.div`
  maxwidth: 370px;
  width: 370px;
  align-self: center;
  position: fixed;
  top: 30%;
  z-index: 5;
  border-radius: 20px;
  padding: 20px;
  // border: 1px solid #332973;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.5s forwards; // 모달이 나타날 때의 애니메이션
`;
const slideAnimation = (props) => keyframes`
from {
  transform: translateX(${props.isCodeOpen ? "100%" : "90%"});
}
to {
  transform: translateX(${props.isCodeOpen ? "90%" : "100%"});
}
`;

// 슬라이드 요소
const SlideItem = styled.div`
  width: 92%;
  height: 100%;
  animation: ${slideAnimation} 1s forwards; // 슬라이드 애니메이션 적용
`;
