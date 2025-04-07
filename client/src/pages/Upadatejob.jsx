import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Upadatejob = () => {
  const [auth, setAuth]= useAuth()
  const [formData, setFormData] = useState({
    company:'',
    jobrole:'',
    jobType:'',
    salary:'',
    requiredSkills:'',
    workLocation:'',
    Yourweb:'',
    eligibility:'',
   workDays:'',
    deadline:'',
    jobDescription:''
  });
  const [ok, setOk]=useState(false)
  const navigate =useNavigate();
  const {id} =useParams()
  const jobstr =localStorage.getItem("job");
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      
      [name]: value,
    });
  };
  useEffect(() => {
    if(jobstr){
      const jobObj=JSON.parse(jobstr)
    setFormData({
      ...jobObj
    });
  }
  }, [])
const idValidation =async()=>{
  try {
    const {data} = await axios.get(`https://career-jump-server.onrender.com/api/v1/job/match-job/${id}`) 
    setOk(data.ok)
  } catch (error) {
    
  }
}
useEffect(() => {
idValidation()
}, [id])
    const handleSubmit =async (e) => {
      e.preventDefault();
      try{
      const {data} = await axios.patch(`https://career-jump-server.onrender.com/api/v1/job/update-job/${id}`, 
        {'formData':formData},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth?.token,
        }
        })
      if (data) {
          navigate("/dashboard");
          localStorage.removeItem("job")
          toast.success("Job Updated Successfully");
      }
    } catch (error) {
      
      toast.error(error.response.data.message);
      console.log(error);
    }
    };
  
    return (ok?<>
      <Layout>
        <div className="job-container">
    
        <form onSubmit={handleSubmit}>
       <h4 className="title">Update Your Job</h4>
      <div className="form-group mb-3">
      <input
        type="text"
        name="company"
       placeholder="Enter Company Name "
        value={formData.company}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
    <input
      type="text"
      name="jobrole"
     placeholder="Enter The Job Role"
      value={formData.jobrole}
      onChange={handleChange}
      className="form-control"
    />
  </div>
      <div className="form-group mb-3">
      <select
      name="jobType"
      value={formData.jobType}
      onChange={handleChange}
      className="form-select"
    >
      <option value="">-- Select type of Job --</option>
      <option value="internship">Internship</option>
      <option value="full-time">Full-time</option>
      <option value="part-time">Part-time</option>
      <option value="contract">Contract</option>
    </select>
    </div>
      <div className="form-group mb-2">
      <select
      name="workDays"
      value={formData.workDays}
      onChange={handleChange}
      className="form-select"
    >
      <option value="">-- Select Working days in a Week --</option>
      <option value="3 days in a week">3 days in a week</option>
      <option value="4 days in a week">4 days in a week</option>
      <option value="5 days in a week">5 days in a week</option>
      <option value="6 days in a week">6 days in a week</option>
      <option value="whole week">Whole week</option>
    </select>
     </div>
      <div className="form-group mb-3">
      <input
        type="text"
        name="salary"
       placeholder="Enter Stipend (or i.e. performance based) "
        value={formData.salary}
        onChange={handleChange}
        className="form-control"
      />
    </div>
      <div className="form-group mb-3">
      <input
        type="text"
        name="requiredSkills"
       placeholder="Enter required skills (use comma only i.e. C,C++,Js) "
        value={formData.requiredSkills}
        onChange={handleChange}
        className="form-control"
      />
    </div>
      <div className="form-group mb-3">
      <input
        type="text"
        name="eligibility"
       placeholder="Enter Elgibility criteria (use comma only i.e. BE,CS,Exprerienced) "
        value={formData.eligibility}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  
      <div className="form-group mb-3">
      <input
        type="text"
        name="workLocation"
       placeholder="Enter Work Location "
        value={formData.workLocation}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <input
        type="text"
        name="Yourweb"
       placeholder="Provide Your Offcial Website link"
        value={formData.Yourweb}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <input
        type="date"
        name="deadline"
       placeholder="Enter Deadline "
        value={formData.deadline}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <textarea
        type="text"
        name="jobDescription"
       placeholder="Describe the Work/Responsibility (100-1200 words)"
        value={formData.jobDescription}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <button type="submit" className="jobbtn">
    UPDATE JOB
  </button>
        </form>
      </div>
    </Layout></>
    : <>
    <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
    <h1 className="">Please! Provide Valid Job Id</h1>
    </div>
    </>
  )
}

export default Upadatejob
