import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tasks from "./pages/Tasks/Tasks";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "./styles/main.css";
import Projects from "./pages/Projects/Projects";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:id",
        element: <Tasks />,
      },
      {
        path: "/",
        element: <Projects />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
