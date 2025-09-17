import { useState } from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const AddCategory = () => {
  const [state, setState] = useState({
    name: "",
    general_requirements: "",
    requirement_file: null,
  });

  const { name, general_requirements } = state;

  const { addCategory } = useCategory();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "requirement_file") {
      setState((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("general_requirements", general_requirements);
    if (state.requirement_file) {
      formdata.append("requirement_file", state.requirement_file);
    }
    console.log(state);

    addCategory(formdata);

    // setState({
    //   email: "",
    //   password: "",
    // });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Category:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Technology"
            />
          </label>
        </div>
        <div>
          <label htmlFor="general_requirements">
            General Requirements:
            <input
              type="text"
              name="general_requirements"
              value={general_requirements}
              onChange={handleChange}
              placeholder="General requirements"
            />
          </label>
        </div>
        <div>
          <label htmlFor="login">
            Specific Requirements:
            <input
              type="file"
              name="requirement_file"
              onChange={handleChange}
              placeholder="Technology"
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
      <NavLink to={"forget-password"}>forget password</NavLink>
    </div>
  );
};

export default AddCategory;
