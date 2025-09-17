import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useUniversity = () => {
  const token = useSelector((state) => state.auth.token);

  const getUniversityCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admissions/university-courses",
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
        "http://127.0.0.1:8000/api/admissions/university-courses/",
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
        "http://127.0.0.1:8000/api/admissions/applications",
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
        "http://127.0.0.1:8000/api/admissions/applications",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getApplicant = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admissions/applications/${id}/`,
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
      await axios.patch(
        `http://127.0.0.1:8000/api/admissions/applications/${id}/status/`,
        { status },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success(`Application ${status}`);
      if (refresh) refresh();
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
