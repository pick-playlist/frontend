import React from "react";
import { X } from "react-bootstrap-icons";
import logo from "../../assets/react.svg";
import styled, { css, keyframes } from "styled-components";
import { Accordion } from "react-bootstrap";

export default function Sidebar(props) {
  return (
    <AnimationComponent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#241C40",
          width: "50vw",
          height: "100vh",
          position: "fixed",
          left: 0,
          padding: 20,
        }}
      >
        <X
          size="40"
          style={{
            cursor: "pointer",
            color: "white",
            alignSelf: "flex-end",
            marginBottom: 20,
          }}
          onClick={() => props.setSidebarVisible(false)}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} style={{ flex: 1 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 2,
              marginLeft: "10%",
            }}
          >
            <span style={{ color: "white" }}>예리</span>
            <span style={{ color: "#C5C5C5" }}>노래 등록 성공률</span>
          </div>
        </div>
        <Accordion className="mt-3" defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>나의 플레이리스트</Accordion.Header>
            <Accordion.Body>ㄴ이ㅏ러ㅣㄴㅇ라ㅓㅇ나ㅡ</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>수락된 플레이리스트</Accordion.Header>
            <Accordion.Body>수락된 플레이리스트 목록입니다.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>거절된 플레이리스트</Accordion.Header>
            <Accordion.Body>거절된 플레이리스트 목록입니다.</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </AnimationComponent>
  );
}

const slideAnimation = keyframes`
0% {
  width:0vw;
}

50% {
  width:25vw;
}

100%{
  width:50vw;
}
`;

const AnimationComponent = styled.div`
  animation: ${slideAnimation} infinite;
`;
