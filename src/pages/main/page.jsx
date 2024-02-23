import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import logo from "../../assets/react.svg";
import { List } from "react-bootstrap-icons";
import Sidebar from "~/components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <div>
      {sidebarVisible ? (
        <Sidebar setSidebarVisible={setSidebarVisible} />
      ) : (
        <></>
      )}
      <Container
        fluid
        className="d-flex flex-column align-items-center min-vh-100"
      >
        <Container className="mt-3">
          <List
            size="40"
            style={{ cursor: "pointer" }}
            onClick={() => setSidebarVisible(true)}
          />
        </Container>
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
          <Button
            onClick={() => navigate("/code", { state: { isCreateRoom: true } })}
            variant="outline-dark"
            style={{
              width: "200px",
              height: "6vh",
              marginTop: "5vh",
              fontFamily: "IBMPlexSansKR-Regular",
            }}
          >
            방 만들기
          </Button>
          <Button
            onClick={() =>
              navigate("/code", { state: { isCreateRoom: false } })
            }
            variant="outline-dark"
            style={{
              width: "200px",
              height: "6vh",
              margin: "5vh",
              fontFamily: "IBMPlexSansKR-Regular",
            }}
          >
            참여하기
          </Button>
        </div>
      </Container>
    </div>
  );
}
