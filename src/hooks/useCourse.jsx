import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useCourse = () => {
  const token = useSelector((state) => state.auth.token);

  //   console.log(token);

  const addCourse = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admissions/courses/",
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Course added successfully");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admissions/courses/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return { getCourses, addCourse };
};

export default useCourse;
