import React, { useState } from "react";
import activeThumbUp from "../../assets/thumb-up-dynamic-color.png";
import activeThumbDown from "../../assets/thumb-down-dynamic-color.png";
import deactiveThumbUp from "../../assets/thumb-up-dynamic-clay.png";
import deactiveThumbDown from "../../assets/thumb-down-dynamic-clay.png";
import styled from "styled-components";

export default function VoteComponent() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>비비 - 밤양갱 추가해줘요</div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {isActive ? (
          <HoverableImage
            src={activeThumbUp}
            onClick={() => setIsActive(false)}
          />
        ) : (
          <img
            src={deactiveThumbUp}
            style={{
              width: "80px",
              height: "80px",
              zIndex: 1,
            }}
          />
        )}
        <div
          style={{
            backgroundColor: "white",
            height: "14px",
            width: "320px",
            position: "absolute",
            border: "1px solid black",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        {isActive ? (
          <HoverableImage
            src={activeThumbDown}
            onClick={() => setIsActive(false)}
          />
        ) : (
          <img
            src={deactiveThumbDown}
            style={{
              width: "80px",
              height: "80px",
              zIndex: 1,
            }}
          />
        )}
      </div>
    </div>
  );
}

// 스타일드 컴포넌트 생성
const HoverableImage = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* 이미지를 1.1배 확대 */
  }
`;
