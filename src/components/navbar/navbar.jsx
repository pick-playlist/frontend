import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
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
          cursor: "pointer",
          color: "white",
          fontSize: "17px",
          fontFamily: "IBMPlexSansKR-Regular",
        }}
        onClick={() => navigate("/login")}
      >
        로그인
      </div>
    </div>
  );
}
