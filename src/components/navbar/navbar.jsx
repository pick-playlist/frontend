import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { persistor } from "~/store/store";
import { Navbar } from "react-bootstrap";
import { setInRoomFalse, setIsLoggedInFalse } from "~/store/reducers/user";
import { exitRoom } from "~/lib/util/room";
import socket from "~/lib/util/socket";

import io from "socket.io-client";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const inRoom = useSelector((state) => state.user.inRoom);
  const isHost = useSelector((state) => state.user.isHost);

  const exitRoomMsg = "방을 나가시겠습니까?";

  const confirmExitRoom = () => {
    return confirm(exitRoomMsg);
  };

  const onClickLogOut = () => {
    if (inRoom) {
      const exitRoomFlag = confirmExitRoom(exitRoomMsg);
      if (exitRoomFlag) {
        const action = setIsLoggedInFalse();
        dispatch(action);
        exitRoom(isHost, room._id, userObj._id);

        socket.emit("room_updated", room._id);

        navigate("/visualization");
      }
    } else {
      const action = setIsLoggedInFalse();
      dispatch(action);
      navigate("/");
    }
  };

  const onClickProfile = () => {
    if (userObj.isMember) {
      if (inRoom) {
        const exitRoomFlag = confirmExitRoom(exitRoomMsg);
        if (exitRoomFlag) {
          const action = setInRoomFalse();
          dispatch(action);
          exitRoom(isHost, room._id, userObj._id);
          socket.emit("room_updated", room._id);
          navigate("/visualization");
        }
      } else {
        navigate("/profile");
      }
    }
  };

  const onClickPickpl = () => {
    if (isLoggedIn) {
      if (inRoom) {
        const exitRoomFlag = confirmExitRoom(exitRoomMsg);
        if (exitRoomFlag) {
          const action = setInRoomFalse();
          dispatch(action);
          exitRoom(isHost, room._id, userObj._id);

          socket.emit("room_updated", room._id);

          navigate("/visualization");
        }
      } else navigate("/main");
    } else navigate("/");
  };

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        padding: "16px",
        backgroundColor: "#241C40",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: 700,
          marginRight: "auto",
          cursor: "pointer",
        }}
        onClick={() => onClickPickpl()}
      >
        PICKPL
      </div>

      {isLoggedIn ? (
        <>
          <div
            style={{
              color: "white",
              display: "flex",
              cursor: `${userObj.isMember ? "pointer" : ""}`,
            }}
            onClick={() => onClickProfile()}
          >
            {userObj.nickname}님
          </div>

          <div
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              color: "white",
              fontFamily: "IBMPlexSansKR-Regular",
            }}
            onClick={() => onClickLogOut()}
          >
            로그아웃
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
