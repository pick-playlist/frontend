import React, { useState } from "react";
import logo from "../../../assets/react.svg";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";
import FloatingIconComponent from "~/components/musicIcon/musicIcon";

export default function GuestPage() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
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
        <Form>
          <Form.Control
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 입력해주세요."
            style={{
              fontSize: "13px",
              width: "200px",
              height: "6vh",
              backgroundColor: "#F7DFFF",
              borderWidth: 0,
              margin: 10,
              fontFamily: "IBMPlexSansKR-Regular",
            }}
          />
        </Form>
        <ButtonInPages onClick={() => navigate("/main")}>
          비회원 로그인
        </ButtonInPages>
      </div>
    </Container>
  );
}
