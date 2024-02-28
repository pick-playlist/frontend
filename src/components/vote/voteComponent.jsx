import React, { useState } from "react";
import activeThumbUp from "../../assets/thumb-up-dynamic-color.png";
import activeThumbDown from "../../assets/thumb-down-dynamic-color.png";
import deactiveThumbUp from "../../assets/thumb-up-dynamic-clay.png";
import deactiveThumbDown from "../../assets/thumb-down-dynamic-clay.png";
import styled from "styled-components";
import { fetchUser } from "~/lib/api/user";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import PlaylistComponent from "../roomInfo/playlistComponent";

export default function VoteComponent(props) {
  const [isActive, setIsActive] = useState(true);
  const [proposer, setProposer] = useState("");

  useEffect(() => {
    setIsActive(true);
  }, [props.currentMusic._id]);

  const getProposer = async () => {
    const tmp = await fetchUser(props.currentMusic.proposer);
    setProposer(tmp.nickname);
  };

  const barColors = React.useMemo(() => {
    if (props.currentMusic.agree + props.currentMusic.reject === 0) {
      return [0, 0];
    }
    const total = (props.currentMusic.agree + props.currentMusic.reject) / 100;

    return [
      props.currentMusic.agree / total,
      props.currentMusic.reject / total,
    ];
  }, [props.currentMusic]);
  console.log(props.currentMusic);

  useEffect(() => {
    getProposer();
  }, [props.currentMusic._id]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* <h5 style={{ fontFamily: "OAGothic-ExtraBold" }}>NOW</h5>
        <span style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
          {props.currentMusic.title}
        </span>
        <p style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
          {proposer}님의 코멘트 : {props.currentMusic.comment}
        </p> */}
        <Card>
          <Card.Body>
            <Card.Title style={{ fontFamily: "OAGothic-ExtraBold" }}>
              NOW...
            </Card.Title>
            <Card.Subtitle style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
              {/* {props.currentMusic.title} */}
              <div
                key={props.currentMusic._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  // maxHeight: "150px",
                }}
              >
                <img
                  src={props.currentMusic.thumbnail}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />
                {props.currentMusic.title}
              </div>
            </Card.Subtitle>
            {/* <Card.Text style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
              {proposer}님의 코멘트 : {props.currentMusic.comment}
            </Card.Text> */}

            <Card className="mt-3">
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "IBMPlexSansKR-Regular",
                }}
              >
                {/* <blockquote className="blockquote mb-0">
                  <p> {props.currentMusic.comment} </p>
                  <footer className="blockquote-footer">{proposer}</footer>
                </blockquote> */}
                <span>{props.currentMusic.comment}</span>
                <span style={{ alignSelf: "flex-end", fontSize: "small" }}>
                  - {proposer} -
                </span>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {isActive ? (
          <HoverableImage
            src={activeThumbUp}
            onClick={() => {
              props.clickAgreeButton();
              setIsActive(false);
            }}
          />
        ) : (
          <img
            src={deactiveThumbUp}
            style={{
              width: "80px",
              height: "80px",
              zIndex: 1,
            }}
          />
        )}
        <div
          style={{
            backgroundColor: "lightgray",
            display: "flex",
            height: "14px",
            width: "350px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${barColors[0]}%`,
              backgroundColor: "#1665DD",
              // transition: "width 1s ease-out",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "19%",
                top: -2,
                zIndex: 2,
                fontSize: "12px",
                color: "white",
              }}
            >
              {props.currentMusic.agree}
            </span>
          </div>
          <div
            onTransitionEnd={(e) => {
              console.log("반대 애니메이션");
              if (e.target === e.currentTarget) {
                // your logic here
              }
            }}
            style={{
              height: "100%",
              width: `${barColors[1]}%`,

              backgroundColor: "#FE4D58",
              // transition: "width 1s ease-out",
            }}
          >
            <span
              style={{
                position: "absolute",
                right: "18%",
                top: -2,
                zIndex: 2,
                fontSize: "12px",
                color: "white",
              }}
            >
              {props.currentMusic.reject}
            </span>
          </div>
        </div>
        {isActive ? (
          <HoverableImage
            src={activeThumbDown}
            onClick={() => {
              props.clickRejectButton();
              setIsActive(false);
            }}
          />
        ) : (
          <img
            src={deactiveThumbDown}
            style={{
              width: "80px",
              height: "80px",
              zIndex: 1,
            }}
          />
        )}
      </div>
      <span style={{ fontFamily: "IBMPlexSansKR-Regular" }}>
        {Math.ceil(props.usersLength / 2) - props.currentMusic.reject} 명 더
        반대하면 다음 노래로 !
      </span>
    </div>
  );
}

// 스타일드 컴포넌트 생성
const HoverableImage = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* 이미지를 1.1배 확대 */
  }
`;
