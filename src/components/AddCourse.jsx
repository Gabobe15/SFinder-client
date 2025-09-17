import { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";
import useCourse from "../hooks/useCourse";

const AddCourse = () => {
  const { getCategory } = useCategory();
  const { addCourse } = useCourse();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    course: "",
    level: "diploma",
    category_id: "",
    deadline: "",
  });

  const fetchCategories = async () => {
    const data = await getCategory();
    setCategories(data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCourse(form);
    setForm({
      course: "",
      level: "",
      category_id: "",
      deadline: "",
    });
  };

  const { course, category_id, level, deadline } = form;

  return (
    <div>
      <h2>AddCourse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="course">Course Name:</label>
          <input
            id="course"
            type="text"
            name="course"
            value={course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="level">Level:</label>
          <select
            name="level"
            id="level"
            value={level}
            onChange={handleChange}
            required
          >
            <option value="diploma">Diploma</option>
            <option value="degree">Degree</option>
          </select>
        </div>
        <div>
          <label htmlFor="category_id">Category:</label>
          <select
            name="category_id"
            id="category_id"
            value={category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            id="deadline"
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit"> Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
