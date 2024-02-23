import React from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";
import "./styles.css";

export default function RoomHostPage() {
  const video = {
    key: "mFbILexYSQg",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <YoutubePlayer video={video} />
      <div
        style={{
          width: "100vw",
          padding: 15,
        }}
      >
        <h3 class="titleText">승택님의 잼</h3>
        <div>
          <h5>현재 재생중인 음악</h5>
          <p>비비 - 밤양갱 🎶</p>
        </div>
        <p>현재 3명이 참여중 </p>
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <div
            class="partyUserIcon"
            style={{
              zIndex: 2,
              backgroundColor: "#3C308C",
            }}
          >
            YR
          </div>
          <div
            class="partyUserIcon"
            style={{
              position: "absolute", // 겹치는 div에 position: absolute; 추가
              top: 0, // 원하는 위치로 조정
              left: "30px", // 원하는 위치로 조정
              zIndex: 1,
              backgroundColor: "#332973",
            }}
          >
            YH
          </div>
          <div
            class="partyUserIcon"
            style={{
              position: "absolute", // 겹치는 div에 position: absolute; 추가
              top: 0, // 원하는 위치로 조정
              left: "60px", // 원하는 위치로 조정
              backgroundColor: "#2F2359",
            }}
          >
            ST
          </div>
        </div>
      </div>
    </div>
  );
}
