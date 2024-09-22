import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import UserList from "./components/UserList.jsx";
import UserForm from "./components/UserForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/users/:id",
        element: <UserForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
