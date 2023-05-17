import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC } from "react";
import axios from "axios";

import Start from "@/pages";
import SubDetail from "@/pages/user/SubDetail";
import HomeAdmin from "@/pages/admin/Home";
import Profile from "@/pages/user/Profile";
import Login from "@/pages/auth/Login";
import { SignID } from "@/pages/auth/SignID";
import { Position } from "@/pages/admin/Position";
import { SubmissionType } from "@/pages/admin/SubmissionType";
import { Office } from "@/pages/admin/Office";
import { Approving } from "@/pages/admin/Approving";
import ApproveDetail from "@/pages/user/ApproveDetail";
import CC from "@/pages/user/CC";
import UserIndex from "@/pages/user";
import Approve from "@/pages/user/Approve";
import DrawCanvasExample from "@/pages/DrawCanvasExample";
import { useCookies } from "react-cookie";

axios.defaults.baseURL =
  // "https://virtserver.swaggerhub.com/123ADIYUDA/E-Proposal/1.0.0";
  "https://hobelcyatramandiri.my.id";

const Router: FC = () => {
  const [cookie, setCookies] = useCookies(["token", "user_position", "url"]);

  const getToken = cookie.token;
  const role = cookie.user_position;

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        getToken && role ? (
          role == "admin" ? (
            <HomeAdmin />
          ) : (
            <UserIndex />
          )
        ) : (
          <Start />
        ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-id",
      element: <SignID />,
    },
    {
      path: "/admin",
      element: getToken ? <HomeAdmin /> : <Navigate to="/login" />,
    },
    {
      path: "/position",
      element: getToken ? <Position /> : <Navigate to="/login" />,
    },
    {
      path: "/submission-type",
      element: getToken ? <SubmissionType /> : <Navigate to="/login" />,
    },
    {
      path: "/office",
      element: getToken ? <Office /> : <Navigate to="/login" />,
    },
    {
      path: "/approving",
      element: getToken ? <Approving /> : <Navigate to="/login" />,
    },
    {
      path: "/home",
      element: (
        // getToken && role !== "admin" ? <UserIndex /> : <Navigate to="/" />,
        <UserIndex />
      ),
    },

    {
      path: "/sub-detail/:id",
      element: (
        // getToken && role !== "admin" ? <SubDetail /> : <Navigate to="/" />,
        <SubDetail />
      ),
    },
    {
      path: "/approve-detail/:id",
      element: (
        // getToken && role !== "admin" ? <ApproveDetail /> : <Navigate to="/" />,
        <ApproveDetail />
      ),
    },
    {
      path: "/user",
      element: (
        // getToken && role !== "admin" ? <UserIndex /> : <Navigate to="/" />,
        <UserIndex />
      ),
    },
    {
      path: "/profile-users",
      element: (
        // getToken && role !== "admin" ? <Profile /> : <Navigate to="/" />,
        <Profile />
      ),
    },
    {
      path: "/app2",
      element: (
        // getToken && role !== "admin" ? (
        //   <DrawCanvasExample />
        // ) : (
        //   <Navigate to="/" />
        // ),
        <DrawCanvasExample />
      ),
    },
  ]);

  return (
    // <ThemeContext.Provider value={background}>
    <RouterProvider router={router} />
    // </ThemeContext.Provider>
  );
};

export default Router;
