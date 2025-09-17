import { useEffect, useState } from "react";
import useCourse from "../hooks/useCourse";
import useUniversity from "../hooks/useUniversity";

const AddUniversityCourse = () => {
  const { getCourses } = useCourse();
  const { addUniversityCourses } = useUniversity();

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    available_slots: "",
    course_id: "",
    requirements: "",
    deadline: "",
  });

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data || []);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUniversityCourses(form);
    setForm({
      available_slots: "",
      course_id: "",
      requirements: "",
      deadline: "",
    });
  };

  const {
    available_slots,
    course_id,
    requirements,
    deadline,
  } = form;


  console.log("courses", courses);

  return (
    <div>
      <h2>AddCourse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="course_id">Course:</label>
          <select
            name="course_id"
            id="course_id"
            value={course_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.course}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="requirements">Requirements:</label>
          <input
            id="requirements"
            type="text"
            name="requirements"
            value={requirements}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="slots">Available Slot:</label>
          <input
            id="slots"
            type="text"
            name="available_slots"
            value={available_slots}
            onChange={handleChange}
            required
          />
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

export default AddUniversityCourse;
