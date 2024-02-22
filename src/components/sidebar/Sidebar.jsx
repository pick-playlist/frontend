import React from "react";
import { X } from "react-bootstrap-icons";
import logo from "../../assets/react.svg";

export default function Sidebar(props) {
  return (
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
    </div>
  );
}
