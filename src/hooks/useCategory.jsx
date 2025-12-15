import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_URL;



const useCategory = () => {
  const { token } = useSelector((state) => state.auth);
  
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/admissions/categories`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  const addCategory = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/admissions/categories`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Category has been added successfully!");
      return response.data;
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  return {
    getCategory,
    addCategory,
  };
};

export default useCategory;
