import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";
import { signUp } from "~/store/reducers/user";
import { useDispatch } from "react-redux";
import FloatingIconComponent from "~/components/musicIcon/musicicon";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onClickSignUp = () => {
    const action = signUp({ email, password, nickname });
    dispatch(action);
    navigate("/login");
  };

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
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일을 입력해주세요."
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
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력해주세요."
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
        <ButtonInPages onClick={() => onClickSignUp()}>SIGN UP</ButtonInPages>
      </div>
    </Container>
  );
}
