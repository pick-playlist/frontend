import React, { useEffect, useState } from "react";
import { Accordion, Card, ListGroup } from "react-bootstrap";
import {
  MusicNoteList,
  PlusCircleFill,
  XLg,
  MusicPlayerFill,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { ButtonInPages } from "~/components/styled/globalComponent";
import styled, { keyframes } from "styled-components";
import PartyUserIcon from "../partyUserIcon/partyUserIcon";
import { getLinkInfo } from "~/lib/api/search";
import { createMusic, increaseAgree, increaseReject } from "~/lib/api/music";
import { addMusicInPlaylist, deleteMusicInPlaylist } from "~/lib/api/playlist";
import { updateRoom } from "~/lib/util/room";
import VoteComponent from "../vote/voteComponent";
import YoutubePlayer from "../youtubePlayer/YoutubePlayer";
import headphone from "../../assets/headphone-dynamic-gradient.png";
import { Link45deg } from "react-bootstrap-icons";
import { deleteUserInRoom, updateRoomTags } from "~/lib/api/room";
import {
  setInRoomFalse,
  setInRoomTrue,
  setUserData,
} from "~/store/reducers/user";
import PlaylistComponent from "./playlistComponent";
import socket from "~/lib/util/socket";
import { useNavigate } from "react-router-dom";

const COLOR_LIST = ["#3C308C", "#332973", "#2F2359"];

export default function RoomInfo(props) {
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);
  const roomLoading = useSelector((state) => state.room.loading);
  const isHost = useSelector((state) => state.user.isHost);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [isPlusBtnClicked, setIsPlusBtnClicked] = useState(false);
  const [hostNickName, setHostNickName] = useState("");
  const [userList, setUserList] = useState([]);
  const [remainPlaylist, setRemainPlayList] = useState([]);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [currentMusic, setCurrentMusic] = useState("first");
  //투표 현황
  const [canVote, setCanVote] = useState(false);

  const playlist = room.remainPlaylist.musics;

  useEffect(() => {
    if (playlist && playlist.length > 0) {
      setCurrentMusic(playlist[0]);
    } else if (playlist.length == 0) {
      setCurrentMusic("first");
      setCanVote(false);
    }
  }, [playlist]);

  useEffect(() => {
    if (playlist.length > 0) {
      setCanVote(true);
      console.log("make canVote true");
    }
  }, [currentMusic]);

  useEffect(() => {
    if (currentMusic.reject >= Math.ceil(room.users.length / 2)) {
      // console.log("rejected, ", Math.ceil(room.users.length / 2));
      // 제안된 사람이 유저일 때만 넣기
      if (currentMusic.proposer === user._id) {
        addMusicInPlaylist(currentMusic._id, user.rejectPlaylist._id);
        const action = setUserData(user);
        dispatch(action);
      }
      if (isHost) {
        addMusicInPlaylist(currentMusic._id, room.rejectPlaylist._id);
        deleteMusicInPlaylist(currentMusic._id, room.remainPlaylist._id);
      }

      socket.emit("room_updated", room._id);
    }
  }, [currentMusic.reject]);

  const clickAddButton = async (link, playlistId) => {
    const linkInfoResp = await getLinkInfo(link);
    const title = linkInfoResp.title;
    const thumbnail = linkInfoResp.thumbnails.default.url;
    // 아래 넣어주세용
    const userId = user._id;
    const tags = linkInfoResp.tags || []; // 없을 때도 있음
    const resp = await updateRoomTags(room._id, tags);
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

    socket.emit("room_updated", room._id);
    return playlistResp;
  };

  useEffect(() => {
    socket.on("room_updated", (data) => {
      if (data === room._id) {
        console.log("room_updated, data: ", data);
        dispatch(updateRoom(room.code));
      }
    });

    socket.on("room_deleted", (data) => {
      if (data === room._id) {
        console.log(isHost);
        if (!isHost) {
          const result = alert(
            "방이 종료되었습니다. \n 확인을 누르시면 시각화 페이지로 이동합니다."
          );

          if (!result) {
            const action = setInRoomFalse();
            dispatch(action);
            navigate("/visualization");
          }
        }
        console.log("room_deleted, data", data);
      }
    });

    // 방 안에 있는지
    const action = setInRoomTrue();
    dispatch(action);
  }, []);

  useEffect(() => {
    dispatch(updateRoom(room.code));
  }, []);

  useEffect(() => {
    if (user && room) {
      setHostNickName(room.hostUser.nickname);
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

  function clickAgreeButton() {
    increaseAgree(currentMusic._id);

    console.log("agree");
    socket.emit("room_updated", room._id);
  }

  async function clickRejectButton() {
    increaseReject(currentMusic._id);

    console.log("reject, ");
    socket.emit("room_updated", room._id);
  }

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
                fontSize: "20px",
              }}
            >
              <Link45deg style={{ width: "25px", height: "25px" }} />
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
              <h3
                style={{
                  fontFamily: "IBMPlexSansKR-Regular",
                  fontSize: "20px",
                }}
              >
                코멘트
              </h3>
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="제안한 음악이 수락될 수 있게 코멘트를 적어주세요!"
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
                setComment("");
                setLink("");
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
          fontFamily: "OAGothic-ExtraBold",
          fontSize: "25px",
          display: "flex",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        {/* <MusicPlayerFill style={{ marginRight: "2px" }} /> */}
        {hostNickName}님의 PICKPL 🎶
      </span>

      <div
        style={{
          marginTop: "10px",
          fontFamily: "IBMPlexSansKR-Regular",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "170px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "100%" }}>
            <img src={headphone} style={{ width: "30px", height: "30px" }} />
            <span>현재 {userList.length}명이 참여중... </span>
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              maxWidth: "150px",
              width: "150px",
              height: "40px",
              borderRadius: "50px",
              padding: "5px",
              backgroundColor: "#BDCAF2",
              alignSelf: "center",
            }}
          >
            {userList.map((u, i) => {
              if (i < 6)
                return (
                  <PartyUserIcon
                    key={u._id}
                    user={u}
                    color={COLOR_LIST[i % COLOR_LIST.length]}
                    index={i}
                  />
                );
              return;
            })}
          </div>
        </div>

        {room ? (
          <div
            style={{
              fontSize: "14px",
              padding: "5px 20px",
              borderRadius: "20px",
              alignSelf: "flex-end",
            }}
          >
            입장 코드 : {room.code}
          </div>
        ) : null}
      </div>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        {isHost ? (
          props.playlistLength > 0 ? (
            <YoutubePlayer video={props.video} />
          ) : (
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: window.innerHeight * 0.45,
                fontFamily: "IBMPlexSansKR-Regular",
                textAlign: "center",
              }}
            >
              아직 플레이리스트에 음악이 없어요. <br />
              음악을 추가해주세요!
            </div>
          )
        ) : null}

        {canVote ? (
          <Card className="mb-3">
            <Card.Body>
              <VoteComponent
                usersLength={room.users.length}
                currentMusic={currentMusic}
                clickAgreeButton={clickAgreeButton}
                clickRejectButton={clickRejectButton}
              />
            </Card.Body>
          </Card>
        ) : null}
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
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
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
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
                  return <PlaylistComponent music={music} />;
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
  animation: ${fadeIn} 0.5s forwards;
`;
