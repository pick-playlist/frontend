import React from "react";
import music from "../../assets/music-dynamic-gradient.png";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";
import FloatingIconComponent from "~/components/musicIcon/musicIcon";
export default function StartPage() {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center min-vh-100"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>PICKPL</h1>
        <span style={{ fontSize: "15px", fontFamily: "IBMPlexSansKR-Regular" }}>
          모두 함께 만드는 공유 플레이리스트 🎶
        </span>
        <FloatingIconComponent />

        {/* <ButtonInPages onClick={() => navigate("/login")}>로그인</ButtonInPages> */}
        {/* <ButtonInPages onClick={() => navigate("/signup")}>
          회원가입
        </ButtonInPages> */}
        <ButtonInPages onClick={() => navigate("/guest")}>
          비회원으로 이용하기
        </ButtonInPages>
      </div>
    </Container>
  );
}
