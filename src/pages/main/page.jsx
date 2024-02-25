import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import Sidebar from "~/components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { ButtonInPages } from "~/components/styled/globalComponent";
import FloatingIconComponent from "~/components/musicIcon/musicicon";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center min-vh-100"
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
          <ButtonInPages
            onClick={() => navigate("/code", { state: { isCreateRoom: true } })}
          >
            방 만들기
          </ButtonInPages>
          <ButtonInPages
            onClick={() =>
              navigate("/code", { state: { isCreateRoom: false } })
            }
          >
            참여하기
          </ButtonInPages>
        </div>
      </Container>
    </>
  );
}
