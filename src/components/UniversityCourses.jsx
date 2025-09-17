import { useEffect, useState } from "react";
import useUniversity from "../hooks/useUniversity";
import { useNavigate } from "react-router-dom";

const UniversityCourses = () => {
  const navigate = useNavigate();
  const { getUniversityCourses, getApplicants } = useUniversity();
  const [state, setState] = useState([]);
  const [applications, setApplications] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getUniversityCourses();
      setState(data);
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  const fetchApplicants = async () => {
    try {
      const data = await getApplicants();
      setApplications(data);
    } catch (error) {
      console.log(error?.message);
    }
  };

  console.log(state);

  useEffect(() => {
    fetchData();
    fetchApplicants();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table border="1" width={"95%"}>
        <thead>
          <tr>
            <th>Course</th>
            <th>University</th>
            <th>Requirements</th>
            <th>Available slots</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.length > 0 ? (
            state.map(
              ({
                id,
                available_slots,
                course,
                deadline,
                requirements,
                university,
                course_id,
              }) => {
                const alreadyApplied = applications.some(
                  (app) => app.course == course_id
                );

                return (
                  <tr key={id}>
                    <td>{course}</td>
                    <td>{university}</td>
                    <td>{requirements}</td>
                    <td>{available_slots}</td>
                    <td>{deadline}</td>
                    <td>
                      {alreadyApplied ? (
                        <button disabled>Applied</button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate("/applications", {
                              state: {
                                course,
                                university,
                                id,
                                course_id,
                              },
                            })
                          }
                        >
                          Apply
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }
            )
          ) : (
            <tr>
              <td colSpan="5">No course found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityCourses;
