import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";

export default function NavBar() {
  const navigate = useNavigate();
  const userObj = useSelector((state) => state.user.data);
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
      {userObj.isMember ? (
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
              cursor: "pointer",
            }}
            onClick={() => navigate("/profile")}
          />
        </div>
      ) : (
        <div
          style={{
            cursor: "pointer",
            color: "white",
            fontSize: "17px",
            fontFamily: "IBMPlexSansKR-Regular",
          }}
          onClick={() => navigate("/login")}
        >
          로그인
        </div>
      )}
    </div>
  );
}
