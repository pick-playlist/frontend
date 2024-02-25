import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ButtonInPages } from "~/components/styled/globalComponent";
import { logIn } from "~/store/reducers/user";
import { useDispatch } from "react-redux";
import FloatingIconComponent from "~/components/musicIcon/musicicon";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogIn = () => {
    const action = logIn({ email, password });
    dispatch(action);
    navigate("/main");
  };

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
        <Form>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일을 입력해주세요."
            style={{
              fontSize: "13px",
              fontFamily: "IBMPlexSansKR-Regular",
              width: "200px",
              height: "6vh",
              backgroundColor: "#F7DFFF",
              borderWidth: 0,
              margin: 10,
            }}
          />
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력해주세요."
            style={{
              fontSize: "13px",
              fontFamily: "IBMPlexSansKR-Regular",
              width: "200px",
              height: "6vh",
              backgroundColor: "#F7DFFF",
              borderWidth: 0,
              margin: 10,
            }}
          />
        </Form>
        <ButtonInPages onClick={() => onClickLogIn()}>LOGIN</ButtonInPages>
        <p
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontFamily: "IBMPlexSansKR-Regular",
          }}
          onClick={() => navigate("/signup")}
        >
          회원가입
        </p>
      </div>
    </Container>
  );
}
