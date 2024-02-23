import React from "react";
import logo from "../../assets/react.svg";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        <Button
          onClick={() => navigate("/login")}
          variant="outline-dark"
          style={{
            width: "200px",
            height: "7vh",
            margin: 5,
            fontFamily: "IBMPlexSansKR-Regular",
          }}
        >
          로그인
        </Button>
        <Button
          onClick={() => navigate("/signup")}
          variant="outline-dark"
          style={{
            width: "200px",
            height: "7vh",
            margin: 5,
            fontFamily: "IBMPlexSansKR-Regular",
          }}
        >
          회원가입
        </Button>
        <Button
          onClick={() => navigate("/guest")}
          variant="outline-dark"
          style={{
            width: "200px",
            height: "7vh",
            margin: 5,
            fontFamily: "IBMPlexSansKR-Regular",
          }}
        >
          비회원으로 이용하기
        </Button>
      </div>
    </Container>
  );
}
