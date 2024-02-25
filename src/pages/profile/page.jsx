import React, { useState, useEffect } from "react";
import { Accordion, Container } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import userIcon from "../../assets/user.png";

export default function ProfilePage() {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercentage((prevProgress) => prevProgress + 10); // 10씩 증가하며 100까지 증가
    }, 100); // 1초마다 업데이트

    console.log(percentage);
    if (percentage > 78) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트되면 타이머 해제
    };
  }, [percentage]);
  return (
    <Container fluid className="d-flex justify-content-center min-vh-100">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px", // 이렇게 하면 안될것같은디 -yeri
        }}
      >
        <img
          src={userIcon}
          style={{ width: "150px", height: "150px", marginBottom: "5px" }}
        />
        <h2 style={{ fontFamily: "OAGothic-ExtraBold" }}>SEUNGTOKTOK</h2>
        <p style={{ fontFamily: "IBMPlexSansKR-Regular" }}>user@gmail.com</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              fontFamily: "IBMPlexSansKR-Regular",
            }}
          >
            나의 음악 등록 성공률 🎶
          </h4>
          <span
            style={{
              alignSelf: "flex-end",
              marginRight: "10px",
              fontSize: "20px",
              fontFamily: "IBMPlexSansKR-Regular",
            }}
          >
            78%
          </span>
          <div
            style={{
              marginBottom: "20px",
              width: "400px",
              height: "15px",
              borderRadius: 20,
              backgroundColor: "lightgray",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                height: "15px",
                borderRadius: 20,
                backgroundColor: "#3C308C",
                transition: "width 1s ease-out",
              }}
            />
          </div>
        </div>
        <div style={{ width: "420px" }}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                나의 플레이리스트
              </Accordion.Header>
              <Accordion.Body style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                나의 플레이리스트구만요
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                수락된 플레이리스트
              </Accordion.Header>
              <Accordion.Body style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                수락된 플레이리스트구만요~
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                거절된 플레이리스트
              </Accordion.Header>
              <Accordion.Body style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
                거절된 플레이리스트야!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </Container>
  );
}
