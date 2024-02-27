import React from "react";
import { createBrowserRouter } from "react-router-dom";

//pages
import StartPage from "~/pages/start/page";
import GuestPage from "~/pages/start/guest/page";
import LoginPage from "~/pages/start/login/page";
import SignupPage from "~/pages/start/signup/page";
import MainPage from "~/pages/main/page";
import CodePage from "~/pages/code/page";
import RoomHostPage from "~/pages/room/host/page";
import RoomPartyPage from "~/pages/room/party/page";
import FinishPage from "~/pages/room/finish/page";
import ProfilePage from "~/pages/profile/page";
import MainLayout from "~/pages/layout";
import TestPage from "~/pages/test/page";
import Visualization from "~/pages/visualization/page";

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
        index: true,
        element: <CodePage />,
      },
      {
        path: "/room/host",
        index: true,
        element: <RoomHostPage />,
      },
      {
        path: "/room/party",
        index: true,
        element: <RoomPartyPage />,
      },
      {
        path: "/room/finish",
        index: true,
        element: <FinishPage />,
      },

      {
        path: "/profile",
        index: true,
        element: <ProfilePage />,
      },
      {
        path: "/visualization",
        index: true,
        element: <Visualization />,
      },
      {
        path: "/test",
        index: true,
        element: <TestPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
