import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const ForgetPassword = () => {
  const [state, setState] = useState({
    email: "",
  });

  const { email } = state;

  const { forgetPassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    forgetPassword(email);

    setState({
      email: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
