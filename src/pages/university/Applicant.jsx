import { useEffect, useState } from "react";
import useUniversity from "../../hooks/useUniversity";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const formatDate = (isoString) => {
  return format(new Date(isoString), "MMM dd, yyyy");
};

const Applicant = () => {
  const { id } = useParams();
  const { getApplicant } = useUniversity();
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getApplicant(id);
      setState(data);
      setLoading(false);
    } catch (error) {
      console.log(error?.messsage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }

  console.log(state);
  return (
    <div>
      <h1>Personal info</h1>
      <table border="1" width={"100%"}>
        <thead>
          <tr>
            <th>Full name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Identification Card</th>
            <th>County</th>
            <th>Mobile No</th>
            <th>Sex</th>
            <th>Pasport Photo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state?.fullname}</td>
            <td>{state?.email}</td>
            <td>{state?.address}</td>
            <td>{state?.national_id}</td>
            <td>{state?.county}</td>
            <td>{state?.phone}</td>
            <td>{state?.sex}</td>
            <td>
              <a href={state.passport_photo} download target="_blank">
                image
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <h1>Academics</h1>
      <table border="1" width={"100%"}>
        <thead>
          <tr>
            <th>Course</th>
            <th>University</th>
            <th>Education Level</th>
            <th>Qualification</th>
            <th>Personal Statement</th>
            <th>Transcripts</th>
            <th>Recommendation</th>
            <th>Status</th>
            <th>Application Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state?.course_name}</td>
            <td>{state?.university_name}</td>
            <td>{state?.education_level}</td>
            <td>{state?.qualification}</td>
            <td>
              <a href={state?.recommendation} download target="_blank">
                View PDF
              </a>
            </td>
            <td>
              <a href={state?.academic_transcript} download target="_blank">
                View PDF
              </a>
            </td>
            <td>
              <a href={state?.personal_statement} download target="_blank">
                View PDF
              </a>
            </td>
            <td>{state?.status}</td>
            <td>{formatDate(state?.created_at)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Applicant;
