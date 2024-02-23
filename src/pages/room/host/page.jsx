import React from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";

export default function RoomHostPage() {
  const video = {
    key: "dD88Hr9lDZU",
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
        <h3>승택님의 잼잼잼잼~~~~</h3>
        <div>
          <h5>현재 재생중인 음악 🎶</h5>
          <p>비비 - 밤양갱</p>
        </div>
        <div>현재 3명이 참여중</div>
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              color: "#fff",
              width: "40px",
              height: "40px",
              backgroundImage: "linear-gradient(#3d7fff, #4b5dff)",
              border: "1px solid #3961d9",
              borderRadius: "100%",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              display: "flex",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(74, 58, 255, .26)",
              zIndex: 2,
            }}
          >
            YR
          </div>
          <div
            style={{
              color: "#fff",
              width: "40px",
              height: "40px",
              backgroundImage: "linear-gradient(#3d7fff, #4b5dff)",
              border: "1px solid #3961d9",
              borderRadius: "100%",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              display: "flex",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(74, 58, 255, .26)",
              position: "absolute", // 겹치는 div에 position: absolute; 추가
              top: 0, // 원하는 위치로 조정
              left: "30px", // 원하는 위치로 조정
              zIndex: 1,
            }}
          >
            YH
          </div>
          <div
            style={{
              color: "#fff",
              width: "40px",
              height: "40px",
              backgroundImage: "linear-gradient(#3d7fff, #4b5dff)",
              border: "1px solid #3961d9",
              borderRadius: "100%",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              display: "flex",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(74, 58, 255, .26)",
              position: "absolute", // 겹치는 div에 position: absolute; 추가
              top: 0, // 원하는 위치로 조정
              left: "60px", // 원하는 위치로 조정
            }}
          >
            ST
          </div>
        </div>
      </div>
    </div>
  );
}
