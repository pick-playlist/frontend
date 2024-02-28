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

  useEffect(() => {
    makeRank(room);
    tagToWords();
  }, []);

  const makeRank = async (room) => {
    try {
      const roomId = room._id;
      const acceptPlaylistId = room.acceptPlaylist._id;
      const rejectPlaylistId = room.rejectPlaylist._id;
      const remainPlaylistId = room.remainPlaylist._id;

      const acceptResp = await getPlaylistInfo(acceptPlaylistId);
      const acceptMusics = acceptResp.musics;

      const rejectResp = await getPlaylistInfo(rejectPlaylistId);
      const rejectMusics = rejectResp.musics;

      const remainResp = await getPlaylistInfo(remainPlaylistId);
      const remainMusics = remainResp.musics;

      const allMusics = await acceptMusics.concat(rejectMusics);
      allMusics.push(remainMusics[0]);

      let rankDiv = [];

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
            <div key={allMusics[i]._id}>
              <p>
                [{rank}], {allMusics[i].title}
              </p>
            </div>
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
    if (user != null && room != null) {
      deleteUserInRoom(user._id, room._id);

      const action = setRoomNull();
      dispatch(action);
    }

    if (isLoggedIn) {
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ alignSelf: "start" }}>
      <div className="mt-3">
        <h2>동의를 많이 받은 음악</h2>
        {ranks ? (
          ranks
        ) : (
          <p>
            을 알려드리려고 했는데...
            <br />
            음악을 끝까지 듣지 않으셨군요 ^^;;
          </p>
        )}
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
