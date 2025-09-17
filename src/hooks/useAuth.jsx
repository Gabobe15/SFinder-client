import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUserInfo,
  setError,
  clearUserInfo,
} from "../features/authSlice";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const loginAuth = async (credentials) => {
    dispatch(setLoading(true));

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        credentials
      );
      const { token, user } = data;

      dispatch(
        setUserInfo({
          id: user?.id,
          email: user?.email,
          fullname: user?.fullname,
          role: user?.role,
          token,
        })
      );

      navigate("/");

      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const registerAuth = async (userInfo) => {
    dispatch(setLoading(true));

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", userInfo);
      toast.success("User has been created successfully!");
    } catch (error) {
      toast.error("register unsuccessful please try again!");
      const errorMessage =
        error.response?.data?.message || "registeration failed";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const Logout = async () => {
    dispatch(setLoading(true));

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/logout");

      dispatch(clearUserInfo());
    } catch (error) {
      const errorMessage = error.response?.data?.message || "something failed";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const forgetPassword = async (email) => {
    dispatch(setLoading(true));

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/forget-password", {
        email,
      });
      toast.success("a reset link has been sent to you email.");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "something failed";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const resetPassword = async (paramter) => {
    dispatch(setLoading(true));

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/reset-password", {
        ...paramter,
      });
      toast.success("password has been reset successful!");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "something failed";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const changePassword = async (userData) => {
    dispatch(setLoading(true));
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/change-password",
        userData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Password has been changed successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "something failed";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // users
  // list user
  const UsersList = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/auth/university-list",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  const toggleUsersStatus = async (id, currentStatus, refresh) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/auth/users/${id}/activate/`,
        {
          is_active: !currentStatus,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success(
        `User ${currentStatus ? "deactivated" : "activated"} successfully`
      );
      if (refresh) refresh();
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return {
    registerAuth,
    loginAuth,
    Logout,
    forgetPassword,
    resetPassword,
    changePassword,
    UsersList,
    toggleUsersStatus,
  };
};

export default useAuth;
