import { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";

const CourseCategory = () => {
  const { getCategory } = useCategory();
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const data = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  console.log(category);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table border="1" width={"80%"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>General Requirement</th>
            <th>Requirements</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {category.length > 0 ? (
            category.map(
              ({ id, name, general_requirements, requirement_file }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>
                    {general_requirements.split(",")[0]}
                    <br />
                    {general_requirements.split(",")[1]}
                  </td>
                  {/* <td>{`${general_requirements.split(',')[0]}<br/> ${general_requirements.split(',')[1]}`}</td> */}
                  <td>
                    {" "}
                    <a href={requirement_file} download>
                      Download file
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5">No category found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseCategory;
