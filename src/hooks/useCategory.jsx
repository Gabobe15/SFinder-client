import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const useCategory = () => {
  const { token } = useSelector((state) => state.auth);
  console.log("usecategory", token);

  // const { token } = useSelector((state) => state.auth.token);
  // const getCategory = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8000/api/admissions/categories",
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error?.messsage);
  //   }
  // };

  const getCategory = async () => {
    const token = cookies.get("token");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admissions/categories",
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
    const token = cookies.get("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admissions/categories",
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
