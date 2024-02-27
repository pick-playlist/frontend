import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { persistor } from "~/store/store";
import { Navbar } from "react-bootstrap";
import { setInRoomFalse, setIsLoggedInFalse } from "~/store/reducers/user";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.user.data);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const inRoom = useSelector((state) => state.user.inRoom);
  const exitRoomMsg = "방을 나가시겠습니까?";

  const confirmExitRoom = () => {
    return confirm(exitRoomMsg);
  };

  const onClickLogOut = () => {
    if (inRoom) {
      const exitRoom = confirmExitRoom(exitRoomMsg);
      if (exitRoom) {
        const action = setIsLoggedInFalse();
        dispatch(action);
        navigate("/");
      }
    } else {
      const action = setIsLoggedInFalse();
      dispatch(action);
      navigate("/");
    }
  };

  const onClickPickpl = () => {
    if (isLoggedIn) {
      if (inRoom) {
        const exitRoom = confirmExitRoom(exitRoomMsg);
        if (exitRoom) {
          navigate("/main");
          const action = setInRoomFalse();
          dispatch(action);
        }
      }
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
            onClick={userObj.isMember ? () => navigate("/profile") : null}
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
