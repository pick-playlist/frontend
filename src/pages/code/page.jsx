import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";
import girl from "~/assets/girl-dynamic-color.png";
import boy from "~/assets/boy-dynamic-color.png";
import chat from "~/assets/chat-bubble-dynamic-color.png";
import { createRoom } from "~/store/reducers/room";
import { useDispatch, useSelector } from "react-redux";

export default function CodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);

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
              <ShowNumberCode user={user} room={room} />
            </>
          ) : (
            <>
              <h3>참여코드를 입력해주세요!</h3>
              <NeedNumberCode />
            </>
          )}
        </div>
        <ButtonInPages
          style={{ marginTop: "40px" }}
          onClick={() => {
            location.state.isCreateRoom
              ? navigate("/room/host", { state: { code: room.code } })
              : navigate("/room/party");
          }}
        >
          READY!
        </ButtonInPages>
      </div>
    </Container>
  );
}

const NeedNumberCode = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const refInput = [useRef(), useRef(), useRef(), useRef()];

  const onChangeInputCode = (index, value) => {
    const isInserted = value !== "";
    if (index < 3 && isInserted) {
      const nextInput = document.getElementById(`input${index + 1}`);
      if (nextInput) nextInput.focus();
      // refInput[index + 1].current.focus();
    }

    setCode((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

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

const ShowNumberCode = (props) => {
  const [code, setCode] = useState("0000");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.user) {
      const action = createRoom({ userId: props.user._id });
      console.log(action);
      dispatch(action);
      setCode(props.room.code);
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
