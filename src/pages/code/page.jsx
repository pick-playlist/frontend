import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";
import girl from "~/assets/girl-dynamic-color.png";
import boy from "~/assets/boy-dynamic-color.png";
import chat from "~/assets/chat-bubble-dynamic-color.png";
import { createRoom, getRoomInfoWithCode } from "~/store/reducers/room";
import { useDispatch, useSelector } from "react-redux";

export default function CodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState();

  useEffect(() => {
    console.log("code: ", code);
  }, [code]);

  const onClickReady = async () => {
    if (location.state.isCreateRoom) {
      navigate({ pathname: "/room/host", search: `?code=${code}` });
    } else {
      try {
        const action = getRoomInfoWithCode({ roomCode: code });
        console.log(action);
        const resultAction = await dispatch(action);
        if (getRoomInfoWithCode.fulfilled.match(resultAction)) {
          navigate({ pathname: "/room/party", search: `?code=${code}` });
        } else {
          alert("방을 찾을 수 없습니다. 다시 입력해주세요.");
        }
      } catch (error) {
        console.error("Error while getting room info:", error);
        alert("방을 찾는 중 오류가 발생했습니다. 다시 입력해주세요.");
      }
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {location.state.isCreateRoom ? (
          <div
            style={{
              display: "flex",
              position: "relative",
              marginBottom: "20px",
            }}
          >
            <img
              src={chat}
              style={{
                position: "absolute",
                top: -95,
                left: 75,
                width: 150,
                height: 150,
              }}
            />
            <img src={girl} style={{ width: 150, height: 150 }} />
            <img src={boy} style={{ width: 150, height: 150 }} />
          </div>
        ) : null}

        <h1 style={{ fontSize: "40px" }}>PICKPL</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "stretch",
          }}
        >
          {location.state.isCreateRoom ? (
            <>
              <h3>참여코드를 공유해주세요!</h3>
              <ShowNumberCode setParentCode={setCode} />
            </>
          ) : (
            <>
              <h3>참여코드를 입력해주세요!</h3>
              <NeedNumberCode setParentCode={setCode} />
            </>
          )}
        </div>
        <ButtonInPages
          style={{ marginTop: "40px" }}
          onClick={() => onClickReady()}
        >
          READY!
        </ButtonInPages>
      </div>
    </Container>
  );
}

const NeedNumberCode = ({ setParentCode }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const refInput = [useRef(), useRef(), useRef(), useRef()];

  const onChangeInputCode = (index, value) => {
    const isInserted = value !== "";
    if (index < 3 && isInserted) {
      const nextInput = document.getElementById(`input${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    setCode((prevCode) => {
      const newState = [...prevCode];
      newState[index] = value;
      return newState;
    });
  };
  // 최종 코드 확인 및 부모 컴포넌트로 전달
  useEffect(() => {
    const finalCode = code.join(""); // 배열의 요소를 문자열로 합치기
    if (finalCode.length == 4) setParentCode(finalCode);
  }, [code, setParentCode]);
  return (
    <div>
      {code.map((num, index) => (
        <input
          key={index}
          id={`input${index}`}
          type="text"
          maxLength={1}
          value={num}
          onChange={(e) => onChangeInputCode(index, e.target.value)}
          ref={refInput[index]}
          style={{
            border: "none",
            borderBottom: "4px solid black",
            width: "50px",
            height: "7vh",
            textAlign: "center",
            margin: 10,
          }}
        />
      ))}
    </div>
  );
};

const ShowNumberCode = ({ setParentCode }) => {
  const [code, setCode] = useState("0000");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);

  useEffect(() => {
    if (user) {
      const action = createRoom({ userId: user._id });
      console.log(action);
      dispatch(action);
      setCode(room.code);
      setParentCode(room.code);
    }
  }, []);

  return (
    <div>
      <h2 style={{ fontFamily: "IBMPlexSansKR-Regular", fontWeight: "bold" }}>
        {code}
      </h2>
    </div>
  );
};
