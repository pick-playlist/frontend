import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";
import {
  FULFILLED,
  PENDING,
  REJECTED,
  guestLogIn,
  setIsLoggedInTrue,
} from "~/store/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import FloatingIconComponent from "~/components/musicIcon/musicicon";

export default function GuestPage() {
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const userLoading = useSelector((state) => state.user.loading);

  const [ready, setReady] = useState(false); // 로그인 버튼 눌렀다면 true

  const onClickGuestLogIn = async () => {
    setReady(true);
    const action = guestLogIn({ nickname });
    await dispatch(action);
  };

  useEffect(() => {
    if (ready) {
      switch (userLoading) {
        case FULFILLED:
          const action = setIsLoggedInTrue();
          dispatch(action);
          navigate("/main");
          break;
        case PENDING:
          break;
        case REJECTED:
          alert(
            "로그인에 실패하였습니다. \n 닉네임 확인 후 다시 시도해주세요."
          );
          break;
        default:
          break;
      }
    }
  }, [user, userLoading]);

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
        <ButtonInPages onClick={() => onClickGuestLogIn()}>
          비회원 로그인
        </ButtonInPages>
      </div>
    </Container>
  );
}
