import React, { useState } from "react";
import logo from "../../../assets/react.svg";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";

export default function GuestPage() {
  const [nickname, setNickname] = useState("");
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
        <Form>
          <Form.Control
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 입력해주세요."
            style={{
              width: "200px",
              height: "6vh",
              backgroundColor: "#F7DFFF",
              borderWidth: 0,
              margin: 20,
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
