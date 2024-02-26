import { RouterProvider, Route, BrowserRouter, Routes } from "react-router-dom";
import mainRoutes from "./routers/main-router";
import store from "./store";
import { Provider } from "react-redux";
import "./styles/globalStyle.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={mainRoutes} />
      </Provider>
    </>
  );
}

export default App;
