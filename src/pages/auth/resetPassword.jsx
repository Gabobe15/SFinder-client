import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import {useParams } from 'react-router-dom'
import { toast } from "react-toastify";

const ResetPassword = () => {
 const {uid, token} = useParams()
  const [state, setState] = useState({
    new_password: "",
    confirm_password: "",
  });

  const { new_password, confirm_password } = state;

  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({uid, token, new_password, confirm_password});

    if(new_password != confirm_password){
        toast.error("password don't match")
        return
    }

    resetPassword({uid, token, new_password, confirm_password});

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">
            New Password:
            <input
              type="password"
              name="new_password"
              value={new_password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Confirm Password:
            <input
              type="password"
              name="confirm_password"
              value={confirm_password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
