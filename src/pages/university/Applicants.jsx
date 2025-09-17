import { useEffect, useState } from "react";
import useUniversity from "../../hooks/useUniversity";
import { useNavigate } from "react-router-dom";

const Applicants = () => {
  const { getApplicants, updateApplicationStatus } = useUniversity();
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getApplicants();
      setState(data);
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(state);
  return (
    <div>
      <h1>Applicants</h1>
      <table border="1" width={"100%"}>
        <thead>
          <tr>
            <th>Full name</th>
            <th>Course</th>
            <th>Qualifications</th>
            <th>Personal statement</th>
            <th>Full info</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.length > 0 ? (
            state.map(
              ({
                id,
                fullname,
                course_name,
                qualification,
                personal_statement,
                status,
              }) => (
                <tr key={id}>
                  <td>{fullname}</td>
                  <td>{course_name}</td>
                  <td>{qualification}</td>
                  <td>
                    {" "}
                    <a href={personal_statement} download>
                      View PDF
                    </a>{" "}
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/university/applicants/${id}`)}
                    >
                      View
                    </button>
                  </td>
                  <td>{status}</td>
                  <td>
                    <button
                      onClick={() =>
                        updateApplicationStatus(id, "accepted", fetchData)
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateApplicationStatus(id, "rejected", fetchData)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5">No Applicants found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Applicants;
