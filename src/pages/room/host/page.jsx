import React, { useState } from "react";
import YoutubePlayer from "~/components/youtubePlayer/YoutubePlayer";
import "./styles.css";
import { MusicNoteList, PlusCircleFill, XLg } from "react-bootstrap-icons";
import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ButtonInPages } from "~/components/styled/globalComponent";
import styled, { keyframes } from "styled-components";

export default function RoomHostPage() {
  const location = useLocation();
  const [link, setLink] = useState("");
  const [isPlusBtnClicked, setIsPlusBtnClicked] = useState(false);
  const video = {
    key: "mFbILexYSQg",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        alignSelf: "flex-start",
        width: "100%",
      }}
    >
      {isPlusBtnClicked ? (
        <StyledModalContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <XLg
              onClick={() => setIsPlusBtnClicked(false)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 18,
                top: 18,
                width: "20px",
                height: "20px",
              }}
            />
            <h3 style={{ alignSelf: "flex-start" }}>추가 할 유튜브 링크</h3>
            <Form>
              <Form.Control
                type="text"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                placeholder="유튜브 링크 주소를 입력해주세요."
                style={{
                  fontSize: "13px",
                  fontFamily: "IBMPlexSansKR-Regular",
                  width: "300px",
                  height: "50px",
                  backgroundColor: "#BDCAF2",
                  borderWidth: 0,
                  margin: 10,
                }}
              />
            </Form>
            <ButtonInPages onClick={() => setIsPlusBtnClicked(false)}>
              추가하기
            </ButtonInPages>
          </div>
        </StyledModalContent>
      ) : null}
      <YoutubePlayer video={video} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 class="titleText">승택님의 잼 🎶</h3>
        <div style={{ alignSelf: "flex-end" }}>
          <span>공유 코드 {location.state.code}</span>
        </div>
        <div>
          <h5>현재 재생중인 음악</h5>
          <span>비비 - 밤양갱</span>
        </div>
        <div style={{ marginTop: "10px" }}>
          <span>현재 3명이 참여중 </span>
          <div
            style={{
              display: "flex",
              position: "relative",
            }}
          >
            <div
              class="partyUserIcon"
              style={{
                zIndex: 2,
                backgroundColor: "#3C308C",
              }}
            >
              YR
            </div>
            <div
              class="partyUserIcon"
              style={{
                position: "absolute", // 겹치는 div에 position: absolute; 추가
                top: 0, // 원하는 위치로 조정
                left: "30px", // 원하는 위치로 조정
                zIndex: 1,
                backgroundColor: "#332973",
              }}
            >
              YH
            </div>
            <div
              class="partyUserIcon"
              style={{
                position: "absolute", // 겹치는 div에 position: absolute; 추가
                top: 0, // 원하는 위치로 조정
                left: "60px", // 원하는 위치로 조정
                backgroundColor: "#2F2359",
              }}
            >
              ST
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <MusicNoteList style={{ marginRight: "5px", width: "20px" }} />
              대기 중인 플레이리스트
            </div>
            <PlusCircleFill
              style={{ cursor: "pointer" }}
              onClick={() => setIsPlusBtnClicked(true)}
            />
          </h3>
          <div style={{ marginTop: "10px", marginBottom: "50px" }}>
            <Accordion defaultActiveKey="0" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  style={{ fontFamily: "IBMPlexSansKR-Regular" }}
                >
                  대기 중인 플레이리스트
                </Accordion.Header>
                <Accordion.Body style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                  아직 대기 중인 플레이리스트가 없습니다.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledModalContent = styled.div`
  maxwidth: 370px;
  width: 370px;
  position: fixed;
  top: 30%;
  z-index: 5;
  border-radius: 20px;
  padding: 20px;
  border: 3px solid #332973;
  background-color: white;
  animation: ${fadeIn} 0.5s forwards; // 모달이 나타날 때의 애니메이션
`;
