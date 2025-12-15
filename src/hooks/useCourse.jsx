import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_URL;


const useCourse = () => {
  const token = useSelector((state) => state.auth.token);

  //   console.log(token);
///
  const addCourse = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/admissions/courses/`,
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
        `${baseURL}/api/admissions/courses/`,
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
