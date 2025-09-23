import { useSelector } from "react-redux";
import Navlink from "./Navlink";
import useAuth from "../hooks/useAuth";

const Headers = () => {
  const user = useSelector((state) => state.auth.user);
  const name = user?.fullname?.split(" ")[0];
  const token = useSelector((state) => state.auth.token);

  const { Logout } = useAuth();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h2>
          {" "}
          <i>Scholarship finder</i>
        </h2>
        <Navlink />
        {token && name && (
          <button
            style={{
              background: "red",
              color: "white",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => Logout()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Headers;
