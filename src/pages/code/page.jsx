import React, { useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";

export default function CodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center min-vh-100"
    >
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
              <ShowNumberCode />
            </>
          ) : (
            <>
              <h3>참여코드를 입력해주세요!</h3>
              <NeedNumberCode />
            </>
          )}
        </div>
        <Button
          onClick={() => {
            location.state.isCreateRoom
              ? navigate("/room/host")
              : navigate("/room/party");
          }}
          variant="outline-dark"
          style={{ width: "16vw", height: "6vh", margin: "5vh" }}
        >
          READY!
        </Button>
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
            width: "5vw",
            height: "7vh",
            textAlign: "center",
            margin: 10,
          }}
        />
      ))}
    </div>
  );
};

const ShowNumberCode = () => {
  return (
    <div>
      <h1>1 2 3 4 5 6</h1>
    </div>
  );
};
