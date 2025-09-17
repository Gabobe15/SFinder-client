import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const { loginAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    loginAuth(state);

    // setState({
    //   email: "",
    //   password: "",
    // });
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
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <NavLink to={'forget-password'}>forget password</NavLink>
      <p>
      Don't have account<NavLink to={'register'}>Register</NavLink>
        
      </p>
    </div>
  );
};

export default Login;
