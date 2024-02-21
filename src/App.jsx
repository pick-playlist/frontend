import { useState } from "react";

import { RouterProvider, Route, BrowserRouter, Routes } from "react-router-dom";
import mainRoutes from "./routers/main-router";

function App() {
  return (
    <>
      <RouterProvider router={mainRoutes} />
    </>
  );
}

export default App;
