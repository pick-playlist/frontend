import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";

export default function NavBar() {
  const navigate = useNavigate();
  const userObj = useSelector((state) => state.user);
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
      {userObj.data.isMember ? (
        <img
          src={userObj.data.profilePhoto ? userObj.data.profilePhoto : userIcon}
          style={{
            width: "25px",
            backgroundColor: "white",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/profile")}
        />
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
