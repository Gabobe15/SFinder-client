import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [state, setState] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const { old_password, new_password, confirm_new_password } = state;

  const { changePassword } = useAuth();

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

    if (new_password != confirm_new_password) {
      toast.error("password don't match");
      return;
    }

    changePassword(state);

    // setState({
    //   email: "",
    //   password: "",
    // });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="old_password">
            Old Password:
            <input
              type="password"
              name="old_password"
              value={old_password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="new_password">
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
          <label htmlFor="confirm_new_password">
            Confirm New Password:
            <input
              type="password"
              name="confirm_new_password"
              value={confirm_new_password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
