import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Container className="min-vh-100">
        <Outlet />
      </Container>
    </>
  );
}
