import {
  About,
  Admin,
  AdminRegister,
  Applicant,
  Applicants,
  MultiStepForm,
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
} from "./pages";
import { Route, Routes } from "react-router-dom";
import Headers from "./components/Header";
import {
  AddCategory,
  AddCourse,
  AddUniversityCourse,
  CourseCategory,
  Footers,
  ListUser,
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUserInfo } from "./features/authSlice";
import PrivateRouter from "./utils/PrivateRouter";
import Unauthorized from "./pages/Unauthorized";
import { CssBaseline } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!token) {
      dispatch(clearUserInfo());
    }
  }, [token]);

  return (
    <>
      <CssBaseline />
      <Headers />
      <Routes>
        {/* auth  */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/password-reset/:uid/:token" element={<ResetPassword />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Other page  */}
        <Route
          element={
            <PrivateRouter allowedRoles={["admin", "university", "student"]} />
          }
        >
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/applications" element={<MultiStepForm />} />
        </Route>
        {/* admin route  */}
        <Route element={<PrivateRouter allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />}>
            <Route index path="" element={<ListUser />} />
            <Route path="signup" element={<AdminRegister />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="list-category" element={<CourseCategory />} />
          </Route>
        </Route>
        {/* university  */}
        <Route
          element={<PrivateRouter allowedRoles={["admin", "university"]} />}
        >
          <Route path="/university" element={<University />}>
            <Route index element={<AddCourse />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="applicants/:id" element={<Applicant />} />
            <Route path="university-course" element={<AddUniversityCourse />} />
          </Route>
        </Route>
        {/* student  */}
        <Route element={<PrivateRouter allowedRoles={["student"]} />}>
          <Route path="/student">
            <Route index element={<SApplicants />} />
            <Route path="applications/:id" element={<SApplicant />} />
          </Route>
        </Route>
      </Routes>
      {/* <Footers /> */}
    </>
  );
}

export default App;
