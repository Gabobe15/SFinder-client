import { useLocation } from "react-router-dom";

const Unauthorized = () => {
  const location = useLocation();
  const reason = location.state?.reason;

  return (
    <div>
      <h1>Unauthorized</h1>
      {reason === "forbidden" ? (
        <p>You don’t have permission to access this page.</p>
      ) : (
        <p>You must log in to continue.</p>
      )}
    </div>
  );
};

export default Unauthorized;
