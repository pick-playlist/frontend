import React from "react";
import logo from "../../assets/react.svg";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <Container fluid className="d-flex justify-content-center min-vh-100">
      <div
        style={{
          backgroundColor: "white",
          marginTop: "10vh",
          height: "100%",
          width: "60vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <h1>PICKPL</h1>
        <img
          src={logo}
          style={{ width: 250, height: 250, marginBottom: "10vh" }}
        />
        <ButtonInPages onClick={() => navigate("/login")}>로그인</ButtonInPages>
        <ButtonInPages onClick={() => navigate("/signup")}>
          회원가입
        </ButtonInPages>
        <ButtonInPages onClick={() => navigate("/guest")}>
          비회원으로 이용하기
        </ButtonInPages>
      </div>
    </Container>
  );
}
