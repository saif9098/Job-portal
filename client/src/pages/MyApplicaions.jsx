import React, { useEffect,useState } from 'react'
import Profile from '../components/ResumeParts/profile'
import moment from "moment";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const MyApplicaions = () => {
  const [jobs, setjobs] = useState([]);
  const navigate = useNavigate();
    const getApplicaions = async ()=>{
        const {data} =await axios.get("https://career-jump-server.onrender.com/api/v1/job/get-myapp");
        setjobs(data)
    } 
    useEffect(() => {
    getApplicaions()
    }, [])
    const arrCnvrt = (str) => {
      return str.split(',').map(item => item.trim())
    }
    const setjobdetail = (job) => {
      localStorage.setItem("jobinfo", JSON.stringify(job))
      navigate(`/user/jobdetails/${job._id}`)
    }
  return (
    <Profile>
    <div>
    {jobs?.map((p) => (
      <div>
        <div className="border rounded-3 my-2 mx-3 bg-white" >

          <div className="py-2 px-4 w-100">
            <div className="d-flex justify-content-between fontsmall">
              <div><p className="fontset">{p.jobType}</p></div>
              <div className="fontsmall"><p><i class="fa-solid fa-location-dot"></i> {p.workLocation}</p></div>
            </div>
            <div className="text-primary fw-bold fontsmall">{p.jobrole}</div>
            <div className="fs-6 fw-bold "><p>{p.company}</p></div>
            <div className="d-flex flex-wrap fw-bold fontsmall">Required Skills :
              {arrCnvrt(p.requiredSkills)?.map((elem) => (
                <p className="mx-1 fw-normal fontset">{elem}</p>
              ))
              }
            </div>
            <div className="d-flex justify-content-between ">
              <div className="fs-6"><p>Posted On: <span className="text-primary">{moment(p.createdAt).fromNow()}</span></p></div>
              <div> <button className="btn btn-outline-primary btn-sm fontsmall" onClick={() => setjobdetail(p)}>View Details</button></div>
            </div>



          </div>
        </div>
      </div>
    ))}
    </div>
    </Profile>
  )
}

export default MyApplicaions
