import React from "react";
import { Button, Container } from "react-bootstrap";
import logo from "../../assets/react.svg";
import { List } from "react-bootstrap-icons";

export default function MainPage() {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center min-vh-100"
    >
      <Container className="mt-3">
        <List size="40" style={{ cursor: "pointer" }} />
      </Container>
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          marginTop: "10vh",
          width: "60vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <img src={logo} style={{ width: 250, height: 250 }} />
        <h1>PICKPL</h1>
        <Button
          onClick={() => navigate("/main")}
          variant="outline-dark"
          style={{ width: "16vw", height: "6vh", marginTop: "5vh" }}
        >
          방 만들기
        </Button>
        <Button
          onClick={() => navigate("/main")}
          variant="outline-dark"
          style={{ width: "16vw", height: "6vh", margin: "5vh" }}
        >
          참여하기
        </Button>
      </div>
    </Container>
  );
}
