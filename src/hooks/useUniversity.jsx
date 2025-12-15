import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_URL;

const useUniversity = () => {
  const token = useSelector((state) => state.auth.token);

  const getUniversityCourses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/admissions/university-courses/`,
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

  const addUniversityCourses = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/admissions/university-courses/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Course has being addd to the univeritys");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getApplicants = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/admissions/applications/`,
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
  const addApplicants = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/admissions/applications/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Your application has been received!");
      return response.data;
    } catch (error) {
      toast.success("Something went wrong!");

      console.log(error.message);
    }
  };

  const getApplicant = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/admissions/applications/${id}/`,
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

  const updateApplicationStatus = async (id, status, refresh) => {
    try {
      const response = await axios.patch(
        `${baseURL}/api/admissions/applications/${id}/status/`,
        { status },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success(`Application ${status}`);
      if (refresh) {
        await refresh();
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error?.message);
    }
  };

  return {
    getUniversityCourses,
    addUniversityCourses,
    getApplicants,
    addApplicants,
    getApplicant,
    updateApplicationStatus,
  };
};

export default useUniversity;
