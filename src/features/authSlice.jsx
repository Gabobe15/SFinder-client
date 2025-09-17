import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Safe parse function
function getParsedUser() {
  const rawUser = cookies.get("user");
  if (!rawUser) return null;

  try {
    return typeof rawUser === "string"
      ? JSON.parse(rawUser)
      : rawUser; // if universal-cookie already parsed it
  } catch (e) {
    console.error("Invalid user cookie, clearing:", e);
    cookies.remove("user", { path: "/" });
    cookies.remove("token", {path: '/'})
    return null;
  }
}



const initialState = {
  isLoading: false,
  error: null,
  token: cookies.get("token") ?? null,
  user: getParsedUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const userData = {
        id: action.payload.id ?? "",
        role: action.payload.role ?? "",
        fullname: action.payload.fullname ?? "",
        email: action.payload.email ?? "",
      };
      state.user = userData;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;

      // persist cookies here
      cookies.set("user", JSON.stringify(userData), { path: "/" });

      cookies.set("token", state.token, {
        path: "/",
        secure: false,
        sameSite: "lax",
        maxAge: 48 * 60 * 60,
      });
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUserInfo: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.token = null;

      // clear cookies here
      cookies.remove("user", { path: "/" });
      cookies.remove("token", { path: "/" });
    },
  },
});

export const { setUserInfo, clearUserInfo, setError, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
