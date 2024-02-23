import React from "react";
import { createBrowserRouter } from "react-router-dom";

//pages
import StartPage from "~/pages/start/page";
import GuestPage from "~/pages/start/guest/page";
import LoginPage from "~/pages/start/login/page";
import SignupPage from "~/pages/start/signup/page";
import MainPage from "~/pages/main/page";
import CodePage from "~/pages/code/page";
import CodeHostPage from "~/pages/code/host/page";
import CodePartyPage from "~/pages/code/party/page";
import RoomPage from "~/pages/room/page";
import RoomHostPage from "~/pages/room/host/page";
import RoomPartyPage from "~/pages/room/party/page";
import FinishPage from "~/pages/room/finish/page";
import ProfilePage from "~/pages/profile/page";
import MainLayout from "~/pages/layout";

export const mainRouter = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <StartPage />,
        index: true,
      },
      {
        path: "/guest",
        index: true,
        element: <GuestPage />,
      },
      {
        path: "/login",
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/signup",
        index: true,
        element: <SignupPage />,
      },
      {
        path: "/main",
        index: true,
        element: <MainPage />,
      },
      {
        path: "/code",
        element: <CodePage />,
      },
      {
        path: "/host",
        index: true,
        element: <CodeHostPage />,
      },
      {
        path: "/party",
        index: true,
        element: <CodePartyPage />,
      },
      {
        path: "/room",
        element: <RoomPage />,
      },
      {
        path: "/room/host",
        index: true,
        element: <RoomHostPage />,
      },
      {
        path: "/party",
        index: true,
        element: <RoomPartyPage />,
      },
      {
        path: "/finish",
        index: true,
        element: <FinishPage />,
      },
      {
        path: "/profile",
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
