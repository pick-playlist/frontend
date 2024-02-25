import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "~/components/navbar/navbar";
export default function MainLayout() {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <NavBar />
      <Container
        // className="min-vh-100"
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          maxWidth: "450px",
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
}
