import { useState } from "react";
import useAuth from "../../hooks/useAuth";

// email = models.EmailField(max_length=200, unique=True)
// fullname = models.CharField(max_length=200)
// role = models.CharField(max_length=20, default='student', choices=ROLE_CHOICE)
// mobile = models.CharField(max_length=200, blank=True, null=True)
// sex = models.CharField(max_length=10, blank=True, null=True)

const RegisterPage = () => {
  const [state, setState] = useState({
    fullname: "",
    email: "",
    sex: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const { fullname, sex, mobile, email, password, confirmPassword } = state;

  const { registerAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("password don`t match");
      return;
    }
    console.log(state);

    registerAuth({ fullname, email, mobile, sex, password });

    // setState({
    //   email: "",
    //   password: "",
    // });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">
            Fullname:
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
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
          <label htmlFor="mobile">
            Mobile:
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="sex">
            Sex:
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="sex"
                value="Male"
                checked={sex === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="sex"
                value="Female"
                checked={sex === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
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
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      Already have account<NavLink to={"login"}>Login</NavLink>
    </div>
  );
};

export default RegisterPage;
