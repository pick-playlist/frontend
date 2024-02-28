import React, { useState, useEffect } from "react";
import { Accordion, Container } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import userIcon from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "~/lib/api/user";
import { getUser } from "~/store/reducers/user";
import PlaylistComponent from "~/components/roomInfo/playlistComponent";

export default function ProfilePage() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const [profilePhoto, setProfilePhoto] = useState(userIcon);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [acceptPlaylist, setAcceptPlaylist] = useState([]);
  const [rejectPlaylist, setRejectPlaylist] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [acceptRateOfMusic, setAcceptRateOfMusic] = useState(0);

  const calculateAcceptRateOfMusic = (acceptCnt, rejectCnt) => {
    if (acceptCnt + rejectCnt === 0) return 0;
    return (acceptCnt / (acceptCnt + rejectCnt)) * 100;
  };

  useEffect(() => {
    const action = getUser({ userId: user._id });
    dispatch(action);
  }, []);

  useEffect(() => {
    if (user) {
      setProfilePhoto(user.profilePhoto);
      setEmail(user.email);
      setNickname(user.nickname);
      setPlaylist(user.playlist.musics);
      setAcceptPlaylist(user.acceptPlaylist.musics);
      setRejectPlaylist(user.rejectPlaylist.musics);
      setAcceptRateOfMusic(
        calculateAcceptRateOfMusic(acceptPlaylist.length, rejectPlaylist.length)
      );
    }
  }, [user]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercentage((prevProgress) => {
        const nextProgress = prevProgress + 10;
        return nextProgress;
      }); // 10씩 증가하며 100까지 증가
    }, 100); // 1초마다 업데이트

    if (percentage >= acceptRateOfMusic) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트되면 타이머 해제
    };
  }, [percentage, acceptRateOfMusic]);
  return (
    <Container fluid className="d-flex justify-content-center min-vh-100">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <img
          src={profilePhoto}
          style={{
            width: "150px",
            height: "150px",
            marginBottom: "5px",
            borderRadius: 100,
          }}
        />
        <h2 style={{ fontFamily: "OAGothic-ExtraBold" }}>{nickname}</h2>
        <p style={{ fontFamily: "IBMPlexSansKR-Regular" }}>{email}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              fontFamily: "IBMPlexSansKR-Regular",
            }}
          >
            나의 음악 등록 성공률 🎶
          </h4>
          <span
            style={{
              alignSelf: "flex-end",
              marginRight: "10px",
              fontSize: "20px",
              fontFamily: "IBMPlexSansKR-Regular",
            }}
          >
            {acceptRateOfMusic.toFixed(1)}%
          </span>
          <div
            style={{
              marginBottom: "20px",
              width: "400px",
              height: "15px",
              borderRadius: 20,
              backgroundColor: "lightgray",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                height: "15px",
                borderRadius: 20,
                backgroundColor: "#3C308C",
                transition: "width 1s ease-out",
              }}
            />
          </div>
        </div>
        <div style={{ width: "420px" }}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                수락된 플레이리스트
              </Accordion.Header>
              {acceptPlaylist.length == 0 ? (
                <PlaylistComponent />
              ) : (
                acceptPlaylist.map((music) => {
                  return <PlaylistComponent music={music} />;
                })
              )}
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                거절된 플레이리스트
              </Accordion.Header>
              {rejectPlaylist.length == 0 ? (
                <PlaylistComponent />
              ) : (
                rejectPlaylist.map((music) => {
                  return <PlaylistComponent music={music} />;
                })
              )}
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </Container>
  );
}
