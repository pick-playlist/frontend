import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactWordcloud from "react-wordcloud";
import { ButtonInPages } from "~/components/styled/globalComponent";
import { getPlaylistInfo } from "~/lib/api/playlist";
import { deleteRoom, deleteUserInRoom } from "~/lib/api/room";
import { setRoomNull } from "~/store/reducers/room";
import { setIsLoggedInFalse } from "~/store/reducers/user";

export default function Visualization() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const isHost = useSelector((state) => state.user.isHost);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const room = useSelector((state) => state.room.data);

  const [words, setWords] = useState([]);

  useEffect(() => {
    makeRank(room);
    tagToWords();
  }, []);

  const makeRank = async (room) => {
    const roomId = room._id;
    const acceptPlaylistId = room.acceptPlaylist._id;
    const rejectPlaylistId = room.rejectPlaylist._id;

    console.log("pl ids: ", acceptPlaylistId, " ", rejectPlaylistId);

    getPlaylistInfo("ac: ", acceptPlaylistId);

    getPlaylistInfo("rj: ", rejectPlaylistId);
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
    const action = setRoomNull();
    dispatch(action);

    if (isLoggedIn) {
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ alignSelf: "start" }}>
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
