import React, { useCallback } from "react";

import Start from "~/pages/start/page";
import GuestPage from "~/pages/start/guest/page";
import LoginPage from "~/pages/start/login/page";
import SignupPage from "~/pages/start/signup/page";
import MainPage from "~/pages/Main/page";
import CodePage from "~/pages/code/page";
import CodeHostPage from "~/pages/code/host/page";
import CodePartyPage from "~/pages/code/party/page";
import RoomPage from "~/pages/room/page";
import RoomHostPage from "~/pages/room/host/page";
import RoomPartyPage from "~/pages/room/party/page";
import FinishPage from "~/pages/room/finish/page";
import ProfilePage from "~/pages/profile/page";

export const mainRouter = [
  {
    path: "",
    element: <Start />,
    children: [
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
    ],
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/code",
    element: <CodePage />,
    children: [
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
    ],
  },
  {
    path: "/room",
    element: <RoomPage />,
    children: [
      {
        path: "/host",
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
    ],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];
