import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import {
  About,
  Admin,
  AdminRegister,
  Applicant,
  Applicants,
  MultiStepForm as StudentApplication,
  ChangePassword,
  Contact,
  ForgetPassword,
  Homepage,
  Login,
  NotFoundPage,
  Register,
  ResetPassword,
  Student,
  University,
  SApplicants,
  SApplicant,
  Account,
  Profile,
} from "./pages";

import {
  AddCategory,
  AddCourse,
  AddUniversityCourse,
  CourseCategory,
  ListUser,
} from "./components";
import PrivateRouter from "./utils/PrivateRouter";
import Unauthorized from "./pages/Unauthorized";
import App from "./App";

export const router = createBrowserRouter([
  // auth router
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "password-reset/:uid/:token", element: <ResetPassword /> },
    ],
  },

  // 🌍 main app layout with headers/footer
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      // public pages
      { path: "unauthorized", element: <Unauthorized /> },

      // 🔒 authenticated pages (wrapped in PrivateRouter)
      {
        element: (
          <PrivateRouter allowedRoles={["admin", "university", "student"]} />
        ),
        children: [
          { index: true, element: <Homepage /> },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
          { path: "applications", element: <StudentApplication /> },
          { path: "change-password", element: <ChangePassword /> },
          { path: "account", element: <Account /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      // 🔐 admin
      {
        element: <PrivateRouter allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin",
            element: <Admin />,
            children: [
              { index: true, element: <ListUser /> },
              { path: "signup", element: <AdminRegister /> },
              { path: "add-category", element: <AddCategory /> },
              { path: "list-category", element: <CourseCategory /> },
            ],
          },
        ],
      },

      // 🏫 university
      {
        element: <PrivateRouter allowedRoles={["admin", "university"]} />,
        children: [
          {
            path: "university",
            element: <University />,
            children: [
              { index: true, element: <Applicants /> },
              { path: "add-course", element: <AddCourse /> },
              { path: "applications/:id", element: <Applicant /> },
              { path: "university-course", element: <AddUniversityCourse /> },
            ],
          },
        ],
      },

      // 🎓 student
      {
        element: <PrivateRouter allowedRoles={["student"]} />,
        children: [
          {
            path: "student",
            element: <Student />,
            children: [
              { index: true, element: <SApplicants /> },
              { path: "applications/:id", element: <SApplicant /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
