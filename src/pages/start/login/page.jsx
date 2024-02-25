import React from "react";
import logo from "../../../assets/react.svg";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ButtonInPages } from "~/components/styled/globalComponent";
import { logIn } from "~/store/reducers/user";
import { useDispatch } from "react-redux";

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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일을 입력해주세요."
            style={{
              fontFamily: "IBMPlexSansKR-Regular",
              width: "200px",
              height: "6vh",
              backgroundColor: "#F7DFFF",
              borderWidth: 0,
              margin: 20,
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
              fontFamily: "IBMPlexSansKR-Regular",
              width: "200px",
              height: "6vh",
              backgroundColor: "#F7DFFF",
              borderWidth: 0,
              margin: 20,
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
