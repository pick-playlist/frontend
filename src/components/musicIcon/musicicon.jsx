import React from "react";
import styled, { keyframes } from "styled-components";
import music from "../../assets/music-dynamic-gradient.png"; // 아이콘 이미지 경로

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const FloatingIcon = styled.img`
  animation: ${floatAnimation} 2s ease-in-out infinite; // 둥실둥실 애니메이션 적용
  width: 100%;
  height: 100%;
`;

const FloatingIconComponent = () => {
  return (
    <div
      style={{
        marginTop: "4vh",
        width: "280px",
        height: "250px",
        marginBottom: "4vh",
      }}
    >
      <FloatingIcon src={music} alt="Floating Icon" />
    </div>
  );
};

export default FloatingIconComponent;
