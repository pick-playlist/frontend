import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { MusicNoteList, PlusCircleFill, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { ButtonInPages } from "~/components/styled/globalComponent";
import styled, { keyframes } from "styled-components";
import PartyUserIcon from "../partyUserIcon/partyUserIcon";
import { useSearchParams } from "react-router-dom";
import { getRoomInfoWithCode } from "~/store/reducers/room";
import { getLinkInfo } from "~/lib/api/search";
import { createMusic } from "~/lib/api/music";
import { addMusicInPlaylist } from "~/lib/api/playlist";

const COLOR_LIST = ["#3C308C", "#332973", "#2F2359"];

export default function RoomInfo({ isHost }) {
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [isPlusBtnClicked, setIsPlusBtnClicked] = useState(false);
  const [hostNickName, setHostNickName] = useState("");
  const [userList, setUserList] = useState([]);
  const [remainPlaylist, setRemainPlayList] = useState([]);

  async function clickAddButton(link, playlistId) {
    const linkInfoResp = await getLinkInfo(link);

    const title = linkInfoResp.title;
    const thumbnail = linkInfoResp.thumbnails.default.url;
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
    return playlistResp;
  }

  useEffect(() => {
    if (user && room) {
      if (isHost) {
        setHostNickName(user.nickname);
      }
    }
  }, [room]);

  useEffect(() => {
    if (!room) {
      const action = getRoomInfoWithCode({ roomCode: code });
      dispatch(action);
    } else {
      setUserList(room.users);
      setRemainPlayList(room.remainPlaylist.musics);
    }
  }, [room]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
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
            <h3 style={{ alignSelf: "flex-start" }}>추가 할 유튜브 링크</h3>
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
              <h3>코멘트</h3>
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
      <h3 className="titleText">{hostNickName}님의 잼 🎶</h3>
      <div style={{ alignSelf: "flex-end" }}>
        {room ? <span>공유 코드 {room.code}</span> : null}
      </div>
      <div>
        <h5>현재 재생중인 음악</h5>
        <span>비비 - 밤양갱</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span>현재 {userList.length}명이 참여중 </span>
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          {userList.map((u, i) => {
            return (
              <PartyUserIcon
                userNickName={u.nickname}
                color={COLOR_LIST[i % COLOR_LIST.length]}
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
          }}
        >
          <div>
            <MusicNoteList style={{ marginRight: "5px", width: "20px" }} />
            대기 중인 플레이리스트
          </div>
          <PlusCircleFill
            style={{ cursor: "pointer" }}
            onClick={() => setIsPlusBtnClicked(true)}
          />
        </h3>
        <div style={{ marginTop: "10px", marginBottom: "50px" }}>
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                대기 중인 플레이리스트
              </Accordion.Header>

              {remainPlaylist.length == 0 ? (
                <Accordion.Body style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                  아직 대기 중인 플레이리스트가 없습니다.
                </Accordion.Body>
              ) : (
                remainPlaylist.map((music) => {
                  console.log(music);

                  return (
                    <Accordion.Body
                      style={{ fontFamily: "IBMPlexSansKR-Regular" }}
                    ></Accordion.Body>
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
  position: fixed;
  top: 30%;
  z-index: 5;
  border-radius: 20px;
  padding: 20px;
  border: 3px solid #332973;
  background-color: white;
  animation: ${fadeIn} 0.5s forwards; // 모달이 나타날 때의 애니메이션
`;
