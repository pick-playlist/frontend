import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "~/components/navbar/navbar";
export default function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "450px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <NavBar />
        <Container
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Container>
      </div>
    </div>
  );
}
