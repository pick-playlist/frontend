import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { persistor } from "~/store/store";
import { Navbar } from "react-bootstrap";
import { setIsLoggedInFalse } from "~/store/reducers/user";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.user.data);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onClickLogOut = () => {
    const action = setIsLoggedInFalse();
    dispatch(action);
    navigate("/");
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
      {isLoggedIn ? (
        <>
          <div style={{ color: "white", display: "flex" }}>
            {userObj.nickname}님
            <img
              src={userObj.profilePhoto ? userObj.profilePhoto : userIcon}
              style={{
                marginLeft: "5px",
                width: "25px",
                height: "25px",
                backgroundColor: "white",
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: `${userObj.isMember ? "pointer" : ""}`,
              }}
              onClick={userObj.isMember ? () => navigate("/profile") : null} // Conditional onClick
            />
          </div>

          <div
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              color: "white",
              fontSize: "17px",
              fontFamily: "IBMPlexSansKR-Regular",
            }}
            onClick={() => onClickLogOut()}
          >
            로그아웃
          </div>
        </>
      ) : (
        <div style={{ color: "white", display: "flex", fontWeight: 700 }}>
          PICKPL{" "}
        </div>
      )}
    </div>
  );
}
