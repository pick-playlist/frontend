import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactWordcloud from "react-wordcloud";
import { ButtonInPages } from "~/components/styled/globalComponent";
import { getMusicInfo } from "~/lib/api/music";
import { getPlaylistInfo } from "~/lib/api/playlist";
import { deleteRoom, deleteUserInRoom } from "~/lib/api/room";
import { setRoomNull } from "~/store/reducers/room";
import { setIsLoggedInFalse } from "~/store/reducers/user";

import io from "socket.io-client";
import PlaylistComponent from "~/components/roomInfo/playlistComponent";
import styled, { keyframes } from "styled-components";
const socket = io.connect("http://localhost:3000");

export default function Visualization() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const isHost = useSelector((state) => state.user.isHost);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const room = useSelector((state) => state.room.data);

  const [words, setWords] = useState([]);
  const [ranks, setRanks] = useState();
  const colorCodes = ["#ffdddd", "#ffeedd", "#ffffdd", "#ddffe5", "#ddf6ff"];

  useEffect(() => {
    makeRank(room);
    tagToWords();
  }, []);

  const makeRank = async (room) => {
    try {
      const roomId = room._id;
      const acceptPlaylistId = room.acceptPlaylist._id;
      const rejectPlaylistId = room.rejectPlaylist._id;

      const acceptResp = await getPlaylistInfo(acceptPlaylistId);
      const acceptMusics = acceptResp.musics;

      const rejectResp = await getPlaylistInfo(rejectPlaylistId);
      const rejectMusics = rejectResp.musics;

      const allMusics = await acceptMusics.concat(rejectMusics);

      let rankDiv = [];
      console.log("all: ", allMusics);

      if (allMusics.length > 0) {
        allMusics.sort((a, b) => b.agree - a.agree);

        let rank = 1;
        let prevAgree = allMusics[0].agree;
        const divLimit = 5;
        let cnt = 0;
        // console.log("prevAgree: ", prevAgree);

        for (let i = 0; i < allMusics.length; i++) {
          if (prevAgree > allMusics[i].agree) {
            rank++;
            prevAgree = allMusics[i].agree;
          }

          if (rank >= 4 || cnt >= divLimit) {
            break;
          }

          cnt++;
          rankDiv.push(
            <AnimatedItem
              style={{
                animationDelay: `${0.5 * cnt}s`,
                backgroundColor: colorCodes[cnt - 1],
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                {rank}등
              </div>
              <span
                style={{
                  flex: 9,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "14px",
                }}
              >
                {allMusics[i].title}
              </span>
            </AnimatedItem>
          );
        }

        setRanks(rankDiv);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const countTags = async (tags) => {
    let counts = {};

    tags.forEach((ele) => {
      if (counts[ele] === undefined) {
        counts[ele] = 1;
      } else {
        counts[ele]++;
      }
    });

    return counts;
  };

  const convertCountsToWords = (counts) => {
    const words = [];
    for (const [text, value] of Object.entries(counts)) {
      words.push({ text, value });
    }
    return words;
  };

  const tagToWords = async () => {
    const counts = await countTags(room.tags);
    const convertedWords = convertCountsToWords(counts);
    setWords(convertedWords);
  };

  const clickGoMainButton = async () => {
    // 리둑스에서 room 삭제

    deleteUserInRoom(user._id, room._id);
    socket.emit("room_updated", room._id);

    const action = setRoomNull();
    dispatch(action);
    if (isLoggedIn) {
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        alignSelf: "start",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="mt-3"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2
          style={{
            fontFamily: "IBMPlexSansKR-Regular",
          }}
        >
          동의를 많이 받은 음악
        </h2>
        {ranks}
      </div>

      <h2 style={{ fontFamily: "IBMPlexSansKR-Regular" }}>제안된 음악 태그</h2>
      <div>
        <ReactWordcloud words={words} />
      </div>

      <ButtonInPages
        onClick={() => {
          clickGoMainButton();
        }}
        className="mt-5"
      >
        메인으로
      </ButtonInPages>
    </div>
  );
}

// 각 요소에 적용될 애니메이션 정의
const floatAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedItem = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 50px;
  border-radius: 30px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-family: IBMPlexSansKR-Regular;
  animation: ${floatAnimation} 0.5s ease-in-out forwards;
  opacity: 0; /* 애니메이션이 시작될 때 요소를 투명하게 만듦 */
`;
