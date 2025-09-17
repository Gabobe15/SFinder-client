import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCategory from "../../hooks/useCategory";

const AdminRegiter = () => {
  const { getCategory } = useCategory();
  const { registerAuth } = useAuth();

  const [category, setCategory] = useState([]);

  const [state, setState] = useState({
    fullname: "",
    email: "",
    sex: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
    category_id: "",
  });

  const {
    fullname,
    sex,
    mobile,
    email,
    role,
    password,
    confirmPassword,
    category_id,
  } = state;

  const fetchCategory = async () => {
    try {
      const data = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  console.log(category);

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

    registerAuth({ fullname, email, mobile, sex, role, password, category_id });

    setState({
      fullname: "",
      email: "",
      sex: "",
      mobile: "",
      role: "",
      password: "",
      field_study: "",
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

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
          <label htmlFor="role-select">
            Role:
            <select
              name="role"
              id="role-select"
              value={role}
              onChange={handleChange}
              style={{ border: "none" }}
            >
              <option value="" disabled defaultChecked>
                Select a role
              </option>
              <option value="admin">Admin</option>
              <option value="university">University</option>
              <option value="student">Student</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="category_id">
            Field of Study:
            <select
              name="category_id"
              id="category_id"
              value={category_id}
              onChange={handleChange}
              style={{ border: "none" }}
            >
              <option value="" disabled defaultChecked>
                Select a a field
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
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
            <label htmlFor="other">
              <input
                type="radio"
                id="none"
                name="sex"
                value="None"
                checked={sex === "None"}
                onChange={handleChange}
              />
              None
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
    </div>
  );
};

export default AdminRegiter;
