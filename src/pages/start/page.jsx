import React from "react";
import logo from "../../assets/react.svg";
import { Button, Container } from "react-bootstrap";

export default function StartPage() {
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
          variant="outline-dark"
          style={{ width: "20vw", height: "7vh", margin: 5 }}
        >
          로그인
        </Button>
        <Button
          variant="outline-dark"
          style={{ width: "20vw", height: "7vh", margin: 5 }}
        >
          회원가입
        </Button>
        <Button
          variant="outline-dark"
          style={{ width: "20vw", height: "7vh", margin: 5 }}
        >
          비회원으로 이용하기
        </Button>
      </div>
    </Container>
  );
}
