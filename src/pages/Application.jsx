import { useState } from "react";
import { useLocation } from "react-router-dom";
import useUniversity from "../hooks/useUniversity";
import { toast } from "react-toastify";

const MultiStepForm = () => {
  const location = useLocation();
  const {
    course: initialCourse,
    university: initialUniversity,
    id: universityId,
    course_id: courseId,
  } = location.state || {};
  const { addApplicants } = useUniversity();

  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    // personal info
    fullname: "",
    email: "",
    address: "",
    national_id: "",
    county: "",
    phone: "",
    sex: "",
    passport_photo: "",
    // academic info
    course: courseId,
    university: universityId,
    education_level: "",
    qualification: "",
    recommendation: "",
    academic_transcript: "",
    personal_statement: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setState({
      ...state,
      [name]: files ? files[0] : value,
    });
  };

  const {
    fullname,
    email,
    address,
    national_id,
    county,
    phone,
    sex,

    university,
    course,
    education_level,
    qualification,
  } = state;

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    Object.entries(state).forEach(([key, value]) => {
      if (value) formdata.append(key, value);
    });

    await addApplicants(formdata);
    toast.success(
      "Your application has been receive we will send you email after evaluations!"
    );

    console.log("Submitted Data:", state);
  };

  return (
    <div className="form-container">
      <h2>Step {step} of 2</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3>Personal Information</h3>
            <div>
              <label htmlFor="fullname">Full name:</label>
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="national_id">National id:</label>
              <input
                type="text"
                name="national_id"
                value={national_id}
                onChange={handleChange}
                placeholder="birth certificate, id "
                required
              />
            </div>
            <div>
              <label htmlFor="county">County:</label>
              <input
                type="text"
                name="county"
                value={county}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Mobile phone:</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="sex">Sex:</label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={sex === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={sex === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
            <div>
              <label htmlFor="passport_photo">Passport Photo:</label>
              <input
                type="file"
                name="passport_photo"
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Academic Information</h3>
            <div>
              <input
                type="hidden"
                name="course"
                value={courseId}
                disabled
                onChange={handleChange}
                required
              />
              <p>Course: {initialCourse}</p>
            </div>
            <div>
              <input
                type="hidden"
                name="university"
                value={universityId}
                disabled
                onChange={handleChange}
                required
              />
              <p>University:{initialUniversity}</p>
            </div>
            <div>
              <label htmlFor="education_level">Education Level:</label>
              <input
                type="text"
                name="education_level"
                value={education_level}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="qualification">Qualification:</label>
              <input
                type="text"
                name="qualification"
                value={qualification}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="academic_transcript">Academic Transcripts:</label>
              <input
                type="file"
                name="academic_transcript"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="personal_statement">Personal statement:</label>
              <input
                type="file"
                name="personal_statement"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="recommendation">Recommendation :</label>
              <input
                type="file"
                name="recommendation"
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
