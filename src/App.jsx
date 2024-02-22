import { RouterProvider, Route, BrowserRouter, Routes } from "react-router-dom";
import mainRoutes from "./routers/main-router";
import store from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

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
